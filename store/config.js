export const state = () => ({
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
  }
})

export const getters = {
  featHeaders: state => state.featHeaders,
  powerHeaders: state => state.powerHeaders,
  primeTypeText: state => state.primeTypeText,
  weaponHeaders: state => state.weaponHeaders,
  rarityOptions: state => state.rarityOptions,
  rarityTextColors: state => state.rarityTextColors
}
