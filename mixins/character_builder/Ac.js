export const Ac = {
  computed: {
    csAc: {
      get () {
        return this.character.currentStats.ac
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', {
          cid: this.cid,
          attr: 'currentStats.ac',
          value
        })
      }
    }
  }

}
