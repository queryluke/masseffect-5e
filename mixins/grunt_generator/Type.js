export const Type = {
  methods: {
    setGruntType () {
      this.grunt.type = this.race.id === 'geth' || this.race.id === 'unshackled-ai' ? 'Synthetic' : 'Organic'
    }
  }
}
