<template>
  <v-container>
    <me-page-title />
    <div v-for="(items, type) of bookmarks" :key="type" class="mt-5">
      <p class="text-subtitle mb-1">
        {{ types[type].label }}
      </p>
      <component :is="`me-${types[type].component}-list`" :items="items" />
    </div>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      types: {
        weapons: {
          label: 'Weapons',
          component: 'weapon'
        },
        armor: {
          label: 'Armor',
          component: 'armor'
        },
        gear: {
          label: 'Gear',
          component: 'gear'
        },
        mods: {
          label: 'Mods',
          component: 'mod'
        },
        vehicle: {
          label: 'Vehicles',
          component: 'vehicle'
        },
        powers: {
          label: 'Powers',
          component: 'power'
        },
        bestiary: {
          label: 'Npcs',
          component: 'npc'
        }
      }
    }
  },
  head () {
    return {
      title: 'Bookmarks | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Keep your favorite weapons, enemies, and spells close at hand with our nifty bookmark tool.' }
      ]
    }
  },
  computed: {
    bookmarks () {
      // TODO: this is temporary (L59-68)
      const marks = { ...this.$store.getters['user/bookmarks'] }
      if (marks.npc) {
        for (const npc of marks.npc) {
          this.$store.dispatch('user/TOGGLE_BOOKMARK', { type: 'npc', item: npc })
          this.$store.dispatch('user/TOGGLE_BOOKMARK', { type: 'bestiary', item: npc })
        }
        this.$store.dispatch('user/REMOVE_BOOKMARK_KEY', 'npc')
      }
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
  }
}
</script>
