export const Type = {
  methods: {
    setGruntType(grunt) {
      grunt.type = grunt.race.name === 'Geth' || grunt.race.name === 'Unshackled AI' ? 'Synthetic' : 'Organic'
    }
  }
}
