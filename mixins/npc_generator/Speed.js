export const Speed = {
  methods: {
    setSpeed () {
      let range = 30
      switch (this.options.species.id) {
        case 'volus': {
          range = 25
          break
        }
        case 'elcor': {
          range = 20
          break
        }
        case 'quarian': {
          if (this.randomValue([1, 2, 3]) === 3) {
            range = 35
          } else {
            range = 30
          }
          break
        }
        case 'drell': {
          range = 35
          break
        }
        case 'vorcha': {
          range = 40
          break
        }
        default: {
          range = 30
        }
      }
      this.npc.speed = { walk: range }
    }
  }
}
