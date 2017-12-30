export const Features = {
  methods: {
    setGruntFeatures(config, grunt) {
      const crMetaLevel = Math.ceil(parseFloat(config.cr.cr) / 4);
      // Deal with special traits
      let features = JSON.parse(JSON.stringify(this.monsterFeatures));
      features = features.map(feature => {
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
        return feature;
      });

      const availableFeatures = features.filter(feature => {
        return feature[config.race.id] === 'x';
      });
      grunt.features = features.filter(feature => {
        return feature[config.race.id] === 'a';
      });

      // Set additional features
      let numFeatureArray = [0, 0, 1, 1, 2];
      if (crMetaLevel === 1) {
        numFeatureArray = [0, 1, 1, 2, 2];
      } else if (crMetaLevel === 3) {
        numFeatureArray = [1, 2, 2, 3, 3];
      }
      const numFeatures = this.randomValue(numFeatureArray);
      for (let i = 1; i <= numFeatures; i++) {
        const addFeature = this.randomValue(availableFeatures);
        availableFeatures.splice(availableFeatures.indexOf(addFeature), 1);
        switch (addFeature.type) {
          case 'condition': {
            grunt.conditionImmunities = grunt.conditionImmunities.concat(addFeature.description.split(',').map(feature => {
              return feature.trim();
            }));
            break;
          }
          case 'resistance': {
            grunt.damageResistances = grunt.damageResistances.concat(addFeature.description.split(',').map(feature => {
              return feature.trim();
            }));
            config.effective.resistances = true;
            break;
          }
          case 'reactions': {
            grunt.reactions.push(addFeature);
            if (addFeature.crKey) {
              config.effective[addFeature.crKey] += parseInt(addFeature.crEffect, 10);
            }
            break;
          }
          default: {
            grunt.features.push(addFeature);
            if (addFeature.crKey) {
              config.effective[addFeature.crKey] += parseInt(addFeature.crEffect, 10);
            }
          }
        }
      }

      // Add quarian resistances
      if (config.race.id === 'quarian') {
        grunt.damageResistances.push('necrotic');
        grunt.damageResistances.push('poison');
      }

      grunt.damageResistances = Array.from(new Set(grunt.damageResistances));
      grunt.conditionImmunities = Array.from(new Set(grunt.conditionImmunities));
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
