import cloneDeep from 'lodash/cloneDeep'

export const state = () => ({
  darkMode: true,
  imperial: false,
  bookmarks: {},
  search: null,
  character: {
    name: '',
    id: '',
    userId: '',
    builderVersion: '0.5.12',
    image: '',
    user: '',
    experiencePoints: 0,
    species: {
      name: '',
      abilityScoreImprovementSelectedOption: 0,
      abilityScoreImprovement: {}
    },
    classes: [],
    baseAbilityScores: {
      Strength: 0,
      Dexterity: 0,
      Constitution: 0,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 0
    },
    background: {
      name: '',
      feat: {
        name: '',
        type: 'Feat'
      }
    },
    characteristics: {
      alignment: '',
      'Personality Traits': '',
      Ideal: '',
      Bond: '',
      Flaw: '',
      Gender: '',
      'Place of Birth': '',
      Age: '',
      Height: '',
      Weight: '',
      Hair: '',
      Eyes: '',
      Skin: '',
      Appearance: '',
      Backstory: ''
    },
    credits: 0,
    equipment: [],
    currentStats: {
      hitPointsLost: 0,
      temporaryHitPoints: 0,
      techPointsUsed: 0,
      forcePointsUsed: 0,
      superiorityDiceUsed: 0,
      hitDiceUsed: {},
      deathSaves: {
        successes: 0,
        failures: 0
      },
      hasInspiration: false,
      featuresTimesUsed: {},
      conditions: [],
      exhaustion: 0,
      highLevelCasting: {
        level6: false,
        level7: false,
        level8: false,
        level9: false
      }
    },
    tweaks: {},
    customProficiencies: [],
    customLanguages: [],
    customFeatures: [],
    customFeats: [],
    customTechPowers: [],
    customForcePowers: [],
    customEquipment: [],
    settings: {
      isEnforcingForcePrerequisites: true,
      isFixedHitPoints: false,
      abilityScoreMethod: 'Standard Array'
    },
    notes: '',
    createdAt: 1615572574654,
    changedAt: 1615572574654,
    localId: 'temp-x7vniqzfa'
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
