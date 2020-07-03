export const InnateSpellcasting = {
  computed: {
    cantripOptions () {
      return this.spells.filter(s => s.type === 'biotic' && s.level === 0)
    },
    spellOptions () {
      return this.spells.filter(s => s.type === 'biotic' && s.level === 1)
    },
    asariSpells () {
      return [this.randomValue(this.spellOptions)].map((s) => {
        return { id: s.id }
      })
    },
    asariCantrips () {
      [this.randomValue(this.cantripOptions), this.randomValue(this.cantripOptions)].map((s) => {
        return { id: s.id }
      })
    }
  },
  methods: {
    setGruntInnateSpellcasting () {
      switch (this.race.id) {
        case 'angara':
          this.grunt.innateSpellcasting = {
            level: 'innate',
            mod: 'cha',
            spellList: [{ perDay: 'At will', spells: [{ id: 'shocking_grasp' }] }]
          }
          break
        case 'asari':
          this.grunt.innateSpellcasting = {
            level: 'innate',
            mod: 'cha',
            spellList: [
              {
                perDay: 'At will',
                spells: this.asariCantrips
              },
              {
                perDay: '1/Day',
                spells: this.asariSpells
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
