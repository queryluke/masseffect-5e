export const Name = {
  methods: {
    setGruntName (grunt) {
      let name = grunt.race.name
      if (grunt.sc.id === 'none') {
        name += ' Grunt'
      } else {
        name += ` ${grunt.sc.name}`
      }
      grunt.name = name
    }
  }
}
