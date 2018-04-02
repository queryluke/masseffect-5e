export const Speed = {
  methods: {
    setGruntSpeed(config, grunt) {
      switch (grunt.race.id) {
        case 'volus': {
          grunt.speed = '8m'
          break
        }
        case 'quarian': {
          if (this.randomValue([1, 2, 3]) === 3 && !config.quarianCybEn) {
            grunt.speed = '12m'
            config.quarianCybEn = true
          } else {
            grunt.speed = '10m'
          }
          break
        }
        case 'drell': {
          grunt.speed = '12m'
          break
        }
        case 'vorcha': {
          grunt.speed = '14m'
          break
        }
        default: {
          grunt.speed = '10m'
        }
      }
    }
  }
}
