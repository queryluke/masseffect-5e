export const Features = {
  methods: {
    setMonsterFeatures(monster) {
      const features = this.getMutableData('monsterFeatures');
      for (const featureId of monster.featuresActionsReactions) {
        const feature = features.find(feature => feature.id === featureId);
        this.addFeature(monster, feature);
      }
    },
    addFeature(monster, feature) {
      switch (feature.type) {
        case 'reaction': {
          monster.reactions.push(feature);
          break;
        }
        case 'legendary': {
          monster.legendaryActions.push(feature);
          break;
        }
        case 'feature': {
          monster.features.push(feature);
          break;
        }
        case 'action': {
          monster.actions.push({
            type: 'common',
            name: feature.name,
            recharge: feature.recharge,
            description: feature.description
          });
          break;
        }
        default: {
          const attackMod = this.abilityScoreBonus(monster.abilityScores[feature.attackMod]);
          const toHit = attackMod + parseInt(monster.profBonus, 10);
          const reachOrRange = feature.type === 'melee' ? 'reach' : 'range';
          const description = {
            attack: `+${toHit} to hit, ${reachOrRange} ${feature.range}m, ${feature.numberOfTargets}.`,
            hit: feature.description,
            miss: feature.miss
          };
          monster.actions.push({
            type: 'attack',
            name: feature.name,
            attackType: feature.type.slice(0, 1).toUpperCase() + feature.type.slice(1),
            description
          });
        }
      }
    }
  }
};
