export const ListPageHeaders = {
  data () {
    return {
      listPageHeaders: {
        powers: [
          { label: 'type_level_title', key: 'level', cols: 4, sm: 3, md: 2 },
          { label: 'name_title', key: 'name', cols: 8, sm: 9, md: 4, lg: 2 },
          { label: 'duration_title', key: 'duration', cols: 3, lg: 2, classes: 'd-none d-md-flex', sortable: false },
          { label: 'range_area_title', key: 'range', cols: 3, lg: 2, classes: 'd-none d-md-flex', sortable: false },
          { label: 'attack_type_title', key: 'attack', cols: 2, classes: 'd-none d-lg-flex', sortable: false },
          { label: 'damage_effect_title', key: 'effect', cols: 2, classes: 'd-none d-lg-flex', sortable: false }
        ],
        weapons: [
          { key: 'name', label: 'name_title', cols: 8, sm: 9, lg: 3 },
          { key: 'damage', label: 'damage_title', cols: 4, sm: 3, lg: 2 },
          { key: 'heat', label: 'heat_title', cols: 1, classes: 'd-none d-lg-flex' },
          { key: 'range', label: 'range_title', cols: 2, classes: 'd-none d-lg-flex' },
          { key: 'weight', label: 'weight_title', cols: 2, classes: 'd-none d-lg-flex' },
          { key: 'cost', label: 'cost_title', cols: 2, classes: 'd-none d-lg-flex' }
        ],
        armor: [
          { key: 'name', label: 'name_title', cols: 6, sm: 5, md: 4, lg: 3 },
          { key: 'cost', label: 'cost_title', cols: 2, sm: 2, md: 1, classes: 'd-none d-sm-flex' },
          { key: 'placement', label: 'armor_placement_title', cols: 3, sm: 2 },
          { key: 'type', label: 'type_title', cols: 3, md: 2 },
          { key: 'notes', label: 'notes_title', cols: 3, lg: 4, classes: 'd-none d-md-flex', sortable: false }
        ],
        mods: [
          { key: 'name', label: 'name_title', cols: 6, sm: 5, md: 4, lg: 3 },
          { key: 'cost', label: 'cost_title', cols: 3, sm: 2, md: 1, classes: 'd-none d-sm-flex' },
          { key: 'placement', label: 'mod_placement_title', cols: 3, sm: 2 },
          { key: 'availability', label: 'for_title', cols: 3, sortable: false },
          { key: 'notes', label: 'notes_title', cols: 3, classes: 'd-none d-md-flex', sortable: false }
        ],
        gear: [
          { key: 'name', label: 'name_title', cols: 9, sm: 6 },
          { key: 'cost', label: 'cost_title', cols: 3 },
          { key: 'weight', label: 'weight_title', cols: 3, classes: 'd-none d-sm-flex' }
        ],
        bestiary: [
          { key: 'name', label: 'name_title', cols: 6 },
          { key: 'unit', label: 'npc.faction_title', cols: 3 },
          { key: 'cr', label: 'npc.cr_title', cols: 3 }
        ]
      }
    }
  },
  computed: {
    headers () {
      if (!this.model) {
        return []
      }
      return this.listPageHeaders[this.model]
    }
  }
}
