<template>
  <div v-if="hasBarrier">
    <v-slider
      :value="csCurrentBarrierTicks"
      vertical
      hide-details
      append-icon="mdi-plus"
      thumb-label="always"
      :max="csMaxBarrierTicks"
      :color="csBgColor('barrier')"
    >
      <template #append>
        <v-icon class="d-block" :color="csBgColor('barrier')" @click="addBarrier">
          mdi-plus
        </v-icon>
      </template>
      <template #prepend>
        <v-icon :color="csBgColor('barrier')" @click="removeBarrier">
          mdi-minus
        </v-icon>
      </template>
    </v-slider>
    <div>
      <v-btn x-small :color="csBgColor('barrier')" :disabled="csRemainingBarrierUses === 0">
        Barrier <span class="text-lowercase pl-1">({{ csBarrierDieType }})</span>
      </v-btn>
      <div class="text-caption text-center">
        <small>Uses: {{ csRemainingBarrierUses }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  created () {
    this.setBarrierMaxes()
  },
  methods: {
    addBarrier () {
      this.csCurrentBarrierTicks = Math.min(this.csMaxBarrierTicks, this.csCurrentBarrierTicks + 1)
    },
    removeBarrier () {
      this.csCurrentBarrierTicks = Math.max(0, this.csCurrentBarrierTicks - 1)
    },
    castBarrier () {
      this.csCurrentBarrierUses = Math.max(0, this.csCurrentBarrierUses - 1)
    }
  }
}
</script>
