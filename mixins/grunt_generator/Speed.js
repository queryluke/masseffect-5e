export const Speed = {
  methods: {
    setGruntSpeed () {
      let range = 10
      switch (this.options.species.id) {
        case 'volus': {
          range = 8
          break
        }
        case 'quarian': {
          if (this.randomValue([1, 2, 3]) === 3) {
            range = 12
          } else {
            range = 10
          }
          break
        }
        case 'drell': {
          range = 12
          break
        }
        case 'vorcha': {
          range = 14
          break
        }
        default: {
          range = 10
        }
      }
      this.grunt.speed = [{ type: 'walk', range }]
    }
  }
}
