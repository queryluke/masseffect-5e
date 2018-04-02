export const Id = {
  methods: {
    setGruntId (grunt) {
      const name = grunt.name === undefined ? grunt.race.name : grunt.name
      grunt.id = `${name.replace(' ', '_').toLowerCase()}_${Date.now()}`
    }
  }
}
