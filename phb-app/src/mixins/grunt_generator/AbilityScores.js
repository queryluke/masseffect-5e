export const AbilityScores = {
  methods: {
    setGruntAbilityScores(config, grunt) {
      grunt.abilityScores = {
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0
      };
      const classStats = {
        adept: {wis: 3, dex: 2, cha: 1},
        engineer: {int: 3, con: 2, dex: 1},
        infiltrator: {dex: 3, int: 2, cha: 1},
        sentinel: {con: 3, int: 2, wis: 1},
        soldier: {dex: 3, con: 2, str: 1},
        vanguard: {str: 3, wis: 2, con: 1}
      };
      let statWeights = {};
      const standardArray = [15, 14, 13, 12, 10, 8];

      // Create stat weights
      if (config.sc.id === 'none') {
        const abilities = Object.keys(grunt.abilityScores);
        let i = 3;
        while (i > 0) {
          const ability = this.randomValue(abilities);
          statWeights[ability] = i;
          abilities.splice(abilities.indexOf(ability), 1);
          i--;
        }
      } else {
        statWeights = classStats[config.sc.id];
      }

      const weightedAbilitySelection = {
        increase: Object.keys(grunt.abilityScores),
        reduction: Object.keys(grunt.abilityScores)
      };
      // Set base ability scores & setup the weighted ability selection
      const abilities = Object.keys(grunt.abilityScores);
      for (const w in statWeights) {
        if (Object.prototype.hasOwnProperty.call(statWeights, w)) {
          const weightedArray = standardArray.slice(0, (standardArray.length - statWeights[w]));
          const score = this.randomValue(weightedArray);
          grunt.abilityScores[w] = score;
          standardArray.splice(standardArray.indexOf(score), 1);
          abilities.splice(abilities.indexOf(w), 1);
          let i = 0;
          while (i < statWeights[w]) {
            weightedAbilitySelection.increase.push(w);
            i++;
          }
        }
      }
      for (const ability of abilities) {
        const score = this.randomValue(standardArray);
        grunt.abilityScores[ability] = score;
        standardArray.splice(standardArray.indexOf(score), 1);
        weightedAbilitySelection.reduction.push(ability);
        weightedAbilitySelection.reduction.push(ability);
      }

      // Set boosts based on CR
      if (config.cr.abIncrease) {
        const increase = this.randomValue(config.cr.abIncrease);
        for (let i = 0; i < increase; i++) {
          const ability = this.randomValue(weightedAbilitySelection.increase);
          grunt.abilityScores[ability]++;
        }
      }
      // Set decreases based on CR
      if (config.cr.abReduction) {
        const reduction = this.randomValue(config.cr.abReduction);
        for (let i = 0; i < reduction; i++) {
          const ability = this.randomValue(weightedAbilitySelection.reduction);
          if (grunt.abilityScores[ability] === 1) {
            continue;
          }
          grunt.abilityScores[ability]--;
        }
      }

      // add race attributes
      switch (config.race.id) {
        case 'human': {
          let ability = this.randomValue(weightedAbilitySelection.increase);
          grunt.abilityScores[ability] += 2;
          ability = this.randomValue(weightedAbilitySelection.increase);
          grunt.abilityScores[ability]++;
          break;
        }
        case 'unshackled_ai': {
          const filteredInt = weightedAbilitySelection.increase.filter(ability => {
            return ability === 'int';
          });
          const ability = this.randomValue(filteredInt);
          grunt.abilityScores[ability]++;
          grunt.abilityScores.int += 2;
          break;
        }
        default: {
          const increases = config.race.increases.split(',');
          for (const inc of increases) {
            const ability = inc.toLowerCase().replace(/[^a-z]/g, '').slice(0, 3);
            const increase = parseInt(inc.replace(/\D/, ''), 10);
            grunt.abilityScores[ability] += increase;
          }
        }
      }

      return grunt.abilityScores;
    }
  }
};
