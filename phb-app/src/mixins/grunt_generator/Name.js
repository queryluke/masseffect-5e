export const Name = {
  methods: {
    setGruntName(config, grunt) {
      let name = config.race.name;
      if (config.sc.id === 'none') {
        name += ' Grunt';
      } else {
        name += ` ${config.sc.name}`;
      }
      grunt.name = name;
    }
  }
};
