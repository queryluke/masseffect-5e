export const SavingThrows = {
  methods: {
    setGruntSavingThrows(config, grunt) {
      const crMetaLevel = parseFloat(config.cr.cr) <= 1 ? 0 : Math.ceil(parseFloat(config.cr.cr) / 4);
      let numSavingThrows = this.randomValue(this.savingThrowWeights[crMetaLevel]);
      const savingThrows = this.savingThrows.slice(0);
      if (grunt.sc.id !== 'none') {
        const classSavingThrows = grunt.sc.saving_throw.split(',').map(st => {
          return st.toLowerCase().trim().slice(0, 3);
        });
        for (const classSt of classSavingThrows) {
          if (numSavingThrows > 0) {
            const abilityScoreBonus = this.abilityScoreBonus(grunt.abilityScores[classSt]) + config.cr.profBonus;
            if (abilityScoreBonus > 0) {
              savingThrows.splice(savingThrows.indexOf(classSt), 1);
              grunt.savingThrows.push(classSt);
              numSavingThrows--;
            }
          }
        }
      }
      for (let i = 1; i <= numSavingThrows; i++) {
        const savingThrow = this.randomValue(savingThrows);
        const abilityScoreBonus = this.abilityScoreBonus(savingThrow) + config.cr.profBonus;
        if (abilityScoreBonus > 0) {
          savingThrows.splice(savingThrows.indexOf(savingThrow), 1);
          grunt.savingThrows.push(savingThrow);
        }
      }

      if (grunt.savingThrows.length > 2) {
        config.effective.ac += 2;
      }
    }
  },
  data() {
    return {
      savingThrowWeights: {
        0: [0, 0, 0, 1],
        1: [0, 1, 1, 2],
        2: [1, 1, 2, 2],
        3: [2, 2, 2, 3]
      },
      savingThrows: ['str', 'dex', 'con', 'int', 'wis', 'cha']
    };
  }
};
