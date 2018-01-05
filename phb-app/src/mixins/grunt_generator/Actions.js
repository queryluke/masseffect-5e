export const Actions = {
  methods: {
    setGruntActions(config, grunt) {
      config.targetDamage = this.getTargetDamage(config, grunt);
      switch (grunt.sc.id) {
        case 'adept': {
          grunt.spellcasting = true;
          break;
        }
        case 'engineer': {
          grunt.spellcasting = true;
          break;
        }
        case 'vanguard': {
          grunt.spellcasting = true;
          break;
        }
        case 'sentinel': {
          grunt.spellcasting = true;
          break;
        }
        case 'infiltrator': {
          grunt.spellcasting = true;
          break;
        }
        default: {
          this.setWeaponActions(config, grunt);
        }
      }
      const crMetaLevel = parseFloat(config.cr.cr) <= 1 ? 0 : Math.ceil(parseFloat(config.cr.cr) / 4);
      if (Math.floor(Math.random() * 100) < crMetaLevel * 10) {
        const availableGrenades = this.grenades.filter(grenade => {
          return grenade.dpr <= config.targetDamage.dmgMax;
        });
        if (availableGrenades.length > 0) {
          const grenade = this.randomValue(availableGrenades);
          const description = grenade.desc.map(line => line.data).join(' ');
          grunt.actions.push({
            type: 'common',
            name: grenade.name,
            recharge: `${crMetaLevel} grenades`,
            description
          });
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
    return this.$http
    .get('../data/grenades_mines.json')
    .then(response => response.json())
    .then(response => {
      this.grenades = response.data.map(grenade => {
        grenade.dpr = parseInt(grenade.damage_amount, 10) * (((parseInt(grenade.dd, 10) * 2) + 1) / 2);
        return grenade;
      });
    });
  }
};
