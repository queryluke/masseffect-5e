export const Biotics = {
  methods: {
    setGruntBiotics (config, grunt) {
      const effectiveCr = this.getEffectiveCr(config, grunt)
      const chaOrWis = grunt.race.id === 'asari' ? 'cha' : 'wis'
      grunt.spellcasting = {
        level: effectiveCr.spellcastingLevel,
        dc: 8 + config.cr.profBonus + this.abilityScoreBonus(grunt.abilityScores[chaOrWis]),
        hit: config.cr.profBonus + this.abilityScoreBonus(grunt.abilityScores[chaOrWis]),
        mod: chaOrWis === 'cha' ? 'Charisma' : 'Wisdom',
        spells: []
      }
      let totalSpells = 0
      let totalDmgSpells = 0
      const progressionLevel = this.progressions[grunt.sc.id].find(row => row.level === effectiveCr.spellcastingLevel)
      grunt.barrier = progressionLevel.barrierTicks
      // Deal with cantrips
      const cantrips = {
        level: 'cantrip',
        spells: []
      }
      let numCantrips = progressionLevel.cantrips
      const availableSpells = this.spells.filter(spell => spell.level === '0' && spell.availableClasses.includes(grunt.sc.id))
      for (let i = 1; i <= numCantrips; i++) {
        if (availableSpells.length < 1) {
          continue
        }
        const spell = this.randomValue(availableSpells)
        cantrips.spells.push(spell)
        availableSpells.splice(availableSpells.indexOf(spell), 1)
        // Increase total counts
        totalSpells++
        if (spell.effect.includes('damage')) {
          totalDmgSpells++
        }
      }
      grunt.spellcasting.spells.push(cantrips)
      // Deal with the rest of the spells
      for (const slots of Object.entries(progressionLevel.spellSlots)) {
        if (!slots[1]) {
          continue
        }
        const spellLevel = parseInt(slots[0], 10)
        const spellSlots = parseInt(slots[1], 10)
        const levelSpells = {
          level: spellLevel,
          slots: spellSlots,
          spells: []
        }
        const numSpells = this.numSpellsByLevel[grunt.sc.id][effectiveCr.spellcastingLevel][spellLevel - 1]
        const availableSpells = this.spells.filter(spell => parseInt(spell.level, 10) === spellLevel && spell.availableClasses.includes(grunt.sc.id))
        for (let i = 1; i <= numSpells; i++) {
          if (availableSpells.length < 1) {
            continue
          }
          const spell = this.randomValue(availableSpells)
          levelSpells.spells.push(spell)
          availableSpells.splice(availableSpells.indexOf(spell), 1)
          // Increase total counts
          totalSpells++
          if (spell.effect.includes('damage')) {
            totalDmgSpells++
          }
        }
        grunt.spellcasting.spells.push(levelSpells)
      }

      if (totalDmgSpells >= totalSpells / 2) {
        config.targetDamage.dmgMin /= 2
        config.targetDamage.dmgMax /= 2
      }
    }
  },
  data () {
    return {
      spells: [],
      progressions: {
        adept: {},
        sentinel: {},
        vanguard: {}
      },
      numSpellsByLevel: {
        adept: {
          1: [2],
          2: [2],
          3: [3],
          4: [3],
          5: [3, 1],
          6: [3, 1],
          7: [3, 2],
          8: [3, 2],
          9: [3, 2, 1],
          10: [3, 2, 1],
          11: [4, 2, 1],
          12: [4, 2, 1],
          13: [4, 2, 1, 1],
          14: [4, 2, 1, 1],
          15: [4, 3, 2, 1],
          16: [4, 3, 2, 1],
          17: [4, 3, 2, 2],
          18: [4, 3, 2, 2]
        },
        vanguard: {
          1: [2],
          2: [2],
          3: [2],
          4: [2],
          5: [2],
          6: [2],
          7: [3, 1],
          8: [3, 1],
          9: [3, 1],
          10: [3, 1],
          11: [3, 2, 1],
          12: [3, 2, 1],
          13: [3, 2, 1],
          14: [3, 2, 1],
          15: [3, 2, 1, 1],
          16: [3, 2, 1, 1],
          17: [3, 2, 1, 1],
          18: [3, 2, 1, 1]
        },
        sentinel: {
          1: [0],
          2: [1],
          3: [1],
          4: [1],
          5: [1],
          6: [1, 1],
          7: [1, 1],
          8: [1, 1],
          9: [1, 1],
          10: [1, 1],
          11: [1, 1, 1],
          12: [1, 1, 1],
          13: [1, 1, 1],
          14: [1, 1, 1],
          15: [2, 1, 1, 1],
          16: [2, 1, 1, 1],
          17: [2, 1, 1, 1],
          18: [2, 1, 1, 1]
        }
      }
    }
  },
  created () {
    this.spells = this.getData('spells').filter(spell => spell.type === 'biotic')
    const classes = this.getMutableData('classes').filter(c => ['adept', 'sentinel', 'vanguard'].includes(c.id))
    this.progressions.adept = classes.find(c => c.id === 'adept').progression
    this.progressions.sentinel = classes.find(c => c.id === 'sentinel').progression
    this.progressions.vanguard = classes.find(c => c.id === 'vanguard').progression
  }
}
