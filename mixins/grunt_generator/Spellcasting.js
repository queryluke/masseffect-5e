import adept from '~/static/data/classes/adept'

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
  methods: {
    setGruntSpellcasting () {
      if (this.sc.id === 'soldier' || this.cr.spellcastingLevel === false) {
        this.grunt.spellcasting = false
        return
      }
      const spellcastingLevel = ['engineer', 'adept'].includes(this.sc.id) ? this.cr.spellcastingLevel : Math.ceil(this.cr.spellcastingLevel / 2)
      const adeptProgression = adept.progression.find(p => p.level === spellcastingLevel)
      const spellSlots = adeptProgression.spellSlots
      let maxLevelSpell = 1
      if (spellSlots['4']) {
        maxLevelSpell = 4
      } else if (spellSlots['3']) {
        maxLevelSpell = 3
      } else if (spellSlots['2']) {
        maxLevelSpell = 2
      }
      const availableSpells = this.spells.filter(s => s.availableClasses.includes(this.sc.id) && s.level <= maxLevelSpell && s.level > 0)
      const knownSpells = []
      for (let i = 0; i <= (adeptProgression.spellsKnown / 2); i++) {
        const spell = this.randomValue(availableSpells)
        knownSpells.push(spell.id)
        availableSpells.splice(availableSpells.indexOf(spell), 1)
      }
      if (['sentinel', 'vanguard', 'adept'].includes(this.sc.id)) {
        const knownCantrips = this.spells.filter(s => s.availableClasses.includes(this.sc.id) && s.level === 0)
        for (let i = 0; i <= adeptProgression.cantrips; i++) {
          const cantrip = this.randomValue(knownCantrips)
          knownSpells.push(cantrip.id)
        }
      }
      const spellcastingMod = this.race.id === 'asari'
        ? 'cha'
        : ['engineer', 'infiltrator'].includes(this.sc.id)
          ? 'int'
          : ['adept', 'vanguard'].includes(this.sc.id)
            ? 'wis'
            : 'cha'
      this.grunt.spellcasting = {
        level: spellcastingLevel,
        mod: spellcastingMod,
        spellList: [...new Set(knownSpells)]
      }
      this.dpr.spell = this.spellDpr[maxLevelSpell]
    }
  }
}
