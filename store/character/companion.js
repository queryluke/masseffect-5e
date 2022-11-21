export const state = () => ({
  baseCompanion: {
    image: null,
    name: null,
    str: 10,
    dex: 10,
    con: 10,
    int: 10,
    wis: 10,
    cha: 10,
    profBonus: 2,
    ac: 10,
    speed: {
      walk: 30
    },
    hp: 10,
    currentHp: 10,
    shields: 0,
    regen: 0,
    senses: {},
    currentShields: 10,
    dmgVul: [],
    dmgRes: [],
    dmgImm: [],
    conImm: [],
    skills: [],
    savingThrows: [],
    expertises: [],
    features: [],
    notes: ''
  }
})

export const getters = {
  baseCompanion: state => state.baseCompanion,
  companions: (state, getters, rootState, rootGetters) => rootGetters['character/character'].companions || []
}

export const mutations = {
}

export const actions = {
  ADD_COMPANION ({ dispatch, getters }) {
    const companions = getters.companions.slice()
    const now = new Date()
    const uuid = `companion-${now.getTime()}`
    const newCompanion = Object.assign({}, getters.baseCompanion)
    newCompanion.uuid = uuid
    newCompanion.name = 'New Companion'
    companions.push(newCompanion)
    dispatch('character/UPDATE_CHARACTER', { attr: 'companions', value: companions }, { root: true })
  },
  UPDATE_COMPANION ({ dispatch, getters }, companion) {
    if (!companion) {
      return
    }
    const companions = getters.companions.slice()
    const index = companions.findIndex(i => i.uuid === companion.uuid)
    if (index > -1) {
      companions.splice(index, 1, companion)
      dispatch('character/UPDATE_CHARACTER', { attr: 'companions', value: companions }, { root: true })
    }
  },
  REMOVE_COMPANION ({ dispatch, getters }, uuid) {
    const companions = getters.companions.slice()
    const index = companions.findIndex(i => i.uuid === uuid)
    if (index > -1) {
      companions.splice(index, 1)
      dispatch('character/UPDATE_CHARACTER', { attr: 'companions', value: companions }, { root: true })
    }
  }
}
