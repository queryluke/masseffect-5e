export const Ac = {
  methods: {
    setGruntAc(config, grunt) {
      const acModArray = [-2, -1, -1, 0, +1, +1, +2];

      if (config.race.id === 'geth' || config.race.id === 'unshackled-ai') {
        grunt.ac = 13 + this.abilityScoreBonus(grunt.abilityScores.dex);
        return;
      }

      if (config.sc) {
        if (config.sc.id === 'adept' || config.sc.id === 'infiltrator') {
          acModArray.push(-2);
          acModArray.push(-2);
          acModArray.push(-3);
          acModArray.push(-3);
        } else if (config.sc.id === 'engineer' || config.sc.id === 'vanguard') {
          acModArray.push(0);
          acModArray.push(0);
        } else {
          acModArray.push(+2);
          acModArray.push(+2);
          acModArray.push(+3);
          acModArray.push(+3);
        }
      }
      const acMod = this.randomValue(acModArray);
      grunt.ac = config.cr.ac_dc + acMod;

      if (acMod > 1) {
        config.crAdjustment.defensive = 1;
      } else if (acMod < -1) {
        config.crAdjustment.defensive = -1;
      }
    }
  }
};
