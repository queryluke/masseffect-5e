export const state = () => ({
  sortBy: {},
  order: 1,
  filters: {
    weapons: {
      type: [],
      rarity: [],
      property: []
    },
    spells: {
      type: [],
      availableClasses: []
    },
    weaponMods: {
      placement: [],
      weaponType: [],
      rarity: [],
      notes: []
    },
    armorMods: {
      type: [],
      rarity: [],
      notes: []
    },
    armorSets: {
      type: [],
      armorType: [],
      rarity: [],
      notes: []
    },
    monsters: {
      cr: [],
      unit: []
    },
    programs: {
      rarity: [],
      installation: false
    }
  },
  mobileFilterDialog: false,
  searchString: '',
  rarityOptions: {
    name: 'Rarity',
    key: 'rarity',
    options: ['Common', 'Uncommon', 'Rare', 'Spectre']
  },
  rarityColors: {
    Common: 'grey darken-3',
    Uncommon: 'green darken-3',
    Rare: 'blue darken-2',
    Spectre: 'purple'
  },
  rarityTextColors: {
    Common: 'grey--text text--darken-4',
    Uncommon: 'green--text text--darken-3',
    Rare: 'blue--text text--darken-2',
    Spectre: 'purple--text'
  }
})

export const getters = {
  sortBy: state => state.sortBy,
  order: state => state.order,
  type: state => state.type,
  rarity: state => state.rarity,
  searchString: state => state.searchString,
  filters: state => state.filters,
  mobileFilterDialog: state => state.mobileFilterDialog,
  rarityOptions: state => state.rarityOptions,
  rarityTextColors: state => state.rarityTextColors,
  rarityColors: state => state.rarityColors
}

export const mutations = {
  update (state, payload) {
    state[payload.key] = payload.value
  }
}

export const actions = {
  updateList ({ commit }, payload) {
    commit('update', payload)
  },
  toggleMobileFilterDialog ({ commit, getters }) {
    commit('update', { key: 'mobileFilterDialog', value: !getters.mobileFilterDialog })
  },
  updateSearchString ({ commit }, payload) {
    commit('update', { key: 'searchString', value: payload })
  },
  updateFilter ({ getters, commit }, payload) {
    const currentFilters = getters.filters
    currentFilters[payload.key][payload.filterKey] = payload.value
    commit('update', { key: 'filters', value: currentFilters })
  }
}
