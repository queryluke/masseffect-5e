<template>
  <div v-if="barrier.uses.max">
    <v-slider
      :value="remainingTicks"
      vertical
      hide-details
      append-icon="mdi-plus"
      thumb-label="always"
      :max="barrier.ticks.max"
      :color="csBgColor('barrier')"
      :disabled="viewOnly"
      @end="remainingTicks = $event"
    >
      <template #append>
        <v-icon class="d-block" :color="csBgColor('barrier')" @click="remainingTicks++">
          mdi-plus
        </v-icon>
      </template>
      <template #prepend>
        <v-icon class="mt-n2" :color="csBgColor('barrier')" @click="remainingTicks--">
          mdi-minus
        </v-icon>
      </template>
    </v-slider>
    <div>
      <v-btn
        x-small
        :color="csBgColor('barrier')"
        :disabled="viewOnly || remainingTicks === 0"
        @click="useBarrier"
      >
        Roll
        (<span class="text-lowercase">{{ barrierDie }}</span>)
      </v-btn>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { CsColors } from '~/mixins/character/csColors'
const { mapGetters } = createNamespacedHelpers('character/hp')
export default {
  name: 'MeCsHealthBarrierSlider',
  mixins: [CsColors],
  computed: {
    ...mapGetters(['barrier']),
    remainingTicks: {
      get () {
        return this.barrier.ticks.max - this.barrier.ticks.used
      },
      set (value) {
        if (this.viewOnly) {
          return
        }
        if (value < 0 || value > this.barrier.ticks.max) {
          return
        }
        this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.barrier.ticksUsed', value: this.barrier.ticks.max - value })
      }
    },
    barrierDie () {
      return `${this.barrier.dieCount}d${this.barrier.dieType}`
    },
    remainingUses () {
      return this.barrier.uses.max - this.barrier.uses.used
    },
    viewOnly () {
      return this.$store.state.character.viewOnly
    }
  },
  methods: {
    useBarrier () {
      this.remainingTicks--
      this.$store.dispatch('character/roller/ROLL',
        {
          notation: this.barrierDie,
          detail: 'Barrier',
          type: 'damage reduction'
        })
    }
  }
}
</script>
