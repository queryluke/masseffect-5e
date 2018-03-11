export const Tech = {
  methods: {
    setGruntTech(config, grunt) {
      const effectiveCr = this.getEffectiveCr(config, grunt);
      const techArray = this.numSpellsByLevel[grunt.sc.id][effectiveCr.spellcastingLevel];
      const numTech = techArray[0];
      const perDay = techArray[1];
      const tpSpent = techArray[2];
      grunt.techcasting = {
        perDay,
        tpSpent,
        dc: 8 + config.cr.profBonus + this.abilityScoreBonus(grunt.abilityScores.int),
        hit: config.cr.profBonus + this.abilityScoreBonus(grunt.abilityScores.int),
        spells: []
      };
      let totalSpells = 0;
      let totalDmgSpells = 0;
      const availableSpells = this.tech.filter(spell => spell.min_tech_points <= tpSpent && spell[grunt.sc.id] === 'x');
      for (let i = 1; i <= numTech; i++) {
        if (availableSpells.length < 1) {
          continue;
        }
        const spell = this.randomValue(availableSpells);
        grunt.techcasting.spells.push(spell);
        availableSpells.splice(availableSpells.indexOf(spell), 1);
        // Increase total counts
        totalSpells++;
        if (spell.effect.includes('damage')) {
          totalDmgSpells++;
        }
      }

      if (totalDmgSpells >= totalSpells / 2) {
        config.targetDamage.dmgMin /= 1.3;
        config.targetDamage.dmgMax /= 1.3;
      }
    }
  },
  data() {
    return {
      tech: [],
      progressions: {
        adept: {},
        sentinel: {},
        vanguard: {}
      },
      numSpellsByLevel: {
        engineer: {
          1: [1, 3, 1],
          2: [1, 3, 1],
          3: [2, 4, 2],
          4: [2, 4, 2],
          5: [2, 5, 3],
          6: [3, 5, 3],
          7: [3, 6, 4],
          8: [3, 6, 4],
          9: [3, 7, 5],
          10: [4, 7, 5],
          11: [4, 8, 6],
          12: [4, 8, 6],
          13: [4, 9, 7],
          14: [4, 9, 7],
          15: [5, 10, 8],
          16: [5, 10, 8],
          17: [5, 10, 9],
          18: [5, 10, 9]
        },
        infiltrator: {
          1: [0, 0, 0],
          2: [1, 1, 1],
          3: [1, 2, 1],
          4: [1, 2, 2],
          5: [1, 3, 3],
          6: [1, 3, 3],
          7: [2, 3, 3],
          8: [2, 4, 3],
          9: [2, 4, 4],
          10: [2, 4, 4],
          11: [2, 4, 4],
          12: [2, 5, 4],
          13: [3, 5, 5],
          14: [3, 5, 5],
          15: [3, 5, 5],
          16: [3, 6, 5],
          17: [3, 6, 6],
          18: [3, 6, 6]
        },
        sentinel: {
          1: [1, 1, 1],
          2: [1, 1, 2],
          3: [1, 2, 2],
          4: [1, 2, 2],
          5: [1, 2, 3],
          6: [2, 2, 3],
          7: [2, 2, 3],
          8: [2, 2, 3],
          9: [2, 2, 4],
          10: [2, 3, 4],
          11: [2, 3, 4],
          12: [3, 3, 4],
          13: [3, 3, 5],
          14: [3, 4, 5],
          15: [3, 4, 5],
          16: [3, 4, 5],
          17: [3, 4, 6],
          18: [3, 5, 6]
        }
      }
    };
  },
  created() {
    this.tech = this.getData('spells').data.filter(spell => spell.type === 'tech');
  }
};
