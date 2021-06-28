export const ListPageFilters = {
  data () {
    return {
      listPageFilters: {
        armor: [
          { key: 'rarity' },
          { key: 'type', textPath: 'armor_types.{i}' },
          { key: 'placement', label: 'armor_placement_title', textPath: 'armor_placements.{i}_title' },
          { key: 'tags' }
        ],
        weapons: [
          { key: 'rarity' },
          { key: 'type', textPath: 'weapon_types.{i}' },
          { key: 'properties' }
        ],
        mods: [
          { key: 'type', textPath: 'mod_types.{i}' },
          { key: 'rarity' },
          { key: 'placement', label: 'mod_placement_title', textPath: 'mod_placements.{i}' },
          { key: 'availability' },
          { key: 'tags' }
        ],
        gear: [
          { key: 'rarity' },
          { key: 'type', textPath: 'gear_types.{i}' }
        ],
        powers: [
          { key: 'type', textPath: 'power_types.{i}' },
          { key: 'classes' }
        ],
        bestiary: [
          { key: 'unit', label: 'npc.faction_title', textPath: 'npc.unit_types.{i}' },
          { key: 'cr' }
        ]
      }
    }
  },
  computed: {
    filters () {
      if (!this.model) {
        return []
      }
      return this.listPageFilters[this.model].map(i => this.createFilter(this.model, i))
    }
  },
  methods: {
    createFilter (model, filterOptions) {
      if (filterOptions.key === 'rarity') {
        return this.createRarityFilter()
      }
      if (filterOptions.key === 'properties' && model === 'weapons') {
        return this.createWeaponPropsFilter()
      }
      if (filterOptions.key === 'availability' && model === 'mods') {
        return this.createModAvailabilityFilter()
      }
      if (filterOptions.key === 'classes' && model === 'powers') {
        return this.createClassFilter()
      }
      if (filterOptions.key === 'cr' && model === 'bestiary') {
        return this.createCrFilter()
      }
      const label = this.$t(filterOptions.label) || this.$t(`${filterOptions.key}_title`)
      const key = filterOptions.key
      const textPath = filterOptions.textPath || `${filterOptions.key}.{i}`
      const options = [...new Set(this.items.map(i => i[filterOptions.key]).flat())]
        .map((i) => {
          const path = textPath.replace('{i}', i)
          return {
            value: i,
            text: this.$tc(path, 1)
          }
        })
        .sort((a, b) => {
          const sortBy = filterOptions.sortBy || 'text'
          const aVal = a[sortBy]
          const bVal = b[sortBy]
          return aVal > bVal ? 1 : -1
        })
      return {
        label,
        key,
        options
      }
    },
    createRarityFilter () {
      const raritySortOrder = ['varies', 'common', 'uncommon', 'rare', 'very_rare', 'spectre']
      const rarityList = [...new Set(this.items.map(i => i.rarity))]
      return {
        label: this.$t('rarity_title'),
        key: 'rarity',
        options: rarityList.sort((a, b) => {
          const aVal = raritySortOrder.indexOf(a)
          const bVal = raritySortOrder.indexOf(b)
          return aVal > bVal ? 1 : -1
        }).map((i) => {
          return {
            text: this.$t(`rarities.${i}`),
            value: i
          }
        })
      }
    },
    createModAvailabilityFilter () {
      const armorAvails = [...new Set(this.items.filter(i => i.type === 'armor').map(i => i.availability).flat())]
        .map((i) => {
          return {
            value: i,
            text: this.$t(`armor_types.${i}_armor_title`)
          }
        })
      const weaponAvails = [...new Set(this.items.filter(i => i.type === 'weapon').map(i => i.availability).flat())]
        .map((i) => {
          return {
            value: i,
            text: this.$tc(`weapon_types.${i}`, 1)
          }
        })
      const options = armorAvails.concat(weaponAvails)
      return {
        label: this.$t('mod_availability_title'),
        key: 'availability',
        options: options.sort((a, b) => a.text > b.text ? 1 : -1)
      }
    },
    createWeaponPropsFilter () {
      const props = this.$store.getters.getData('weapon-properties')
      return {
        label: this.$t('weapon_props_title'),
        key: 'properties',
        options: [...new Set(this.items.map(i => i.properties).flat())]
          .map((i) => {
            const prop = props.find(p => p.id === i)
            return {
              text: prop ? prop.name : '',
              value: i
            }
          })
          .sort((a, b) => a.text > b.text ? 1 : -1)
      }
    },
    createClassFilter () {
      const classes = this.$store.getters.getData('classes')
      return {
        label: this.$tc('class_title', 1),
        key: 'classes',
        options: classes.map((i) => {
          return {
            value: i.id,
            text: i.name
          }
        })
      }
    },
    createCrFilter () {
      const stats = this.$store.getters.getData('npc-stats')
      const availableCrs = [...new Set(this.items.map(i => i.cr))]
      return {
        key: 'cr',
        label: this.$t('npc.cr_title'),
        options: stats.filter(i => availableCrs.includes(i.id))
          .map((i) => {
            return {
              value: i.id,
              text: i.cr
            }
          })
          .sort((a, b) => a.id > b.id ? 1 : -1)
      }
    }
  }
}
