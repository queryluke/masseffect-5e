export const Biotics = {
  methods: {
    setGruntBiotics(config, grunt) {
      const effectiveCr = this.getEffectiveCr(config, grunt);
      grunt.spellcasting = {
        level: effectiveCr.spellcastingLevel,
        dc: 8 + config.cr.profBonus + this.abilityScoreBonus(grunt.abilityScores.wis),
        hit: config.cr.profBonus + this.abilityScoreBonus(grunt.abilityScores.wis),
        spells: []
      };
      let totalSpells = 0;
      let totalDmgSpells = 0;
      const progressionLevel = this.progressions[grunt.sc.id].find(row => parseInt(row.level, 10) === effectiveCr.spellcastingLevel);
      for (const column of progressionLevel.row_data) {
        if (column.key === 'cantrips') {
          // Deal with cantrips
          const cantrips = {
            level: 'cantrip',
            spells: []
          };
          let numCantrips = parseInt(column.value, 10);
          const availableSpells = this.spells.filter(spell => spell.level === '0' && spell[grunt.sc.id] === 'x');
          // If vanguard, add barrier
          if (grunt.sc.id === 'vanguard') {
            const barrier = this.spells.find(spell => spell.id === 'barrier');
            cantrips.spells.push(barrier);
            availableSpells.splice(availableSpells.indexOf(barrier), 1);
            numCantrips--;
          }
          for (let i = 1; i <= numCantrips; i++) {
            const spell = this.randomValue(availableSpells);
            cantrips.spells.push(spell);
            availableSpells.splice(availableSpells.indexOf(spell), 1);
            if (grunt.sc.id === 'adept' && ['barrier_detonation', 'phase_disruptor'].includes(spell.id)) {
              const barrier = this.spells.find(spell => spell.id === 'barrier');
              cantrips.spells.push(barrier);
              availableSpells.splice(availableSpells.indexOf(barrier), 1);
              i++;
            }
            // Increase total counts
            totalSpells++;
            if (spell.effect.includes('damage')) {
              totalDmgSpells++;
            }
          }
          grunt.spellcasting.spells.push(cantrips);
        } else if (Number.isInteger(parseInt(column.key, 10)) && Number.isInteger(parseInt(column.value, 10))) {
          // Deal with the rest of the spells
          const spellLevel = parseInt(column.key, 10);
          const spellSlots = parseInt(column.value, 10);
          const levelSpells = {
            level: spellLevel,
            slots: spellSlots,
            spells: []
          };
          const numSpells = this.numSpellsByLevel[grunt.sc.id][effectiveCr.spellcastingLevel][spellLevel - 1];
          const availableSpells = this.spells.filter(spell => spell.level === column.key && spell[grunt.sc.id] === 'x');
          for (let i = 1; i <= numSpells; i++) {
            const spell = this.randomValue(availableSpells);
            levelSpells.spells.push(spell);
            availableSpells.splice(availableSpells.indexOf(spell), 1);
            // Increase total counts
            totalSpells++;
            if (spell.effect.includes('damage')) {
              totalDmgSpells++;
            }
          }
          grunt.spellcasting.spells.push(levelSpells);
        }
      }

      if (totalDmgSpells >= totalSpells / 2) {
        config.targetDamage.dmgMin /= 2;
        config.targetDamage.dmgMax /= 2;
      }
    }
  },
  data() {
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
    };
  },
  created() {
    const spells = this.$http.get('../data/spells.json').then(response => response.json());
    const aProg = this.$http.get('../data/adept_progression.json').then(response => response.json());
    const sProg = this.$http.get('../data/sentinel_progression.json').then(response => response.json());
    const vProg = this.$http.get('../data/vanguard_progression.json').then(response => response.json());
    Promise.all([spells, aProg, sProg, vProg]).then(response => {
      this.spells = response[0].data.filter(spell => spell.type === 'biotic');
      this.progressions.adept = response[1].data;
      this.progressions.sentinel = response[2].data;
      this.progressions.vanguard = response[3].data;
    });
  }
};
