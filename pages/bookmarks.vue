<template>
  <v-container>
    <me-page-title />
    <template v-for="(items, type) of bookmarks">
      <div v-if="items.length > 0" :key="type" class="mt-5">
        <p class="text-subtitle mb-1">
          {{ types[type].label }}
        </p>
        <component :is="types[type].component" :items="items" />
      </div>
    </template>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      types: {
        weapons: {
          label: this.$tc('weapon_title', 2),
          component: 'MeWeaponList'
        },
        armor: {
          label: this.$tc('armor_title', 2),
          component: 'MeArmorList'
        },
        gear: {
          label: this.$tc('gear_title', 2),
          component: 'MeGearList'
        },
        mods: {
          label: this.$tc('mod_title', 2),
          component: 'MeModList'
        },
        vehicle: {
          label: this.$tc('vehicle_title', 2),
          component: 'MeVehicleList'
        },
        powers: {
          label: this.$tc('power_title', 2),
          component: 'MePowerList'
        },
        bestiary: {
          label: this.$tc('npc_title', 2),
          component: 'MeNpcList'
        }
      }
    }
  },
  computed: {
    bookmarks () {
      // TODO: this is temporary (L59-68)
      const marks = this.$store.getters['user/bookmarks']
      if (marks.npc) {
        const freezeNpcs = marks.npc.slice()
        for (const npc of freezeNpcs) {
          this.$store.dispatch('user/TOGGLE_BOOKMARK', { type: 'npc', item: npc })
          this.$store.dispatch('user/TOGGLE_BOOKMARK', { type: 'bestiary', item: npc })
        }
        this.$store.dispatch('user/REMOVE_BOOKMARK_KEY', 'npc')
      }
      return this.$store.getters['user/bookmarks']
    }
  },
  created () {
    this.$store.dispatch('SET_META', {
      title: this.$t('bookmarks_title'),
      description: this.$t('meta.bookmarks')
    })
  },
  methods: {
    goToMark (id) {
      this.$vuetify.goTo(id, { offset: -68 })
    }
  }
}
</script>
