export const Hp = {
  methods: {
    setGruntHp (config, grunt) {
      let hpRange = this.createNumberRange(config.cr.hpMin, config.cr.hpMax)
      const oneQuarterOfRange = Math.floor(hpRange.length / 4)
      if (config.effective.resistances) {
        hpRange = hpRange.slice(0, hpRange.length - (oneQuarterOfRange * 2))
      } else {
        hpRange = hpRange.slice(oneQuarterOfRange, hpRange.length - oneQuarterOfRange)
      }

      // Base HP calcs
      let targetHp = this.randomValue(hpRange)
      let maxHp = config.cr.hpMax

      // Has Shields?
      const shields = Math.floor(Math.random() * 100) > 15
      if (shields) {
        const crMetaLevel = parseFloat(config.cr.cr) <= 1 ? 0 : Math.ceil(parseFloat(config.cr.cr) / 4)
        grunt.sp = {
          shields: crMetaLevel * 10,
          regen: crMetaLevel * 10 / 2
        }
        const adjustment = grunt.sp.shields + grunt.sp.regen
        targetHp -= adjustment
        maxHp -= adjustment
      }

      const avgRoll = grunt.race.id === 'volus' ? 3.5 : 4.5
      let conMod = this.abilityScoreBonus(grunt.abilityScores.con)
      let multiplicativeMod = 1
      if (config.effective.resistances) {
        if (parseInt(config.cr.cr, 10) < 5) {
          multiplicativeMod = 2
        } else if (parseInt(config.cr.cr, 10) < 11) {
          multiplicativeMod = 1.5
        } else {
          multiplicativeMod = 1.25
        }
      }

      if (grunt.race.id === 'turian') {
        conMod += 2
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
