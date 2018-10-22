export const Speed = {
  methods: {
    setGruntSpeed () {
      switch (this.race.id) {
        case 'volus': {
          this.grunt.speed = '8m'
          break
        }
        case 'quarian': {
          if (this.randomValue([1, 2, 3]) === 3) {
            this.grunt.speed = '12m'
          } else {
            this.grunt.speed = '10m'
          }
          break
        }
        case 'drell': {
          this.grunt.speed = '12m'
          break
        }
        case 'vorcha': {
          this.grunt.speed = '14m'
          break
        }
        default: {
          this.grunt.speed = '10m'
        }
      }
    }
  }
}
