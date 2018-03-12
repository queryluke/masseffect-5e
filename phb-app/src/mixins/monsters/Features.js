export const Features = {
  methods: {
    setMonsterFeatures(monster) {
      const weapons = this.getMutableData('weapons');
      const grenades = this.getMutableData('grenades');
      const features = this.getMutableData('monsterFeatures');
      for (const featureId of monster.featuresActionsReactions) {
        // matches a weapon?
        let weapon = weapons.find(weapon => weapon.id === featureId);
        if (weapon) {
          weapon = this.setWeaponDamage(weapon, monster);
          monster.actions.push(this.generateWeaponAttack(monster.profBonus, weapon));
        }
        // matches a grenade?
        const grenade = grenades.find(grenade => grenade.id === featureId);
        if (grenade) {
          monster.actions.push(this.generateGrenadeAttack(grenade));
        }
        const feature = features.find(feature => feature.id === featureId);
        if (feature) {
          this.addFeature(monster, feature);
        }
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
