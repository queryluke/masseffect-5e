export const Name = {
  methods: {
    setName () {
      this.npc.name = `${this.options.species.name} ${this.options.klass.name}`
    }
  }
}
