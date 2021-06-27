export const Type = {
  methods: {
    setType () {
      this.npc.type = this.options.species.id === 'geth' ? 'synthetic' : 'organic'
    }
  }
}
