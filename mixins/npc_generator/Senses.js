export const Senses = {
  methods: {
    setSenses () {
      let senses = false
      switch (this.options.species.id) {
        case 'prothean':
          senses = { truesight: 30 }
          break
        case 'quarian':
        case 'vorcha': {
          if (this.randomValue([1, 2, 3]) === 3) {
            senses = { darkvision: 60 }
          }
        }
      }
      this.npc.senses = senses
    }
  }
}
