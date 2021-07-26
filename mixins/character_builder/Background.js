export const Background = {
  computed: {
    backgroundId: {
      get () {
        return this.character.background
      },
      set (value) {
        const oldBgId = this.backgroundId
        // delete any selections
        this.$store.dispatch('cb/DELETE_SELECTIONS', {
          cid: this.cid,
          id: `background-${oldBgId}`
        })
        // set the species id
        this.$store.commit('cb/UPDATE_CHARACTER', {
          cid: this.cid,
          attr: 'background',
          value
        })
        // add any mandatory selections
        let currSelections = JSON.parse(JSON.stringify(this.selections))
        if (this.backgroundData.mechanics) {
          const bgSourceId = `background-${this.backgroundId}`
          currSelections = currSelections.concat(this.getMechanicsWithoutChoices(bgSourceId, this.backgroundData.mechanics))
        }
        this.$store.commit('cb/UPDATE_CHARACTER', {
          cid: this.cid,
          attr: 'selections',
          value: currSelections
        })
      }
    },
    backgroundData () {
      return this.backgroundId ? this.backgrounds.find(i => i.id === this.backgroundId) : null
    },
    backgroundHasSelections () {
      if (!this.backgroundId) {
        return true
      }
      if (!this.backgroundData.mechanics) {
        return false
      }
      const bgMechanics = this.backgroundData.mechanics.filter(i => i.choices)
      if (bgMechanics.length === 0) {
        return false
      }
      return bgMechanics.some(i => this.mechanicNeedsSelection(i, `background-${this.backgroundId}-${i.id}`, i.choices.count))
    }
  }
}
