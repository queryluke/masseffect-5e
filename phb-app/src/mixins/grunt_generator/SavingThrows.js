export const SavingThrows = {
  methods: {
    setGruntSavingThrows(config, grunt) {
      const crMetaLevel = parseFloat(config.cr.cr) <= 1 ? 0 : Math.ceil(parseFloat(config.cr.cr) / 4);
      let numSavingThrows = this.randomValue(this.savingThrowWeights[crMetaLevel]);
      const savingThrows = JSON.parse(JSON.stringify(this.savingThrows));
      if (grunt.sc.id !== 'none') {
        const classSavingThrows = grunt.sc.saving_throw.split(',').map(st => {
          return st.toLowerCase().trim().slice(0, 3);
        });
        for (const classSt of classSavingThrows) {
          if (numSavingThrows > 0) {
            const savingThrow = savingThrows.find(st => classSt === st.id);
            const abilityScoreBonus = this.abilityScoreBonus(grunt.abilityScores[classSt]) + config.cr.profBonus;
            if (abilityScoreBonus > 0) {
              savingThrows.splice(savingThrows.indexOf(savingThrow), 1);
              savingThrow.bonus = abilityScoreBonus;
              grunt.savingThrows.push(savingThrow);
              numSavingThrows--;
            }
          }
        }
      }
      for (let i = 1; i <= numSavingThrows; i++) {
        const savingThrow = this.randomValue(savingThrows);
        const abilityScoreBonus = this.abilityScoreBonus(savingThrow.id) + config.cr.profBonus;
        if (abilityScoreBonus > 0) {
          savingThrows.splice(savingThrows.indexOf(savingThrow), 1);
          savingThrow.bonus = abilityScoreBonus;
          grunt.savingThrows.push(savingThrow);
        }
      }

      if (grunt.savingThrows.length > 1) {
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
      savingThrows: [
        {id: 'str', name: 'Strength'},
        {id: 'dex', name: 'Dexterity'},
        {id: 'con', name: 'Constitution'},
        {id: 'int', name: 'Intelligence'},
        {id: 'wis', name: 'Wisdom'},
        {id: 'cha', name: 'Charisma'}
      ]
    };
  }
};
