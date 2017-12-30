export const Features = {
  methods: {
    setGruntFeatures(config, grunt) {
      const crMetaLevel = Math.ceil(parseFloat(config.cr.cr) / 4);
      const features = JSON.parse(JSON.stringify(this.monsterFeatures));

      // Set base features
      const mandatoryFeatures = features.filter(feature => {
        return feature[config.race.id] === 'a';
      });
      for (const feature of mandatoryFeatures) {
        this.addFeature(config, grunt, feature);
      }

      // Set additional features
      const availableFeatures = features.filter(feature => {
        return feature[config.race.id] === 'x';
      });
      let numFeatureArray = [0, 0, 1, 1, 2];
      if (crMetaLevel === 1) {
        numFeatureArray = [0, 1, 1, 2, 2];
      } else if (crMetaLevel === 3) {
        numFeatureArray = [1, 2, 2, 3, 3];
      }
      const numFeatures = this.randomValue(numFeatureArray);
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
      switch (feature.id) {
        case 'mind_meld': {
          feature.description = feature.description.replace(/{dc}/g, config.cr.acDc);
          break;
        }
        case 'relentless': {
          feature.crEffect *= crMetaLevel;
          break;
        }
        default: {
          if (/{dmg}/.test(feature.description)) {
            const dmgArray = feature.crEffect.split('d');
            const numDie = parseInt(dmgArray[0], 10) * crMetaLevel;
            const avgDamage = Math.floor(((parseInt(dmgArray[1], 10) + 1) / 2) * numDie);
            feature.crEffect = avgDamage;
            const dmgDisplay = `${avgDamage} (${numDie}d${dmgArray[1]})`;
            feature.description = feature.description.replace(/{dmg}/g, dmgDisplay);
          }
          break;
        }
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
          config.effective.resistances = true;
          break;
        }
        case 'reaction': {
          grunt.reactions.push(feature);
          if (feature.crKey) {
            config.effective[feature.crKey] += parseInt(feature.crEffect, 10);
          }
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
      monsterFeatures: []
    };
  },
  created() {
    return this.$http
    .get('../data/monster_features.json')
    .then(response => response.json())
    .then(response => {
      this.monsterFeatures = response.data;
    });
  }
};
