export const Type = {
  methods: {
    setGruntType(config, grunt) {
      grunt.type = config.race.name === 'Geth' || config.race.name === 'Unshackled AI' ? 'Synthetic' : 'Organic';
    }
  }
};
