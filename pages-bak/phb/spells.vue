<template>
  <v-container :class="{ 'px-0': $vuetify.breakpoint.xsOnly }">
    <me-list-page
      :rule-link="ruleLink"
      :filters="filters"
      :headers="headers"
      :items=""
    />
  </v-container>
</template>

<script>
export default {
  async fetch () {
    await this.$store.dispatch('FETCH_DATA', 'spells')
  },
  data () {
    return {
      ruleLink: {
        to: '/rules/spellcasting',
        name: 'Spellcasting Rules'
      },
      filters: [
        {
          name: 'Spell Type',
          options: [
            { value: 'biotic', text: 'Biotic' },
            { value: 'tech', text: 'Tech' },
            { value: 'combat', text: 'Combat' }
          ]
        },
        {
          name: 'Class',
          options: [
            { value: 'adept', text: 'Adept' },
            { value: 'engineer', text: 'Engineer' },
            { value: 'infiltrator', text: 'Infiltrator' },
            { value: 'sentinel', text: 'Sentinel' },
            { value: 'soldier', text: 'Soldier' },
            { value: 'vanguard', text: 'Vanguard' }
          ]
        }
      ],
      headers: [
        { label: 'Type/Level', key: 'type', component: 'spell-type', cols: 4, sm: 3, lg: 2 },
        { label: 'Name', key: 'name', cols: 8, sm: 9, lg: 2 },
        { label: 'Duration', key: 'duration', cols: 2, classes: 'd-lg-and-up' },
        { label: 'Range (Area)', key: 'range', cols: 2, classes: 'd-lg-and-up' },
        { label: 'Attack', key: 'attack', cols: 2, classes: 'd-lg-and-up' },
        { label: 'Damage/Effect', key: 'damage', cols: 2, classes: 'd-lg-and-up' }
      ]
    }
  },
  computed: {
    items () {
      return this.$store.getters.getData('spells')
    }
  },
  methods: {
    filterBy (value, search, item) {
      let data = this.items
      const sortBy = this.sortBy.key
      const order = this.order
      data.sort(function (a, b) {
        switch (sortBy) {
          case 'type':
            if (a[sortBy] === b[sortBy]) {
              if (a.level === b.level) {
                return (a.name > b.name ? 1 : -1) * order
              } else {
                return (a.level > b.level ? 1 : -1) * order
              }
            } else {
              return (a[sortBy] > b[sortBy] ? 1 : -1) * order
            }
          default:
            return (a[sortBy] === b[sortBy] ? 0 : a[sortBy] > b[sortBy] ? 1 : -1) * order
        }
      })
      if (this.search) {
        data = data.filter((spell) => {
          const nameMatch = spell.name.toLowerCase().includes(this.searchString.toLowerCase())
          return nameMatch
        })
      }
      if (this.filters.spells.type.length > 0) {
        data = data.filter(spell => this.filters.spells.type.includes(spell.type))
      }
      if (this.filters.spells.availableClasses.length > 0) {
        data = data.filter((spell) => {
          for (const c of this.filters.spells.availableClasses) {
            if (spell.availableClasses.includes(c)) {
              return spell
            }
          }
        })
      }
      return data
    }
  },
  head () {
    return {
      title: 'Powers: Biotics, Tech and Combat | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Dozens of unique and re-skinned D&D spells are available as Biotic, Tech, and Combat powers' }
      ]
    }
  }
}
</script>
