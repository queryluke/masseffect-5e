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
      },
      {
        type: 'speed',
        speed: 'walk',
        distance: 30
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
      const subspecies = species.type === 'subspecies'
      const variant = species.type === 'variant'
      if (subspecies || variant) {
        const parentSpecies = getters.speciesList.find(i => i.id === species.species)
        if (variant) {
          species = { ...parentSpecies, ...species, parentName: parentSpecies.name }
        } else {
          species = { ...parentSpecies, ...species, mechanics: [...parentSpecies.mechanics, ...species.mechanics], parentName: parentSpecies.name, parentId: parentSpecies.id }
        }
      }
      return species
    }
    return null
  },
  tashas: (state, getters, rootState, rootGetters) => rootGetters['character/character'].options.tashas,
  traits: (state, getters) => {
    return getters.traitList.filter(i => i.species.includes(getters.species?.id) || i.species.includes(getters.species?.parentId))
  },
  variant: (state, getters) => {
    return getters.species.type === 'variant'
  },
  variantTitle: (state, getters) => {
    if (getters.variant) {
      return `Variant ${getters.species.parentName}`
    }
    return false
  },
  subName: (state, getters) => {
    return getters.species.subspecies?.name || getters.variantTitle
  },
  fullName: (state, getters) => {
    return [getters.subName, getters.species.name].filter(i => i).join(' ')
  },
  speciesMechanics: (state, getters) => {
    // if tashas is on, ignore the ASIs
    return (getters.species?.mechanics || []).filter(i => getters.tashas ? !i.type.startsWith('asi') : true)
  },
  asiAsOptions: (state, getters) => {
    return getters.tashas ? [] : getters.speciesMechanics.filter(i => i.type === 'asi-choice')
  },
  mechanics: (state, getters) => {
    if (!getters.species) {
      return []
    }
    const allSpeciesMechanics = []
    const path = `species/${getters.species.id}`
    // base
    allSpeciesMechanics.push({
      path,
      // have to ignore asi-choices cause of the weird selection path
      mechanics: getters.speciesMechanics.filter(i => i.type !== 'asi-choice')
    })
    // tashas
    if (getters.tashas) {
      allSpeciesMechanics.push({
        path: `${path}/traits/asi`,
        mechanics: [
          {
            type: 'asi-choice',
            options: true
          }
        ]
      })
    }
    if (getters.asiAsOptions.length) {
      allSpeciesMechanics.push({
        path: `${path}/traits/asi`,
        mechanics: getters.asiAsOptions
      })
    }
    const traitsM = getters.traits.map((i) => {
      return {
        path: `${path}/traits/${i.id}`,
        mechanics: i.mechanics
      }
    })
    return [
      ...allSpeciesMechanics,
      ...traitsM
    ]
  },
  speciesList: (state, getters, rootState, rootGetters) => rootGetters.getData('species'),
  traitList: (state, getters, rootState, rootGetters) => rootGetters.getData('traits')
}

export const mutations = {
}

export const actions = {
}
