export const Features = {
  methods: {
    setGruntFeatures(config, grunt) {
      const crMetaLevel = parseFloat(config.cr.cr) <= 1 ? 0 : Math.ceil(parseFloat(config.cr.cr) / 4);
      const features = this.getMutableData('monsterFeatures');

      // Set base features
      const mandatoryFeatures = features.filter(feature => {
        return feature[grunt.race.id] === 'a';
      });
      for (const feature of mandatoryFeatures) {
        this.addFeature(config, grunt, feature);
      }

      // Set additional features
      const availableFeatures = features.filter(feature => {
        return feature[grunt.race.id] === 'x';
      });
      const numFeatures = this.randomValue(this.numFeatureWeights[crMetaLevel]);
      for (let i = 1; i <= numFeatures; i++) {
        const feature = this.randomValue(availableFeatures);
        this.addFeature(config, grunt, feature);
        availableFeatures.splice(availableFeatures.indexOf(feature), 1);
      }

      grunt.damageResistances = Array.from(new Set(grunt.damageResistances));
      grunt.conditionImmunities = Array.from(new Set(grunt.conditionImmunities));
    },
    addFeature(config, grunt, feature) {
      const crMetaLevel = Math.ceil(parseFloat(config.cr.cr) / 4);
      if (feature.id === 'relentless') {
        feature.crEffect *= crMetaLevel;
      }
      if (/\[dmg]/.test(feature.description)) {
        const dmgArray = feature.crEffect.split('d');
        const numDie = parseInt(dmgArray[0], 10) * crMetaLevel;
        const avgDamage = Math.floor(((parseInt(dmgArray[1], 10) + 1) / 2) * numDie);
        feature.crEffect = avgDamage;
        const dmgDisplay = `${avgDamage} (${numDie}d${dmgArray[1]})`;
        feature.description = feature.description.replace(/\[dmg]/g, dmgDisplay);
      }

      switch (feature.type) {
        case 'condition': {
          grunt.conditionImmunities = grunt.conditionImmunities.concat(feature.description.split(',').map(imm => {
            return imm.trim();
          }));
          break;
        }
        case 'resistance': {
          grunt.damageResistances = grunt.damageResistances.concat(feature.description.split(',').map(res => {
            return res.trim();
          }));
          config.resistances = true;
          break;
        }
        case 'reaction': {
          grunt.reactions.push(feature);
          if (feature.crKey) {
            config.effective[feature.crKey] += parseInt(feature.crEffect, 10);
          }
          break;
        }
        case 'action': {
          grunt.actions.push({
            type: 'common',
            name: feature.name,
            recharge: feature.recharge,
            description: feature.description
          });
          break;
        }
        default: {
          grunt.features.push(feature);
          if (feature.crKey) {
            config.effective[feature.crKey] += parseInt(feature.crEffect, 10);
          }
        }
      }
    }
  },
  data() {
    return {
      numFeatureWeights: {
        0: [0, 0, 0, 1, 1],
        1: [0, 1, 1, 1, 2],
        2: [1, 1, 1, 2, 2],
        3: [1, 2, 2, 3, 3]
      }
    };
  }
};
