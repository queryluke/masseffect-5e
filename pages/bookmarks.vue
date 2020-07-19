<template>
  <v-container>
    <me-page-title />
    <div v-for="(items, type) of bookmarks" :key="type" class="mt-5">
      <p class="text-subtitle mb-1">
        {{ labels[type] }}
      </p>
      <component :is="`me-${type}-list`" :items="items" />
    </div>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      labels: {
        weapon: 'Weapons',
        armor: 'Armor',
        gear: 'Gear',
        mod: 'Mods',
        vehicle: 'Vehicles',
        power: 'Powers',
        npc: 'Npcs'
      }
    }
  },
  computed: {
    bookmarks () {
      return this.$store.getters['user/bookmarks']
    }
  },
  created () {
    this.$store.commit('pageTitle', 'Bookmarks')
  },
  methods: {
    goToMark (id) {
      this.$vuetify.goTo(id, { offset: -68 })
    }
  },
  head () {
    return {
      title: 'Bookmarks | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Keep your favorite weapons, enemies, and spells close at hand with our nifty bookmark tool.' }
      ]
    }
  }
}
</script>
