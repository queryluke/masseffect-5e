export const Helpers = {
  methods: {
    getEffectiveCrAdjustment(config, grunt) {
      // Get the recommended dmg output by effective dmg
      const recDmgOutput = Math.floor(((config.cr.dmgMin + config.cr.dmgMax) / 2) + config.effective.dmg);
      // Find the recommended cr by the effective dmg
      let recCrByDmg = this.crArray.find(cr => {
        return recDmgOutput >= cr.dmgMin && recDmgOutput <= cr.dmgMax;
      });
      // prevent any null crs
      recCrByDmg = recCrByDmg ? recCrByDmg : config.cr;
      // calc the effective attack
      const effectiveAtk = config.cr.attackBonus + config.effective.atk;
      // count of how much higher/lower the attack bonus is (divided by 2 because adjustment is for every 2 points)
      let offensiveAdjustment = (effectiveAtk - recCrByDmg.attackBonus) / 2;
      offensiveAdjustment = offensiveAdjustment >= 0 ? Math.floor(offensiveAdjustment) : Math.ceil(offensiveAdjustment);

      // Get the recommended hp output by effective hp
      const shields = grunt.sp ? grunt.sp.average : 0;
      const recHp = grunt.hp.average + shields + config.effective.hp;
      // Find the recommended cr by the effective hp
      const recCrByHp = this.crArray.find(cr => {
        return recHp >= cr.hpMin && recHp <= cr.hpMax;
      });
      // prevent any null crs
      const effectiveAc = grunt.ac + config.effective.ac;
      // count of how much higher/lower the ac is (divided by 2 because adjustment is for every 2 points)
      let defensiveAdjustment = (effectiveAc - recCrByHp.acDc) / 2;
      defensiveAdjustment = defensiveAdjustment >= 0 ? Math.floor(defensiveAdjustment) : Math.ceil(defensiveAdjustment);

      return (defensiveAdjustment + offensiveAdjustment) * -1;
    },
    getEffectiveCr(config, grunt) {
      const totalAdjustment = this.getEffectiveCrAdjustment(config, grunt);
      let crIndex = config.cr.id + totalAdjustment;
      crIndex = crIndex < 1 ? 1 : crIndex;
      crIndex = crIndex > 15 ? 15 : crIndex;
      return this.crArray[crIndex - 1];
    },
    getTargetDamage(config, grunt) {
      const effectiveCr = this.getEffectiveCr(config, grunt);
      return {
        dmgMin: effectiveCr.dmgMin,
        dmgMax: effectiveCr.dmgMax
      }
    }
  },
  data() {
    return {
      crArray: []
    };
  },
  created() {
    return this.$http
    .get('../data/stats_by_cr.json')
    .then(response => response.json())
    .then(response => {
      this.crArray = response;
    });
  }
};
