<template>
  <div v-if="hasBarrier">
    <v-slider
      v-model="remainingTicks"
      vertical
      hide-details
      append-icon="mdi-plus"
      thumb-label="always"
      :max="csMaxBarrierTicks"
      :color="csBgColor('barrier')"
    >
      <template #append>
        <v-icon class="d-block" :color="csBgColor('barrier')" @click="csBarrierTicksUsed--">
          mdi-plus
        </v-icon>
      </template>
      <template #prepend>
        <v-icon class="mt-n2" :color="csBgColor('barrier')" @click="csBarrierTicksUsed++">
          mdi-minus
        </v-icon>
      </template>
    </v-slider>
    <div>
      <v-btn x-small :color="csBgColor('barrier')" :disabled="remainingUses === 0" @click="useBarrier">
        Barrier <span class="text-lowercase pl-1">({{ csBarrierDieType }})</span>
      </v-btn>
      <div class="text-caption text-center">
        <small>Uses: {{ remainingUses }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  computed: {
    remainingTicks: {
      get () {
        return this.csMaxBarrierTicks - this.csBarrierTicksUsed
      },
      set (value) {
        this.csBarrierTicksUsed = this.csMaxBarrierTicks - value
      }
    },
    remainingUses () {
      return this.character.currentStats.featuresTimesUsed.barrier ? this.csMaxBarrierUses - this.character.currentStats.featuresTimesUsed.barrier : this.csMaxBarrierUses
    }
  },
  methods: {
    useBarrier () {
      const value = (this.character.currentStats.featuresTimesUsed.barrier || 0) + 1
      this.$store.dispatch('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'currentStats.featuresTimesUsed.barrier', value })
    }
  }
}
</script>
