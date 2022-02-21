import { characterTemplate } from '~/mixins/character/template'

export const state = () => ({
})

export const getters = {
  character: () => {
    const character = { ...characterTemplate }
    character.id = 'kitchenSink'
    character.name = 'Kitchen Sink'
    character.species = 'custom'
    for (const abs of Object.keys(character.abilityScores)) {
      character.abilityScores[abs].value = 10
    }
    character.options.asiGenMethod = 'manual'
    character.classes = [
      {
        asi: {},
        id: 'custom-c4ks',
        hitPoints: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        hpOverride: false,
        levels: 20,
        subclass: null,
        data: {
          name: 'C4Ks',
          profs: {},
          hitDie: 4
        }
      }
    ]
    return character
  },
  mechanics: (state, getters, rootState, rootGetters) => {
    const species = rootGetters.getData('species')
    const traits = rootGetters.getData('traits')
    const feats = rootGetters.getData('feats')
    const edges = rootGetters.getData('edges')
    const classFeatures = rootGetters.getData('class-features')
    const allMechanics = []
    const allTheThings = [...species, ...traits, ...feats, ...edges, ...classFeatures]
    for (const thing of allTheThings) {
      if (thing.mechanics?.length) {
        allMechanics.push(...thing.mechanics.filter(i => !i.options))
      }
    }
    return allMechanics
  }
}

export const mutations = {
}

export const actions = {
  LOAD_KITCHEN_SINK ({ dispatch, getters }) {
    dispatch('characters/UPSERT_LOCAL_CHARACTER', getters.character, { root: true })
    dispatch('character/local/LOAD_CHARACTER', 'kitchenSink', { root: true })
  }
}
