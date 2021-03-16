<template>
  <v-container>
    <me-list-page
      :pending="$fetchState.pending"
      :title="pageTitle"
      :rule-link="ruleLink"
      :filters="filters"
      :headers="headers"
      :items="items"
      :custom-sort="customSort"
      default-sort="name"
    >
      <template #list="{ displayItems }">
        <me-npc-list :items="displayItems" />
      </template>
    </me-list-page>
  </v-container>
</template>

<script>
import { CrToInt } from '~/mixins/crToInt'
export default {
  mixins: [CrToInt],
  layout: 'list',
  data () {
    return {
      items: [],
      ruleLink: {
        to: '/manual/bestiary',
        name: 'About ME5e Bestiary'
      }
    }
  },
  async fetch () {
    this.$store.commit('pageTitle', 'Bestiary')
    this.items = await this.$store.dispatch('FETCH_DATA', 'bestiary')
  },
  head () {
    return {
      title: 'Bestiary | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Give your player\'s a unique challenge with over 100 custom made Mass Effect enemies! ' }
      ]
    }
  },
  computed: {
    headers () {
      return this.$store.getters['config/npcHeaders']
    },
    pageTitle () {
      return this.$store.getters.pageTitle
    },
    filters () {
      return [
        {
          name: 'Faction',
          key: 'unit',
          options: [...new Set(this.items.map(i => i.unit))].sort()
        },
        {
          name: 'Challenge Rating',
          key: 'cr',
          options: [...new Set(this.items.map(i => i.cr))].sort((a, b) => {
            return this.crToInt(a) > this.crToInt(b) ? 1 : -1
          })
        }
      ]
    }
  },
  methods: {
    customSort (items, sortBy, sortDesc) {
      const desc = sortDesc ? 1 : -1
      items.sort((a, b) => {
        const aVal = sortBy === 'cr' ? this.crToInt(a.cr) : a[sortBy]
        const bVal = sortBy === 'cr' ? this.crToInt(b.cr) : b[sortBy]
        return aVal === bVal
          ? a.id > b.id ? desc : desc * -1
          : aVal > bVal ? desc : desc * -1
      })
      return items
    }
  }
}
</script>
