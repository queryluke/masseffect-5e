export const Species = {
  computed: {
    speciesId: {
      get () {
        return this.character.species
      },
      set (value) {
        console.log(value)
        const oldSpeciesId = this.speciesId
        // delete any old selections
        this.$store.dispatch('cb/DELETE_SELECTIONS', {
          cid: this.cid,
          id: `species-${oldSpeciesId}`
        })
        // set the species id
        this.$store.dispatch('cb/UPDATE_CHARACTER', {
          cid: this.cid,
          attr: 'species',
          value
        })
        // add any mandatory selections
        let currSelections = JSON.parse(JSON.stringify(this.selections))
        for (const trait of this.speciesTraits) {
          if (trait.mechanics) {
            const traitSourceId = `${this.speciesSource}-${trait.id}`
            currSelections = currSelections.concat(this.getMechanicsWithoutChoices(traitSourceId, trait.mechanics))
          }
        }
        this.$store.dispatch('cb/UPDATE_CHARACTER', {
          cid: this.cid,
          attr: 'selections',
          value: currSelections
        })
        console.log(this.speciesId)
      }
    },
    subspeciesId: {
      get () {
        return this.character.subspecies
      },
      set (value) {
        this.changeSubspecies(value)
      }
    },
    speciesData () {
      if (!this.speciesId) {
        return null
      }
      const species = this.species.find(i => i.id === this.speciesId)
      if (!species) {
        return null
      }
      if (species.type === 'variant') {
        const parentSpecies = this.species.find(i => i.id === species.species)
        return { ...parentSpecies, ...species }
      }
      return species
    },
    speciesTraits () {
      return this.traits.filter(i => i.species.includes(this.speciesId) || i.species.includes(this.subspeciesId))
    }
  }
}
