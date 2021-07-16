export const Info = {
  computed: {
    characterImage: {
      get () {
        return this.character.image || this.speciesData.bodyImg || require('~/assets/images/me5e_logo_450w.png')
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'image', value })
      }
    },
    characterName: {
      get () {
        return this.character.name || 'Unnamed Character'
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'name', value })
      }
    }
  }
}
