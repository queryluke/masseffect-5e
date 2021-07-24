export const Background = {
  computed: {
    backgroundId: {
      get () {
        return this.character.background.id
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', {
          cid: this.cid,
          attr: 'background',
          value: {
            id: value,
            selections: {}
          }
        })
      }
    },
    backgroundData () {
      return this.backgroundId ? this.backgrounds.find(i => i.id === this.backgroundId) : null
    }
  }
}
