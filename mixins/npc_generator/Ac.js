export const Ac = {
  methods: {
    setGruntAc () {
      this.grunt.ac = 10
      const acModArray = [-2, -1, -1, 0, 1, 1, 2]

      if (this.options.species.id === 'geth') {
        this.grunt.ac = 13 + this.abilityScoreBonus(this.grunt.abilityScores.dex) + this.options.cr.profBonus
        return
      }
      if (['adept', 'infiltrator'].includes(this.options.klass.id)) {
        acModArray.push(-2)
        acModArray.push(-2)
      } else if (['soldier', 'sentinel'].includes(this.options.klass.id)) {
        acModArray.push(2)
        acModArray.push(2)
      } else {
        acModArray.push(0)
        acModArray.push(0)
      }

      let acMod = this.randomValue(acModArray)

      if (this.options.species.id === 'krogan') {
        acMod++
      }
      this.grunt.ac = this.options.cr.acDc + acMod
    }
  }
}
