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
        <me-power-list :items="displayItems" />
      </template>
    </me-list-page>
  </v-container>
</template>

<script>
export default {
  async fetch () {
    this.$store.commit('pageTitle', 'Powers')
    this.items = await this.$store.dispatch('FETCH_DATA', 'powers')
  },
  data () {
    return {
      items: [],
      ruleLink: {
        to: '/manual/powercasting',
        name: 'Powercasting Rules'
      },
      filters: [
        {
          name: 'Spell Type',
          key: 'type',
          options: [
            { value: 'biotic', text: 'Biotic' },
            { value: 'tech', text: 'Tech' },
            { value: 'combat', text: 'Combat' }
          ]
        },
        {
          name: 'Class',
          key: 'availableClasses',
          options: [
            { value: 'adept', text: 'Adept' },
            { value: 'engineer', text: 'Engineer' },
            { value: 'infiltrator', text: 'Infiltrator' },
            { value: 'sentinel', text: 'Sentinel' },
            { value: 'soldier', text: 'Soldier' },
            { value: 'vanguard', text: 'Vanguard' }
          ]
        }
      ]
    }
  },
  computed: {
    headers () {
      return this.$store.getters['config/powerHeaders']
    },
    pageTitle () {
      return this.$store.getters.pageTitle
    }
  },
  head () {
    return {
      title: 'Powers: Biotics, Tech and Combat | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Dozens of unique and re-skinned D&D spells are available as Biotic, Tech, and Combat powers' }
      ]
    }
  },
  layout: 'list'
}
</script>
