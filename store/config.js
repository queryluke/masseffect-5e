export const state = () => ({
  damageTypeAttributes: {
    acid: { icon: 'liquid-spot', color: 'light-green darken-1' },
    bludgeoning: { icon: 'hammer', color: 'blue-grey lighten-3' },
    cold: { icon: 'snowflake', color: 'cyan lighten-3' },
    fire: { icon: 'fire', color: 'orange darken-1' },
    force: { icon: 'laser-pointer', color: 'purple lighten-1' },
    lightning: { icon: 'flash', color: 'blue darken-2' },
    necrotic: { icon: 'chemical-weapon', color: 'deep-purple darken-3' },
    piercing: { icon: 'bullseye-arrow', color: 'red darken-4' },
    poison: { icon: 'skull', color: 'lime lighten-1' },
    psychic: { icon: 'head-snowflake', color: 'pink lighten-1' },
    radiant: { icon: 'radioactive-circle', color: 'brown lighten-1' },
    slashing: { icon: 'sword', color: 'grey darken-1' },
    thunder: { icon: 'nuke', color: 'indigo darken-3' },
    bleeding: { icon: 'water', color: 'red darken-4' },
    hp: { icon: 'heart-plus', color: 'green' },
    shields: { icon: 'shield-plus', color: 'blue' },
    temp: { icon: 'heart-flash', color: 'blue-grey lighten-1' }
  },
  rarityColors: {
    varies: 'grey darken-3',
    common: 'grey darken-3',
    uncommon: 'green darken-3',
    rare: 'blue darken-2',
    very_rare: 'purple',
    spectre: 'red'
  },
  rarityTextColors: {
    light: {
      varies: 'grey--text text--darken-4',
      common: 'grey--text text--darken-4',
      uncommon: 'green--text text--darken-3',
      rare: 'blue--text text--darken-2',
      very_rare: 'purple--text',
      spectre: 'red--text text--darken-4'
    },
    dark: {
      varies: 'grey--text',
      common: 'grey--text',
      uncommon: 'green--text text--accent-4',
      rare: 'blue--text',
      very_rare: 'purple--text text--accent-2',
      spectre: 'red--text'
    }
  },
  primeTypeText: {
    light: {
      force: 'purple--text text--darken-1',
      necrotic: 'blue-grey--text text--darken-2',
      fire: 'deep-orange--text text--accent-4',
      cold: 'cyan--text text--darken-3',
      lightning: 'blue--text text--darken-3',
      detonates: 'secondary--text'
    },
    dark: {
      force: 'purple--text text--lighten-2',
      necrotic: 'blue-grey--text text--lighten-2',
      fire: 'deep-orange--text',
      cold: 'cyan--text text--darken-1',
      lightning: 'blue--text text--lighten-1',
      detonates: 'red--text text--lighten-1'
    }
  },
  searchFilters: [
    {
      id: 'character',
      color: {
        base: 'light-green',
        dark: 'darken-1',
        light: 'darken-4'
      },
      icon: 'mdi-face-agent'
    },
    {
      id: 'equipment',
      color: {
        base: 'deep-orange',
        dark: 'lighten-1',
        light: 'darken-4'
      },
      icon: 'mdi-hammer-wrench'
    },
    {
      id: 'manual',
      color: {
        base: 'indigo',
        dark: 'accent-1',
        light: 'darken-4'
      },
      icon: 'mdi-gavel'
    },
    {
      id: 'power',
      color: {
        base: 'purple',
        dark: 'lighten-1',
        light: 'darken-4'
      },
      icon: 'mdi-fire'
    },
    {
      id: 'bestiary',
      color: {
        base: 'red',
        dark: 'lighten-1',
        light: 'darken-4'
      },
      icon: 'mdi-paw'
    }
  ],
  classThemes: {
    adept: {
      dark: 'deep-purple darken-1',
      light: 'deep-purple lighten-2'
    },
    engineer: {
      dark: 'amber darken-1'
    },
    infiltrator: {
      dark: 'deep-orange darken-4',
      light: 'deep-orange'
    },
    sentinel: {
      dark: 'brown',
      light: 'brown lighten-2'
    },
    soldier: {
      dark: 'red darken-4',
      light: 'red accent-2'
    },
    vanguard: {
      dark: 'pink darken-4',
      light: 'pink lighten-2'
    }
  },
  sklTypes: {
    item: { type: 'paragraph', types: { paragraph: 'text@6' } },
    expansionList: { type: 'table-tbody', types: { 'table-row': 'table-cell' } },
    articleList: { type: 'article-list', types: { 'article-list': 'article-divider@12', 'article-divider': 'article, divider' } },
    listPage: { type: 'list-page', types: { 'list-page': 'table-row-divider@10', 'table-row': 'table-cell@5' } },
    classPage: { type: 'class-page', types: { 'class-page': 'avatar, article' } }
  }
})

export const getters = {
  primeTypeText: state => state.primeTypeText,
  rarityTextColors: state => state.rarityTextColors,
  rarityTextColor: (state, getters) => rarity => state.rarityTextColors[getters.darkMode ? 'dark' : 'light'][rarity],
  classThemes: state => state.classThemes,
  darkMode: (state, getters, rootState, rootGetters) => rootGetters['user/darkMode'],
  isDarkOnlyClassTheme: state => klass => typeof state.classThemes[klass].light === 'undefined',
  classThemeHrColor: (state, getters) => (klass) => {
    if (getters.isDarkOnlyClassTheme(klass)) {
      return state.classThemes[klass].dark
    }
    return state.classThemes[klass][getters.darkMode ? 'light' : 'dark']
  },
  classThemeTabColor: (state, getters) => (klass) => {
    if (getters.isDarkOnlyClassTheme(klass)) {
      return 'grey darken-3'
    }
    return state.classThemes[klass][getters.darkMode ? 'light' : 'dark']
  },
  classThemeTabsColor: (state, getters) => (klass) => {
    if (getters.isDarkOnlyClassTheme(klass)) {
      return state.classThemes[klass].dark
    }
    return undefined
  },
  classThemeDark: state => (klass) => {
    return state.classThemes[klass].dark
  },
  classThemeLight: (state, getters) => (klass) => {
    if (getters.isDarkOnlyClassTheme(klass)) {
      return state.classThemes[klass].dark
    }
    return state.classThemes[klass].light
  },
  classThemeTextOnDark: (state, getters) => klass => getters.isDarkOnlyClassTheme(klass) ? 'light' : 'dark',
  classThemeTabsMode: (state, getters) => (klass) => {
    return getters.isDarkOnlyClassTheme(klass)
      ? 'light'
      : getters.darkMode
        ? 'dark'
        : 'light'
  },
  sklTypes: state => state.sklTypes,
  searchFilters: state => state.searchFilters,
  searchFilterColor: (state, getters) => (sf) => {
    const filter = state.searchFilters.find(i => i.id === sf)
    return `${filter.color.base} ${getters.darkMode ? filter.color.dark : filter.color.light}`
  },
  searchFilterTextColor: (state, getters) => (sf) => {
    const filter = state.searchFilters.find(i => i.id === sf)
    return `${filter.color.base}--text text--${getters.darkMode ? filter.color.dark : filter.color.light}`
  }
}
