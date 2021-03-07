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
      <template #list="{ displayItems }">
        <me-armor-list :items="displayItems" />
      </template>
    </me-list-page>
  </v-container>
</template>

<script>
export default {
  layout: 'list',
  data () {
    return {
      items: [],
      ruleLink: {
        to: '/manual/equipment#armor',
        name: 'Armor Rules'
      }
    }
  },
  async fetch () {
    this.$store.commit('pageTitle', 'Armor')
    this.items = await this.$store.dispatch('FETCH_DATA', 'armor')
  },
  head () {
    return {
      title: 'Armor - Equipment | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'These pre-made armor pieces are available as mass produced alternatives to custom modding.' }
      ]
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
          options: [...new Set(this.items.map(i => i.type))].sort()
        },
        {
          name: 'Armor Type',
          key: 'armorType',
          options: [...new Set(this.items.map(i => i.armorType))]
        },
        {
          name: 'Benefits',
          key: 'notes',
          options: [...new Set(this.items.map(i => i.notes).flat())].sort()
        }
      ]
    },
    pageTitle () {
      return this.$store.getters.pageTitle
    },
    headers () {
      return this.$store.getters['config/armorHeaders']
    }
  }
}
</script>
