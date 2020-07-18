<template>
  <v-container>
    <me-list-page
      :loading="loading"
      :title="pageTitle"
      :rule-link="ruleLink"
      :filters="filters"
      :headers="headers"
      :items="items"
      default-sort="name"
      :custom-sort="customSort"
    >
      <template v-if="!loading" v-slot:list="{ displayItems }">
        <me-weapon-list :items="displayItems" />
      </template>
    </me-list-page>
  </v-container>
</template>

<script>
import { AverageFromDie } from '~/mixins/averageFromDie'

export default {
  mixins: [AverageFromDie],
  async fetch () {
    this.$store.commit('pageTitle', 'Weapons')
    this.items = await this.$store.dispatch('FETCH_DATA', 'weapons')
    this.loading = false
  },
  data () {
    return {
      items: [],
      loading: true,
      ruleLink: {
        to: '/manual/equipment#weapons',
        name: 'Weapon Rules'
      }
    }
  },
  computed: {
    filters () {
      const rarityOptions = this.$store.getters['config/rarityOptions']
      return [
        rarityOptions,
        {
          name: 'Type',
          key: 'type',
          options: [...new Set(this.items.map(i => i.type))]
        },
        {
          name: 'Properties',
          key: 'properties',
          options: [...new Set(this.items.map(i => i.properties).flat())]
        }
      ]
    },
    pageTitle () {
      return this.$store.getters.pageTitle
    },
    headers () {
      return this.$store.getters['config/weaponHeaders']
    }
  },
  methods: {
    customSort (items, sortBy, sortDesc) {
      const desc = sortDesc ? 1 : -1
      items.sort((a, b) => {
        let aVal = a[sortBy]
        let bVal = b[sortBy]
        switch (sortBy) {
          case 'type':
          case 'name':
            break
          case 'damage':
            aVal = this.averageFromDie(a.damage)
            bVal = this.averageFromDie(b.damage)
            break
          default:
            aVal = a[sortBy] ? parseInt(a[sortBy].replace(/\D/, ''), 10) : 0
            bVal = b[sortBy] ? parseInt(b[sortBy].replace(/\D/, ''), 10) : 0
        }
        return aVal === bVal
          ? a.id > b.id ? desc : desc * -1
          : aVal > bVal ? desc : desc * -1
      })
      return items
    }
  },
  head () {
    return {
      title: 'Weapons - Equipment | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'The Mass Effect 5e arsenal has over 80 unique weapons designed to match the game\'s weaponry' }
      ]
    }
  },
  layout: 'list'
}
</script>
