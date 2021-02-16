export const state = () => ({
  abilities: {
    str: 'Strength',
    dex: 'Dexterity',
    con: 'Constitution',
    int: 'Intelligence',
    wis: 'Wisdom',
    cha: 'Charisma'
  },
  featHeaders: [
    { label: 'Indicator', key: 'indicator', cols: 2, sm: 1, sortable: false },
    { label: 'Name', key: 'name', cols: 10, sm: 5, lg: 2 },
    { label: 'Prereq', key: 'prerequisite', cols: 3, classes: 'd-none d-lg-flex', sortable: false },
    { label: 'Note', key: 'note', cols: 6, classes: 'd-none d-sm-flex', sortable: false }
  ],
  powerHeaders: [
    { label: 'Type/Level', key: 'level', cols: 4, sm: 3, md: 2 },
    { label: 'Name', key: 'name', cols: 8, sm: 9, md: 4, lg: 2 },
    { label: 'Duration', key: 'duration', cols: 3, lg: 2, classes: 'd-none d-md-flex', sortable: false },
    { label: 'Range (Area)', key: 'range', cols: 3, lg: 2, classes: 'd-none d-md-flex', sortable: false },
    { label: 'Attack', key: 'attack', cols: 2, classes: 'd-none d-lg-flex', sortable: false },
    { label: 'Damage/Effect', key: 'effect', cols: 2, classes: 'd-none d-lg-flex', sortable: false }
  ],
  weaponHeaders: [
    { key: 'name', label: 'Name', cols: 8, sm: 9, lg: 3 },
    { key: 'damage', label: 'Damage', cols: 4, sm: 3, lg: 2 },
    { key: 'heat', label: 'Heat', cols: 1, classes: 'd-none d-lg-flex' },
    { key: 'range', label: 'Range', cols: 2, classes: 'd-none d-lg-flex' },
    { key: 'weight', label: 'Weight', cols: 2, classes: 'd-none d-lg-flex' },
    { key: 'cost', label: 'Cost', cols: 2, classes: 'd-none d-lg-flex' }
  ],
  armorHeaders: [
    { key: 'name', label: 'Name', cols: 6, sm: 5, md: 4, lg: 3 },
    { key: 'cost', label: 'Cost', cols: 2, sm: 2, md: 1, classes: 'd-none d-sm-flex' },
    { key: 'armorType', label: 'Armor Type', cols: 3, sm: 2 },
    { key: 'type', label: 'Type', cols: 3, md: 2 },
    { key: 'notes', label: 'Notes', cols: 3, lg: 4, classes: 'd-none d-md-flex', sortable: false }
  ],
  modHeaders: [
    { key: 'name', label: 'Name', cols: 6, sm: 5, md: 4, lg: 3 },
    { key: 'cost', label: 'Cost', cols: 3, sm: 2, md: 1, classes: 'd-none d-sm-flex' },
    { key: 'placement', label: 'Placement', cols: 3, sm: 2 },
    { key: 'availability', label: 'For', cols: 3, sortable: false },
    { key: 'notes', label: 'Notes', cols: 3, classes: 'd-none d-md-flex', sortable: false }
  ],
  gearHeaders: [
    { key: 'name', label: 'Name', cols: 6 },
    { key: 'cost', label: 'Cost', cols: 3 },
    { key: 'weight', label: 'Weight', cols: 3 }
  ],
  npcHeaders: [
    { key: 'name', label: 'Name', cols: 6 },
    { key: 'unit', label: 'Faction', cols: 3 },
    { key: 'cr', label: 'CR', cols: 3 }
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
    { id: 'character', textColor: 'light-green--text text--darken-4', color: 'light-green darken-4', icon: 'face' },
    { id: 'equipment', textColor: 'deep-orange--text text--darken-4', color: 'deep-orange darken-4', icon: 'build' },
    { id: 'rule', textColor: 'secondary--text', color: 'secondary', icon: 'gavel' },
    { id: 'spell', textColor: 'purple--text', color: 'purple', icon: 'whatshot' },
    { id: 'bestiary', textColor: 'primary--text', color: 'primary', icon: 'pets' }
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
  abilities: state => state.abilities,
  abilityName: state => abbr => state.abilities[abbr],
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
        ? 'dark' : 'light'
  },
  sklTypes: state => state.sklTypes
}
