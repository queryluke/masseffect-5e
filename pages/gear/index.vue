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
        <me-gear-list :items="displayItems" />
      </template>
    </me-list-page>
  </v-container>
</template>

<script>
export default {
  async fetch () {
    this.$store.commit('pageTitle', 'Gear')
    this.items = await this.$store.dispatch('FETCH_DATA', 'gear')
  },
  data () {
    return {
      items: [],
      ruleLink: {
        to: '/manual/equipment',
        name: 'Gear Rules'
      }
    }
  },
  computed: {
    filters () {
      const rarityOptions = this.$store.getters['config/rarityOptions']
      return [
        {
          name: 'Type',
          key: 'type',
          options: [...new Set(this.items.map(i => i.type))].sort()
        },
        rarityOptions
      ]
    },
    pageTitle () {
      return this.$store.getters.pageTitle
    },
    headers () {
      return this.$store.getters['config/gearHeaders']
    }
  },
  head () {
    return {
      title: 'Gear - Equipment | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Mass Effect 5e gear comprises a number of items, like tools and kits, and special weapons, like grenades, heavy weapons.' }
      ]
    }
  },
  layout: 'list'
}
</script>
