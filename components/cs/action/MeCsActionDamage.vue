<template>
  <div class="text-center">
    <div class="text-subtitle-2 mb-n1">
      {{ text }}
    </div>
    <div class="text-caption font-weight-light">
      <small>
        {{ item.type || '' }}
      </small>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCsActionDamage',
  props: {
    damage: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      defaults: {
        dieCount: 0,
        dieType: false,
        type: false,
        mod: false,
        bonus: false
      }
    }
  },
  computed: {
    ...mapGetters({ mcBonus: 'mechanics/mcBonus', abilityBreakdown: 'abilities/abilityBreakdown' }),
    item () {
      return { ...this.defaults, ...this.damage }
    },
    mod () {
      if (this.item.mod) {
        return this.abilityBreakdown[this.item.mod].mod
      }
      return 0
    },
    bonus () {
      if (this.item.bonus) {
        return this.mcBonus(this.item.bonus)
      }
      return 0
    },
    text () {
      let text = `${this.item.dieCount}`
      if (this.item.dieType) {
        text += `d${this.item.dieType}`
      }
      const bonus = this.mod + this.bonus
      if (bonus !== 0) {
        text += `${bonus > 0 ? ' +' : ' -'} ${bonus}`
      }
      return text
    }
  }
}
</script>
