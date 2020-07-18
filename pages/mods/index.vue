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
    >
      <template v-if="!loading" v-slot:list="{ displayItems }">
        <me-mod-list :items="displayItems" />
      </template>
    </me-list-page>
  </v-container>
</template>

<script>
export default {
  async fetch () {
    this.$store.commit('pageTitle', 'Armor & Weapon Mods')
    this.items = await this.$store.dispatch('FETCH_DATA', 'mods')
    this.loading = false
  },
  data () {
    return {
      items: [],
      loading: true,
      ruleLink: {
        to: '/manual/equipment#mods',
        name: 'Mod Rules'
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
          options: ['Armor', 'Weapon']
        },
        rarityOptions,
        {
          name: 'Placement',
          key: 'placement',
          options: [...new Set(this.items.map(i => i.placement))]
        },
        {
          name: 'Availability',
          key: 'availability',
          options: [...new Set(this.items.map(i => i.availability).flat())]
        },
        {
          name: 'Benefits',
          key: 'notes',
          options: [...new Set(this.items.map(i => i.notes).flat())]
        }
      ]
    },
    pageTitle () {
      return this.$store.getters.pageTitle
    },
    headers () {
      return this.$store.getters['config/modHeaders']
    }
  },
  head () {
    return {
      title: 'Mods - Equipment | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Mass Effect 5e comes with a full set of armor and weapon mods that let you customize your gear to your needs.' }
      ]
    }
  },
  layout: 'list'
}
</script>
