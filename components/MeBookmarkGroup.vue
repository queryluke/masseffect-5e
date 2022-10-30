<template>
  <div v-if="items.length > 0 && !$fetchState.pending" class="mt-5">
    <p class="text-subtitle mb-1">
      {{ types[type].label }}
    </p>
    <component :is="types[type].component" :items="items" />
  </div>
</template>

<script>
import jsonpack from 'jsonpack/main'

export default {
  props: {
    type: {
      type: String,
      required: true
    }
  },
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
  async fetch () {
    await this.$store.dispatch('FETCH_DATA', this.type)
  },
  computed: {
    bookmarks () {
      return this.$store.getters['user/bookmarks']
    },
    items () {
      let ofType = this.bookmarks.filter(i => i.model === this.type).map((i) => {
        try {
          return this.$store.getters.getItem(this.type, i.modelId)
        } catch (e) {
          return null
        }
      }).filter(i => i)
      if (this.type === 'bestiary') {
        const genpcs = this.bookmarks.filter(i => i.model === 'genpc').map((i) => {
          return jsonpack.unpack(i.data)
        })
        ofType = [...ofType, ...genpcs]
      }
      return ofType
    }
  }
}
</script>
