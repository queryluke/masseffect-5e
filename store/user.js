export const state = () => ({
  darkMode: true,
  imperial: false,
  bookmarks: []
})

export const getters = {
  darkMode: state => state.darkMode,
  imperial: state => state.imperial
}

export const mutations = {
  TOGGLE_DARK_MODE (state) {
    state.darkMode = !state.darkMode
  },
  SET_IMPERIAL (state, value) {
    state.imperial = value
  }
}
