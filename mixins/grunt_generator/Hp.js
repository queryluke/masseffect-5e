export const Hp = {
  data () {
    return {
      baseShields: {
        0: { shields: [0, 0, 5, 5, 10], regen: [0, 0, 0, 5, 5] },
        1: { shields: [5, 5, 5, 10, 10], regen: [0, 0, 5, 5, 10] },
        2: { shields: [5, 10, 15, 20, 20], regen: [5, 5, 10, 10, 10] },
        3: { shields: [10, 15, 20, 25, 30], regen: [10, 10, 15, 15, 15] }
      }
    }
  },
  computed: {
    stats () {
      return this.$store.getters.getData('stats-by-cr')
    }
  },
  methods: {
    setGruntHp () {
      this.grunt.sp = null
      this.grunt.hp = { numDie: 1, die: 4 }
      // shields
      const baseShields = this.baseShields[this.crMetaLevel]
      const shields = this.randomValue(baseShields.shields)
      if (shields) {
        const regen = this.randomValue(baseShields.regen.filter(r => r <= shields))
        this.grunt.sp = { shields, regen }
        this.adjustments.hp += (shields + regen)
      }

      // **********************************
      // What is the offensive CR?
      // ***
      // Find the dpr cr
      const finalDpr = Math.max(...Object.values(this.dpr)) + this.adjustments.dpr
      // Offensive CR > 12
      let dprCr = {}
      if (finalDpr > 81) {
        dprCr = this.createNewCrFromDamage(finalDpr)
      } else {
        dprCr = this.stats.find((s) => {
          return s.dmgMin <= finalDpr && s.dmgMax >= finalDpr
        })
      }
      const finalAtk = this.adjustments.hit + this.options.cr.profBonus
      let hitDiff = (finalAtk - dprCr.attackBonus) / 2
      hitDiff = hitDiff >= 0 ? Math.floor(hitDiff) : Math.ceil(hitDiff)
      const offensiveCrNorm = dprCr.normalized + hitDiff
      // **********************************
      // What is the target defensive CR, based on offensive CR?
      // ***
      let targetDefensiveCrNorm = this.options.cr.normalized
      if (offensiveCrNorm !== targetDefensiveCrNorm) {
        targetDefensiveCrNorm = (this.options.cr.normalized * 2) - offensiveCrNorm
      }
      const targetDefensiveCr = this.getCrByNormalized(targetDefensiveCrNorm)
      // **********************************
      // What is the ac adjustment?
      // ***
      const finalAc = this.grunt.ac + this.adjustments.ac
      let acDiff = (finalAc - targetDefensiveCr.acDc) / 2
      acDiff = acDiff >= 0 ? Math.floor(acDiff) : Math.ceil(acDiff)
      const hpCrId = targetDefensiveCrNorm - acDiff
      const hpCr = this.getCrByNormalized(hpCrId)
      if (hpCr === undefined) {
        // console.log(`finalAc = ${finalAc}, acDiff = ${acDiff}, targetDefensiveCrId = ${targetDefensiveCrId}, hpCrId = ${hpCrId}`)
      }

      // **********************************
      // Calc HP
      // ***
      // Multipliers
      let multiplicativeMod = 1
      if (this.grunt.damageResistances.length > 3 || this.grunt.damageImmunities.length > 1) {
        const crInt = this.crToInt(this.options.cr.cr)
        if (crInt < 5) {
          multiplicativeMod = 2
        } else if (crInt < 11) {
          multiplicativeMod = 1.5
        } else {
          multiplicativeMod = 1.25
        }
      }
      // Die Type (size)
      const dieType = this.options.species.id === 'volus' ? 6 : 8
      const averageRoll = (dieType + 1) / 2
      // Con Modifier
      let conMod = this.abilityScoreBonus(this.grunt.abilityScores.con)
      if (this.options.species.id === 'turian') {
        conMod += 1
      }
      // Calculation
      let numDice = 0
      let average = 0
      const hpDiff = hpCr.hpMin - this.adjustments.hp
      const minHp = hpDiff < 0 ? hpCr.hpMin : hpDiff
      while (average < minHp) {
        numDice++
        average = ((numDice * averageRoll) + (numDice * conMod)) * multiplicativeMod
      }
      this.grunt.hp = {
        numDice,
        die: dieType
      }
    },
    getCrByNormalized (normalized) {
      if (normalized > 15) {
        return this.createNewCr(normalized - 15)
      } else if (normalized < 1) {
        return this.stats.find(cr => cr.normalized === 1)
      } else {
        return this.stats.find(cr => cr.normalized === normalized)
      }
    },
    createNewCrFromDamage (damage) {
      const numIncrements = Math.ceil((damage - 81) / 5)
      return this.createNewCr(numIncrements)
    },
    createNewCr (numIncrements) {
      return {
        id: `${15 + numIncrements}000`,
        normalized: 15 + numIncrements,
        cr: 12 + numIncrements,
        profBonus: 6 + Math.floor(numIncrements / 4),
        acDc: 18 + Math.floor(numIncrements / 3),
        hpMin: 237 + (numIncrements * 8),
        hpMax: 251 + (numIncrements * 8),
        attackBonus: 8 + (numIncrements / 2),
        generated: true
      }
    }
  }
}
