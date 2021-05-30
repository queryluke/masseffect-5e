export const Spellcasting = {
  data () {
    return {
      spellDpr: {
        0: 7,
        1: 15,
        2: 32,
        3: 49,
        4: 64
      }
    }
  },
  computed: {
    adept () {
      return this.$store.getters.getItem('classes', 'adept')
    }
  },
  methods: {
    setGruntSpellcasting () {
      if (this.options.klass.id === 'soldier' || this.options.cr.powercastingLevel === false) {
        this.grunt.powercasting = false
        return
      }
      const crPcLevel = this.options.cr.powercastingLevel
      const pcLevel = ['engineer', 'adept'].includes(this.options.klass.id) ? crPcLevel : Math.ceil(crPcLevel / 2)
      const spellcastingLevelIndex = pcLevel - 1
      const spellSlots = {}
      for (const col of this.adept.progressionColumns.filter(i => i.ps)) {
        if (col.values[spellcastingLevelIndex] > 0) {
          spellSlots[col.name[0]] = col.values[spellcastingLevelIndex]
        }
      }
      let maxLevelSpell = 1
      if (spellSlots['4']) {
        maxLevelSpell = 4
      } else if (spellSlots['3']) {
        maxLevelSpell = 3
      } else if (spellSlots['2']) {
        maxLevelSpell = 2
      }
      const availableSpells = this.spells.filter(s => s.availableClasses.includes(this.options.klass.id) && s.level <= maxLevelSpell && s.level > 0)
      const knownSpells = []
      const spellsKnown = this.adept.progressionColumns.find(i => i.key === 'powersKnown').values[spellcastingLevelIndex]
      for (let i = 0; i <= (spellsKnown / 2); i++) {
        const spell = this.randomValue(availableSpells)
        knownSpells.push(spell.id)
        availableSpells.splice(availableSpells.indexOf(spell), 1)
      }
      if (['sentinel', 'vanguard', 'adept'].includes(this.options.klass.id)) {
        const knownCantrips = this.spells.filter(s => s.availableClasses.includes(this.options.klass.id) && s.level === 0)
        const cantrips = this.adept.progressionColumns.find(i => i.key === 'cantrips').values[spellcastingLevelIndex]
        for (let i = 0; i <= cantrips; i++) {
          const cantrip = this.randomValue(knownCantrips)
          knownSpells.push(cantrip.id)
        }
      }
      const spellcastingMod = this.options.species.id === 'asari'
        ? 'cha'
        : ['engineer', 'infiltrator'].includes(this.options.klass.id)
            ? 'int'
            : ['adept', 'vanguard'].includes(this.options.klass.id)
                ? 'wis'
                : 'cha'
      this.grunt.powercasting = {
        level: pcLevel,
        mod: spellcastingMod,
        powerList: [...new Set(knownSpells)]
      }
      this.dpr.spell = this.spellDpr[maxLevelSpell]
    }
  }
}
