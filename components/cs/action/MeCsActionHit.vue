<template>
  <v-card flat class="text-subtitle-2 text-md-h6 text-center" color="transparent">
    {{ toHit >= 0 ? '+' : '-' }} {{ toHit }}
  </v-card>
</template>
<script>

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')

export default {
  name: 'MeCsActionHit',
  props: {
    hit: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      defaults: {
        mod: false,
        proficient: false,
        bonus: false
      }
    }
  },
  computed: {
    ...mapGetters({ mcBonus: 'mechanics/mcBonus', abilityBreakdown: 'abilities/abilityBreakdown', profBonus: 'profBonus' }),
    item () {
      return { ...this.defaults, ...this.hit }
    },
    mod () {
      if (this.item.mod) {
        return this.abilityBreakdown[this.item.mod].mod
      }
      return 0
    },
    bonus () {
      return this.item.bonus ? this.mcBonus(this.item.bonus) : 0
    },
    toHit () {
      return this.bonus + this.mod + (this.item.proficient ? this.profBonus : 0)
    }
  }
}
</script>
