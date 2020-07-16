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
        <me-weapon-list :items="displayItems" />
      </template>
    </me-list-page>
  </v-container>
</template>

<script>
export default {
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
          options: ['Assault Rifle', 'Heavy Pistol', 'Heavy Weapon', 'Melee', 'SMG', 'Shotgun', 'Sniper Rifle']
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
