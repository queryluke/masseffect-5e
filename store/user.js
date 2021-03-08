import cloneDeep from 'lodash/cloneDeep'

export const state = () => ({
  darkMode: true,
  imperial: false,
  bookmarks: {},
  search: null,
  character: {
    version: '1.0.0',
    name: 'New Character',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
    level: 1,
    species: '',
    class: '',
    subclass: '',
    background: '',
    other_info: [],
    traits: [],
    class_features: [],
    feats: [],
    backgrounds: [],
    health: 0,
    max_health: 5,
    shields: 0,
    max_shields: 5,
    barrier_ticks: 0,
    proficiencyBonus: 2,
    xp: 0,
    stats: {
      str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10
    },
    skills: [
      { label: 'Acrobatics', prof: 0, advantage: false, stat: 'dex' },
      { label: 'Athletics', prof: 0, advantage: false, stat: 'str' },
      { label: 'Deception', prof: 0, advantage: false, stat: 'cha' },
      { label: 'Electronics', prof: 0, advantage: false, stat: 'int' },
      { label: 'Engineering', prof: 0, advantage: false, stat: 'int' },
      { label: 'History', prof: 0, advantage: false, stat: 'int' },
      { label: 'Insight', prof: 0, advantage: false, stat: 'wis' },
      { label: 'Intimidation', prof: 0, advantage: false, stat: 'cha' },
      { label: 'Investigation', prof: 0, advantage: false, stat: 'int' },
      { label: 'Medicine', prof: 0, advantage: false, stat: 'wis' },
      { label: 'Perception', prof: 0, advantage: false, stat: 'wis' },
      { label: 'Performance', prof: 0, advantage: false, stat: 'cha' },
      { label: 'Persuasion', prof: 0, advantage: false, stat: 'cha' },
      { label: 'Science', prof: 0, advantage: false, stat: 'int' },
      { label: 'Slight of Hand', prof: 0, advantage: false, stat: 'dex' },
      { label: 'Stealth', prof: 0, advantage: false, stat: 'dex' },
      { label: 'Survival', prof: 0, advantage: false, stat: 'wis' },
      { label: 'Vehicle Handling', prof: 0, advantage: false, stat: 'dex' }
    ],
    proficiencies: {
      stats: {
        str: false, dex: false, con: false, int: false, wis: false, cha: false
      },
      armor: {
        light: false,
        medium: false,
        heavy: false
      },
      weapons: {
        pistol: false,
        smg: false,
        assault_rifle: false,
        shotgun: false,
        sniper_rifle: false,
        melee: false,
        heavy_weapons: false
      },
      other: []
    },
    armor: [],
    weapons: [],
    powers: [],
    tech: {
      tech_points: 1
    },
    biotics: {
      spell_slots: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      }
    }
  }
})

export const getters = {
  darkMode: state => state.darkMode,
  imperial: state => state.imperial,
  bookmarkCount: (state) => {
    let count = 0
    for (const key in state.bookmarks) {
      count += state.bookmarks[key].length
    }
    return count
  },
  bookmarkBagExists: state => type => typeof state.bookmarks[type] !== 'undefined',
  bookmarks: state => state.bookmarks,
  isBookmarked: (state, getters) => (type, item) => {
    if (!getters.bookmarkBagExists(type)) {
      return false
    }
    return typeof state.bookmarks[type].find(i => i.id === item.id) !== 'undefined'
  },
  search: state => state.search,
  character: state => state.character
}

export const mutations = {
  SET_DARK_MODE (state, value) {
    state.darkMode = value
  },
  SET_IMPERIAL (state, value) {
    state.imperial = value
  },
  CREATE_BOOKMARK_BAG (state, type) {
    state.bookmarks = { ...state.bookmarks, [type]: [] }
  },
  ADD_BOOKMARK (state, { type, item }) {
    state.bookmarks[type].push(item)
  },
  REMOVE_BOOKMARK (state, { type, item }) {
    const index = state.bookmarks[type].findIndex(i => i.id === item.id)
    if (index > -1) {
      state.bookmarks[type].splice(index)
    }
  },
  SET_SEARCH (state, value) {
    state.search = value
  },
  UPDATE_CHARACTER (state, { attr, value }) {
    const character = cloneDeep(state.character)
    character[attr] = value
    state.character = character
  },
  LOAD_CHARACTER_FROM_FILE (state, data) {
    state.character = cloneDeep(data)
  }
}

export const actions = {
  TOGGLE_BOOKMARK ({ getters, commit }, { type, item }) {
    if (getters.isBookmarked(type, item)) {
      commit('REMOVE_BOOKMARK', { type, item })
    } else {
      if (!getters.bookmarkBagExists(type)) {
        commit('CREATE_BOOKMARK_BAG', type)
      }
      commit('ADD_BOOKMARK', { type, item })
    }
  },
  TOGGLE_DARK_MODE ({ getters, commit, dispatch }) {
    const isDark = !getters.darkMode
    commit('SET_DARK_MODE', isDark)
    dispatch('tabbedPage/SET_THEME_MODE', isDark, { root: true })
  }
}
