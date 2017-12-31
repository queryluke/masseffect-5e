export const Actions = {
  methods: {
    setGruntActions(config, grunt) {
      switch (config.sc.id) {
        case 'adept': {
          grunt.spellcasting = true;

        }
      }

    }
  }
};
