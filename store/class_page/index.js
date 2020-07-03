export default {
  namespaced: true,
  state: {
    tabs: [
      { name: 'Progression Table', id: 'progression_table', slot: 'progression_table_tab_content' },
      { name: 'Class Features', id: 'attributes', slot: 'attributes_tab_content' },
      { name: 'Subclasses', id: 'subclasses', slot: 'subclasses_tab_content' },
      { name: 'Spell List', id: 'spell_list', slot: 'spell_list_tab_content' }
    ],
    active: null,
    colors: {
      '': { primary: 'primary', link: 'red darken-4' },
      adept: { primary: 'deep-purple darken-1', link: 'deep-purple--text' },
      engineer: { primary: 'amber darken-2', link: 'amber--text text--darken-4' },
      infiltrator: { primary: 'deep-orange darken-1', link: 'deep-orange--text text--darken-4' },
      sentinel: { primary: 'green darken-2', link: 'teal--text text--darken-4' },
      soldier: { primary: 'primary', link: '' },
      vanguard: { primary: 'indigo darken-4', link: 'indigo--text darken-4' }
    }
  },
  mutations: {
    setActiveTab (state, payload) {
      state.active = payload
    }
  },
  actions: {
    toggleSidebar ({ dispatch }) {
      dispatch('toggleSidebar', null, { root: true })
    },
    setActiveTab ({ commit }, payload) {
      commit('setActiveTab', payload)
    }
  },
  getters: {
    active: state => state.active,
    tabs: state => state.tabs,
    primaryNavigation: (state, getters, rootState) => rootState.primaryNavigation,
    colors: state => state.colors,
    classes: (state, getters, rootState) => rootState.classes,
    order: (state, getters, rootState) => rootState.itemList.order,
    sortBy: (state, getters, rootState) => rootState.itemList.sortBy
  }
}
