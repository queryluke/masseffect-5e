<template>
  <v-container>
    <me-list-page
      :pending="$fetchState.pending"
      :title="pageTitle"
      :rule-link="ruleLink"
      :filters="filters"
      :headers="headers"
      :items="items"
      default-sort="name"
    >
      <template v-slot:list="{ displayItems }">
        <me-npc-list :items="displayItems" />
      </template>
    </me-list-page>
  </v-container>
</template>

<script>
export default {
  async fetch () {
    this.$store.commit('pageTitle', 'Bestiary')
    this.items = await this.$store.dispatch('FETCH_DATA', 'bestiary')
  },
  data () {
    return {
      items: [],
      ruleLink: {
        to: '/manual/bestiary',
        name: 'About ME5e Bestiary'
      }
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
          options: [...new Set(this.items.map(i => i.cr))].sort((a, b) => Number.parseInt(a) > Number.parseInt(b) ? 1 : -1)
        }
      ]
    }
  },
  head () {
    return {
      title: 'Bestiary | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Give your player\'s a unique challenge with over 100 custom made Mass Effect enemies! ' }
      ]
    }
  },
  layout: 'list'
}
</script>
