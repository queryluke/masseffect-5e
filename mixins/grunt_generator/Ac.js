export const Ac = {
  methods: {
    setGruntAc(config, grunt) {
      const acModArray = [-2, -1, -1, 0, 1, 1, 2]

      if (grunt.race.id === 'geth' || grunt.race.id === 'unshackled-ai') {
        grunt.ac = 13 + this.abilityScoreBonus(grunt.abilityScores.dex)
        return
      }

      if (grunt.sc.id === 'adept' || grunt.sc.id === 'infiltrator') {
        acModArray.push(-2)
        acModArray.push(-2)
      } else if (grunt.sc.id === 'soldier' || grunt.sc.id === 'sentinel') {
        acModArray.push(2)
        acModArray.push(2)
      } else {
        acModArray.push(0)
        acModArray.push(0)
      }

      let acMod = this.randomValue(acModArray)

      if (grunt.race.id === 'krogan') {
        acMod++
      }
      grunt.ac = config.cr.acDc + acMod
    }
  }
}
