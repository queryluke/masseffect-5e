export const Species = {
  computed: {
    speciesId: {
      get () {
        return this.character.species.id
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', {
          cid: this.cid,
          attr: 'species',
          value: {
            id: value,
            traitSelections: {}
          }
        })
      }
    },
    speciesData () {
      return this.speciesId ? this.species.find(i => i.id === this.speciesId) : null
    },
    speciesTraits () {
      // TODO: Translate these
      return this.traits.filter(i => i.species.includes(this.speciesId))
    },
    traitSelection: {
      get () {
        return this.character.species.traitSelections[this.traitSelectionId]
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: `species.traitSelections.${this.traitSelectionId}`, value })
      }
    }
  }
}
