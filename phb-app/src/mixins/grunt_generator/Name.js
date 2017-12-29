export const Name = {
  methods: {
    setGruntName(config, grunt) {
      let name = config.race.name;
      if (config.sc) {
        name += ` ${config.sc.name}`;
      } else {
        name += ' Grunt';
      }
      grunt.name = name;
    }
  }
};
