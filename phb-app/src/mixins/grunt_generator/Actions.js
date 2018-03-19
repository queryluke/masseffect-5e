export const Actions = {
  methods: {
    setGruntActions(config, grunt) {
      const crMetaLevel = parseFloat(config.cr.cr) <= 1 ? 0 : Math.ceil(parseFloat(config.cr.cr) / 4);

      if (grunt.sc.id === 'infiltrator') {
        grunt.actions.push({
          type: 'common',
          name: 'Tactical Cloak',
          recharge: `${crMetaLevel + 1}/Day`,
          description: 'As a bonus action, the infiltrator may cast Tactical Cloak, becoming {invisible}. ' +
          'When it makes a melee, ranged, or tech attack, tactical cloak ends.'
        });
        config.effective.ac += 1;
        // need to make this scale better
        const sneakAttackDie = `${Math.ceil(crMetaLevel + 1 + (crMetaLevel / 2))}d6`;
        const extraDmg = this.averageFromDie(sneakAttackDie);
        grunt.actions.push({
          type: 'common',
          name: 'Sneak Attack',
          recharge: '1/Turn',
          description: `The infiltrator deals an extra ${extraDmg} (${sneakAttackDie}) damage when it hits a target with a weapon attack and has advantage on the attack roll, ` +
          'or when the target is within 5 feet of an ally of the infiltrator that isn\'t incapacitated and the infiltrator doesn\'t have disadvantage on the attack roll.'
        });
        config.effective.dmg += extraDmg;
      }

      config.targetDamage = this.getTargetDamage(config, grunt);

      if (['adept', 'vanguard', 'sentinel'].includes(grunt.sc.id)) {
        this.setGruntBiotics(config, grunt);
      }
      // need to add cantrip for asari, innate spellcasting?

      if (['engineer', 'infiltrator', 'sentinel'].includes(grunt.sc.id)) {
        this.setGruntTech(config, grunt);
      }

      this.setWeaponActions(config, grunt);
      if (Math.floor(Math.random() * 100) < (crMetaLevel + 1) * 10) {
        const availableGrenades = this.grenades.filter(grenade => {
          return grenade.dpr <= config.targetDamage.dmgMax;
        });
        if (availableGrenades.length > 0) {
          const grenade = this.randomValue(availableGrenades);
          grunt.actions.push(this.generateGrenadeAttack(grenade));
        }
      }
    }
  },
  data() {
    return {
      grenades: []
    };
  },
  created() {
    this.grenades = this.getMutableData('grenades').map(grenade => {
      const dmgAmt = grenade.damage_amount ? parseInt(grenade.damage_amount, 10) : 0;
      const dmg = grenade.dd ? (((parseInt(grenade.dd.replace(/\D/gi, ''), 10) * 2) + 1) / 2) : 0;
      grenade.dpr = dmgAmt * dmg;
      return grenade;
    });
  }
};
