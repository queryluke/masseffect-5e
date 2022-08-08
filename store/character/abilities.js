import cloneDeep from 'lodash/cloneDeep'

export const state = () => ({
  standard: {
    str: null,
    con: null,
    dex: null,
    wis: null,
    int: null,
    cha: null
  },
  buy: {
    str: null,
    con: null,
    dex: null,
    wis: null,
    int: null,
    cha: null
  },
  manual: {
    str: null,
    con: null,
    dex: null,
    wis: null,
    int: null,
    cha: null
  }
})

export const getters = {
  selectedMethod: (state, getters, rootState, rootGetters) => rootGetters['character/character'].options.asiGenMethod,
  selectedScores: (state, getters) => state[getters.selectedMethod],
  characterAbilityScores: (state, getters, rootState, rootGetters) => rootGetters['character/character'].abilityScores,
  abilityBreakdown: (state, getters, rootState, rootGetters) => {
    const breakdown = {}
    const speciesAsiScores = {}
    const tashas = rootGetters['character/character'].options.tashas
    const baseSpeciesAsiScores = rootGetters['character/mechanics/mechanics'].filter((i) => {
      return i.type === 'asi' &&
      i.source.startsWith('species') &&
      !(tashas && i.source.includes('exalted-lineages'))
    })
    for (const value of baseSpeciesAsiScores) {
      speciesAsiScores[value.ability] = (speciesAsiScores[value.ability] || 0) + value.amount
    }
    const selectedKlassAsis = rootGetters['character/selections/selected'].filter(i => /klass\/\w+?\/\d\d?\/asi/.test(i.path))
    const klassAsiScores = {}
    for (const selected of selectedKlassAsis) {
      for (const value of selected.value) {
        klassAsiScores[value.ability] = (klassAsiScores[value.ability] || 0) + value.amount
      }
    }
    const allAsiScores = {}
    const allMechanicsScores = rootGetters['character/mechanics/mechanics'].filter(i => i.type === 'asi' && !(tashas && i.source.includes('exalted-lineages')))
    for (const value of allMechanicsScores) {
      allAsiScores[value.ability] = (allAsiScores[value.ability] || 0) + value.amount
    }
    const allMinimumMechanics = rootGetters['character/mechanics/mechanics'].filter(i => i.type === 'asi-minimum')
    const minimums = {}
    for (const minimum of allMinimumMechanics) {
      minimums[minimum.ability] = Math.max((minimums[minimum.ability] || 0), minimum.minimum)
    }
    for (const key of ['str', 'dex', 'con', 'int', 'wis', 'cha']) {
      const base = getters.characterAbilityScores[key].value
      const other = getters.characterAbilityScores[key].other
      const override = getters.characterAbilityScores[key].override
      const species = speciesAsiScores[key] || 0
      const klass = klassAsiScores[key] || 0
      const all = allAsiScores[key] || 0
      const minimum = minimums[key] || 0
      const total = override || minimum || (base ? base + all + (other || 0) : base)
      breakdown[key] = {
        total,
        mod: total ? Math.floor((total - 10) / 2) : null,
        base,
        species,
        klass,
        misc: all - (klass + species),
        other,
        override
      }
    }
    return breakdown
  },
  dexMod: (state, getters) => {
    return getters.abilityBreakdown.dex.mod
  },
  strMod: (state, getters) => {
    return getters.abilityBreakdown.str.mod
  },
  conMod: (state, getters) => {
    return getters.abilityBreakdown.con.mod
  },
  intMod: (state, getters) => {
    return getters.abilityBreakdown.int.mod
  },
  wisMod: (state, getters) => {
    return getters.abilityBreakdown.wis.mod
  },
  chaMod: (state, getters) => {
    return getters.abilityBreakdown.cha.mod
  }
}

export const mutations = {
  SET_SCORES (state, { method, scores }) {
    state[method] = scores
  },
  SET_SCORE (state, { ability, value, method }) {
    state[method] = { ...state[method], [ability]: value }
  }
}

export const actions = {
  SET_SCORE ({ commit, dispatch, getters }, { ability, value }) {
    const val = value ? parseInt(value) : null
    commit('SET_SCORE', { ability, value, method: getters.selectedMethod })
    dispatch('character/UPDATE_CHARACTER', { attr: `abilityScores.${ability}.value`, value: val }, { root: true })
  },
  SET_METHOD ({ commit, dispatch, getters }, method) {
    dispatch('character/UPDATE_CHARACTER', { attr: 'options.asiGenMethod', value: method }, { root: true })
    const currentScores = cloneDeep(getters.characterAbilityScores)
    const selectedScores = getters.selectedScores
    for (const key of ['str', 'dex', 'con', 'int', 'wis', 'cha']) {
      currentScores[key].value = selectedScores[key]
    }
    dispatch('character/UPDATE_CHARACTER', { attr: 'abilityScores', value: currentScores }, { root: true })
  }
}
