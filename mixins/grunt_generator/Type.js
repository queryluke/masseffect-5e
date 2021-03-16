export const Type = {
  methods: {
    setGruntType () {
      this.grunt.type = this.options.species.id === 'geth' || this.options.species.id === 'unshackled-ai' ? 'Synthetic' : 'Organic'
    }
  }
}
