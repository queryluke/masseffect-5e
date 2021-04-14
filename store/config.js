export const state = () => ({
  featHeaders: [
    { label: 'indicator', key: 'indicator', cols: 2, sm: 1, sortable: false },
    { label: 'name', key: 'name', cols: 10, sm: 5, lg: 2 },
    { label: 'prereq', key: 'prerequisite', cols: 3, classes: 'd-none d-lg-flex', sortable: false },
    { label: 'notes', key: 'note', cols: 6, classes: 'd-none d-sm-flex', sortable: false }
  ],
  powerHeaders: [
    { label: 'type_level', key: 'level', cols: 4, sm: 3, md: 2 },
    { label: 'name', key: 'name', cols: 8, sm: 9, md: 4, lg: 2 },
    { label: 'duration', key: 'duration', cols: 3, lg: 2, classes: 'd-none d-md-flex', sortable: false },
    { label: 'range_area', key: 'range', cols: 3, lg: 2, classes: 'd-none d-md-flex', sortable: false },
    { label: 'attack', key: 'attack', cols: 2, classes: 'd-none d-lg-flex', sortable: false },
    { label: 'damage_effect', key: 'effect', cols: 2, classes: 'd-none d-lg-flex', sortable: false }
  ],
  weaponHeaders: [
    { key: 'name', label: 'name', cols: 8, sm: 9, lg: 3 },
    { key: 'damage', label: 'damage', cols: 4, sm: 3, lg: 2 },
    { key: 'heat', label: 'heat', cols: 1, classes: 'd-none d-lg-flex' },
    { key: 'range', label: 'range', cols: 2, classes: 'd-none d-lg-flex' },
    { key: 'weight', label: 'weight', cols: 2, classes: 'd-none d-lg-flex' },
    { key: 'cost', label: 'cost', cols: 2, classes: 'd-none d-lg-flex' }
  ],
  armorHeaders: [
    { key: 'name', label: 'name', cols: 6, sm: 5, md: 4, lg: 3 },
    { key: 'cost', label: 'cost', cols: 2, sm: 2, md: 1, classes: 'd-none d-sm-flex' },
    { key: 'armorType', label: 'armor_type', cols: 3, sm: 2 },
    { key: 'type', label: 'type', cols: 3, md: 2 },
    { key: 'notes', label: 'notes', cols: 3, lg: 4, classes: 'd-none d-md-flex', sortable: false }
  ],
  modHeaders: [
    { key: 'name', label: 'name', cols: 6, sm: 5, md: 4, lg: 3 },
    { key: 'cost', label: 'cost', cols: 3, sm: 2, md: 1, classes: 'd-none d-sm-flex' },
    { key: 'placement', label: 'placement', cols: 3, sm: 2 },
    { key: 'availability', label: 'for', cols: 3, sortable: false },
    { key: 'notes', label: 'notes', cols: 3, classes: 'd-none d-md-flex', sortable: false }
  ],
  gearHeaders: [
    { key: 'name', label: 'name', cols: 6 },
    { key: 'cost', label: 'cost', cols: 3 },
    { key: 'weight', label: 'weight', cols: 3 }
  ],
  npcHeaders: [
    { key: 'name', label: 'name', cols: 6 },
    { key: 'unit', label: 'faction', cols: 3 },
    { key: 'cr', label: 'cr', cols: 3 }
  ],
  rarityOptions: {
    name: 'Rarity',
    key: 'rarity',
    options: ['Varies', 'Common', 'Uncommon', 'Rare', 'Spectre']
  },
  rarityColors: {
    Varies: 'grey darken-3',
    Common: 'grey darken-3',
    Uncommon: 'green darken-3',
    Rare: 'blue darken-2',
    Spectre: 'purple'
  },
  rarityTextColors: {
    light: {
      Varies: 'grey--text text--darken-4',
      Common: 'grey--text text--darken-4',
      Uncommon: 'green--text text--darken-3',
      Rare: 'blue--text text--darken-2',
      Spectre: 'purple--text'
    },
    dark: {
      Varies: 'grey--text',
      Common: 'grey--text',
      Uncommon: 'green--text text--accent-4',
      Rare: 'blue--text',
      Spectre: 'purple--text text--accent-2'
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
      id: 'rule',
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
  armorHeaders: state => state.armorHeaders,
  featHeaders: state => state.featHeaders,
  gearHeaders: state => state.gearHeaders,
  modHeaders: state => state.modHeaders,
  npcHeaders: state => state.npcHeaders,
  powerHeaders: state => state.powerHeaders,
  primeTypeText: state => state.primeTypeText,
  weaponHeaders: state => state.weaponHeaders,
  rarityOptions: state => state.rarityOptions,
  rarityTextColors: state => state.rarityTextColors,
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
