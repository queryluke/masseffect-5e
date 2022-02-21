export const ProfLabels = {
  methods: {
    profLabel (type) {
      switch (type) {
        case 'weapon':
          return this.$tc('weapon_title', 2)
        case 'armor':
          return this.$tc('armor_title', 2)
        case 'tool':
          return this.$t('gear_types.tool')
        case 'skill':
          return this.$t('skills_title')
        case 'saving-throw':
          return this.$t('saving_throws_title')
      }
      return ''
    },
    profString (type, idArray = []) {
      return idArray.length ? idArray.map(i => this.profText(type, i)).join(', ') : 'None'
    },
    profText (type, id) {
      let item, lookupId
      switch (type) {
        case 'weapon':
          return this.$tc(`weapon_types.${id}`, 2)
        case 'armor':
          return this.$t(`armor_types.${id}`)
        case 'tool':
          lookupId = id.startsWith('vehicle') ? 'vehicles' : id
          item = this.$store.getters.getItem('tool-profs', lookupId)
          return item
            ? id.startsWith('vehicle')
              ? `${item.name} (${id.split('-')[1]})`
              : item.name
            : lookupId
        case 'skill':
          item = this.$store.getters.getItem('skills', id)
          return item ? item.name : id
        case 'saving-throw':
          return this.$t(`abilities.${id}.title`)
      }
      return ''
    }
  }
}
