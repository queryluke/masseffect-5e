export const Hp = {
  data () {
    return {
      baseShields: {
        0: {shields: [null, null, 5, 5, 10], recharge: [null, null, 5, 5, 10]},
        1: {shields: [5, 5, 10, 10, 15], recharge: [5, 5, 5, 10, 10]},
        2: {shields: [5, 10, 15, 20, 25], recharge: [5, 10, 10, 10, 15]},
        3: {shields: [10, 15, 20, 20, 30], recharge: [10, 10, 15, 15, 15]}
      }
    }
  },
  methods: {
    setGruntHp () {
      this.grunt.sp = null
      this.grunt.hp = {numDie: 1, die: 4}
      // shields
      const baseShields = this.baseShields[this.crMetaLevel]
      const shields = this.randomValue(baseShields.shields)
      if (shields) {
        const regen = this.randomValue(baseShields.regen.filter(r => r <= shields))
        this.grunt.sp = {shields, regen}
        this.adjustments.hp += (shields + regen)
      }
      //
      const avgRoll = this.race.id === 'volus' ? 3.5 : 4.5
      let conMod = this.abilityScoreBonus(this.grunt.abilityScores.con)
      if (this.race.id === 'turian') {
        conMod += 2
      }
      let multiplicativeMod = 1
      if (this.grunt.damageResistances.length > 3 || this.grunt.damageImmunities.length > 1) {
        const crInt = this.crToInt(this.cr.cr)
        if (crInt < 5) {
          multiplicativeMod = 2
        } else if (crInt < 11) {
          multiplicativeMod = 1.5
        } else {
          multiplicativeMod = 1.25
        }
      }

      // generate the hp
      let numDice = 0
      let average = 0
      let max = 0
      const maxRoll = this.dieFromAverage(avgRoll)
      while (average <= targetHp && max <= maxHp) {
        numDice++
        average = ((numDice * avgRoll) + (numDice * conMod)) * multiplicativeMod
        max = numDice * maxRoll * multiplicativeMod
      }
      grunt.hp = {
        die: maxRoll,
        avgRoll,
        average: Math.floor(average),
        numDice,
        mod: conMod * numDice
      }
    }
  }
}
