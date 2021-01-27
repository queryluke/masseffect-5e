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
    options: ['Common', 'Uncommon', 'Rare', 'Spectre']
  },
  rarityColors: {
    Common: 'grey darken-3',
    Uncommon: 'green darken-3',
    Rare: 'blue darken-2',
    Spectre: 'purple'
  },
  rarityTextColors: {
    light: {
      Common: 'grey--text text--darken-4',
      Uncommon: 'green--text text--darken-3',
      Rare: 'blue--text text--darken-2',
      Spectre: 'purple--text'
    },
    dark: {
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
      light: { tabColor: 'deep-purple darken-1', link: 'deep-purple--text' },
      dark: { tabColor: 'deep-purple lighten-2', link: 'deep-purple--text text--lighten-2' }
    },
    engineer: {
      light: { tabColor: 'amber darken-2', link: 'amber--text text--darken-4' },
      dark: { tabColor: 'amber darken-2', link: 'amber--text text--darken-4' }
    },
    infiltrator: {
      light: { tabColor: 'deep-orange darken-1', link: 'deep-orange--text text--darken-4' },
      dark: { tabColor: 'deep-orange darken-1', link: 'deep-orange--text text--darken-4' }
    },
    sentinel: {
      light: { tabColor: 'green darken-2', link: 'teal--text text--darken-4' },
      dark: { tabColor: 'green darken-2', link: 'teal--text text--darken-4' }
    },
    soldier: {
      light: { tabColor: 'primary', link: '' },
      dark: { tabColor: 'primary', link: '' }
    },
    vanguard: {
      light: { tabColor: 'indigo darken-4', link: 'indigo--text darken-4' },
      dark: { tabColor: 'indigo darken-4', link: 'indigo--text darken-4' }
    }
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
  classThemes: state => state.classThemes
}
