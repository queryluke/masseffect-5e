export const InnateSpellcasting = {
  methods: {
    setGruntInnateSpellcasting () {
      switch (this.race.id) {
        case 'angara':
          this.grunt.innateSpellcasting = {
            level: 'innate',
            mod: 'cha',
            spellList: [{ perDay: 'At will', spells: [{id: 'shocking_grasp'}] }]
          }
          break
        case 'asari':
          const cantripOptions = this.spells.filter(s => s.type === 'biotic' && s.level === 0)
          const spellOptions = this.spells.filter(s => s.type === 'biotic' && s.level === 1)
          const cantrips = [this.randomValue(cantripOptions), this.randomValue(cantripOptions)].map(s => {
            return { id: s.id }
          })
          const spells = [this.randomValue(spellOptions)].map(s => {
            return { id: s.id }
          })
          this.grunt.innateSpellcasting = {
            level: 'innate',
            mod: 'cha',
            spellList: [
              {
                perDay: 'At will',
                spells: cantrips
              },
              {
                perDay: '1/Day',
                spells
              }
            ]
          }
          break
        default:
          this.grunt.innateSpellcasting = false
          break
      }
    }
  }
}
