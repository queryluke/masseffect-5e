<template>
  <div v-if="barrier.uses.max">
    <v-slider
      v-model="remainingTicks"
      vertical
      hide-details
      append-icon="mdi-plus"
      thumb-label="always"
      :max="barrier.ticks.max"
      :color="csBgColor('barrier')"
      :disabled="viewOnly"
    >
      <template #append>
        <v-icon class="d-block" :color="csBgColor('barrier')" @click="setTicks(barrier.ticks.used - 1)">
          mdi-plus
        </v-icon>
      </template>
      <template #prepend>
        <v-icon class="mt-n2" :color="csBgColor('barrier')" @click="setTicks(barrier.ticks.used + 1)">
          mdi-minus
        </v-icon>
      </template>
    </v-slider>
    <div>
      <v-btn x-small :color="csBgColor('barrier')" :disabled="viewOnly || remainingUses === 0" @click="useBarrier">
        Barrier <span class="text-lowercase pl-1">({{ barrierDie }})</span>
      </v-btn>
      <div class="text-caption text-center">
        <small>Uses: {{ remainingUses }}</small>
      </div>
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
  props: {
    barrier: {
      type: Object,
      default: () => {
        return {
          ticks: {
            max: 0,
            used: 0
          },
          uses: {
            max: 0,
            used: 0
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters(['barrierDie']),
    remainingTicks: {
      get () {
        return this.barrier.ticks.max - this.barrier.ticks.used
      },
      set (value) {
        this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.barrier.ticksUsed', value: this.barrier.ticks.max - value })
      }
    },
    remainingUses () {
      return this.barrier.uses.max - this.barrier.uses.used
    },
    viewOnly () {
      return this.$store.state.character.viewOnly
    }
  },
  methods: {
    setTicks (value) {
      if (this.viewOnly) {
        return
      }
      if (value < 0 || value > this.barrier.ticks.max) {
        return
      }
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.barrier.ticksUsed', value })
    },
    useBarrier () {
      const value = {
        used: (this.barrier.uses.used || 0) + 1,
        ticksUsed: 0
      }
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.barrier', value })
    }
  }
}
</script>
