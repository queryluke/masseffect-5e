export const Id = {
  methods: {
    setId () {
      this.npc.id = `generated-${this.npc.name.replace('-', '-').toLowerCase()}-${Date.now()}`
    }
  }
}
