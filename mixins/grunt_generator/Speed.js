export const Speed = {
  methods: {
    setGruntSpeed () {
      let range = 25
      switch (this.options.species.id) {
        case 'volus': {
          range = 20
          break
        }
        case 'quarian': {
          if (this.randomValue([1, 2, 3]) === 3) {
            range = 30
          } else {
            range = 25
          }
          break
        }
        case 'drell': {
          range = 30
          break
        }
        case 'vorcha': {
          range = 35
          break
        }
        default: {
          range = 25
        }
      }
      this.grunt.speed = [{ type: 'walk', range }]
    }
  }
}
