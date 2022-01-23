export const Species = {
  data () {
    return {
      customSpecies: {
        id: 'custom',
        type: 'homebrew',
        name: 'Custom Species',
        bodyImg: '/images/species/custom_species.png',
        mechanics: [
          {
            type: 'asi-choice',
            options: true,
            selections: 3,
            max: 2,
            total: 3
          }
        ],
        snippet: 'Create your own using the character sheet Settings tab',
        html: '<p>For additional traits, use the <strong>Settings</strong> tab on the character sheet.</p>'
      }
    }
  },
  computed: {
    speciesId: {
      get () {
        return this.character.species
      },
      set (value) {
        // delete any old selections
        this.deleteSelections('species')
        // set the species id
        this.updateCharacter('species', value)
      }
    },
    subspeciesId: {
      get () {
        return this.character.subspecies
      },
      set (value) {
        this.updateCharacter('subspecies', value)
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
    isVariantSpeciesId () {
      return this.speciesData?.type === 'variant'
    },
    subspeciesData () {
      if (!this.speciesId) {
        return null
      }
      return this.subspeciesOptions.find(i => i.id === this.subspeciesId)
    },
    speciesTraits () {
      return this.traits.filter(i => i.species.includes(this.speciesId) || i.species.includes(this.subspeciesId))
    },
    rootSpeciesMechanics () {
      return [...(this.speciesData?.mechanics || []), ...(this.subspeciesData?.mechanics || [])]
    },
    speciesAsis () {
      return this.rootSpeciesMechanics.filter(i => i.type === 'asi')
    },
    speciesAsiOptions () {
      return this.rootSpeciesMechanics.filter(i => i.type === 'asi-choice')
    },
    speciesSetAsiText () {
      const setAsis = this.rootSpeciesMechanics.reduce((acc, curr) => {
        acc[curr.ability] += curr.amount
        return acc
      }, { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 })
      const list = []
      for (const [key, value] of Object.entries(setAsis)) {
        if (value > 0) {
          list.push(`+${value} ${this.$t(`abilities.${key}.title`)}`)
        }
      }
      return list.join(', ')
    },
    variantTitle () {
      if (this.isVariantSpeciesId) {
        const parent = this.species.find(i => i.id === this.speciesData.species)
        return `Variant ${parent.name}`
      }
      return false
    },
    speciesSubName () {
      return this.subspeciesData?.name || this.variantTitle || false
    },
    speciesFullName () {
      return [this.speciesSubName, this.speciesData?.name].filter(i => i).join(' ')
    }
  }
}
