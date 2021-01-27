
export const state = () => ({
  colors: {
    '': { primary: 'primary', link: 'red darken-4' },
    adept: { primary: 'deep-purple darken-1', link: 'deep-purple--text' },
    engineer: { primary: 'amber darken-2', link: 'amber--text text--darken-4' },
    infiltrator: { primary: 'deep-orange darken-1', link: 'deep-orange--text text--darken-4' },
    sentinel: { primary: 'green darken-2', link: 'teal--text text--darken-4' },
    soldier: { primary: 'primary', link: '' },
    vanguard: { primary: 'indigo darken-4', link: 'indigo--text darken-4' }
  }
})

export const getters = {
  active: state => state.active,
  tabs: state => state.tabs,
  primaryNavigation: (state, getters, rootState) => rootState.primaryNavigation,
  colors: state => state.colors,
  classes: (state, getters, rootState) => rootState.classes,
  order: (state, getters, rootState) => rootState.itemList.order,
  sortBy: (state, getters, rootState) => rootState.itemList.sortBy
}

export const mutations = {
  setActiveTab (state, payload) {
    state.active = payload
  }
}

export const actions = {
  toggleSidebar ({ dispatch }) {
    dispatch('toggleSidebar', null, { root: true })
  },
  setActiveTab ({ commit }, payload) {
    commit('setActiveTab', payload)
  }
}
