export const Speed = {
  computed: {
    // TODO: This should incorporate equipment data
    csSpeed: {
      get () {
        return this.character.currentStats.speed || this.speciesData.speed.find(i => i.type === 'walk').speed
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', {
          cid: this.cid,
          attr: 'currentStats.speed',
          value
        })
      }
    }
  }
}
