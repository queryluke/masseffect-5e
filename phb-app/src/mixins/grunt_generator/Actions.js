export const Actions = {
  methods: {
    setGruntActions(config, grunt) {
      config.targetDamage = this.getTargetDamage(config, grunt);
      switch (config.sc.id) {
        case 'adept': {
          grunt.spellcasting = true;
          break;
        }
        default: {
          this.setWeaponActions(config, grunt);
        }
      }
    }
  }
};
