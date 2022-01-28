export const state = () => ({
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
})

export const getters = {
  species: (state, getters, rootState, rootGetters) => {
    const character = rootGetters['character/character']
    if (character.species) {
      if (character.species === 'custom') {
        return state.customSpecies
      }
      let species = getters.speciesList.find(i => i.id === character.species)
      const variant = species.type === 'variant'
      if (variant) {
        const parentSpecies = getters.speciesList.find(i => i.id === species.species)
        species = { ...parentSpecies, ...species, parentName: parentSpecies.name }
      }
      return species
    }
    return null
  },
  subspecies: (state, getters, rootState, rootGetters) => {
    const character = rootGetters['character/character']
    return getters.subspeciesList.find(i => i.id === character.subspecies) || null
  },
  traits: (state, getters) => {
    return getters.traitList.filter(i => i.species.includes(getters.species.id) || i.species.includes(getters.species.id))
  },
  variant: (state, getters) => {
    return getters.species.type === 'variant'
  },
  variantTitle: (state, getters) => {
    if (getters.variant) {
      return `Variant ${getters.species.ParentName}`
    }
    return false
  },
  subName: (state, getters) => {
    return getters.subspecies?.name || getters.variantTitle
  },
  fullName: (state, getters) => {
    return [getters.speciesSubName, getters.species.name].filter(i => i).join(' ')
  },
  speciesMechanics: (state, getters) => {
    const speciesM = getters.species?.mechanics || []
    const subspeciesM = getters.subspecies?.mechanics || []
    return [...speciesM, ...subspeciesM]
  },
  asiAsOptions: (state, getters) => {
    return getters.speciesMechanics.filter(i => i.type === 'asi-choice')
  },
  mechanics: (state, getters) => {
    const speciesM = getters.speciesMechanics
    const traitsM = getters.traits.map((i) => {
      return {
        model: 'trait',
        modelId: i.id,
        mechanics: [i]
      }
    })
    return [
      {
        model: 'species',
        modelId: getters.species.id,
        mechanics: speciesM
      },
      ...traitsM
    ]
  },
  speciesList: (state, getters, rootState, rootGetters) => rootGetters.getData('species'),
  traitList: (state, getters, rootState, rootGetters) => rootGetters.getData('traits'),
  subspeciesList: (state, getters, rootState, rootGetters) => rootGetters.getData('subspecies'),
  subspeciesOptionList: (state, getters, rootState, rootGetters) => rootGetters.getData('subspeciesOptions')
}

export const mutations = {
}

export const actions = {
}
