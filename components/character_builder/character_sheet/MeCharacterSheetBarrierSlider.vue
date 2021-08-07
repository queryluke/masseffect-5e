<template>
  <div v-if="hasBarrier">
    <v-slider
      :value="remainingUses"
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
        <v-icon :color="csBgColor('barrier')" @click="csBarrierTicksUsed++">
          mdi-minus
        </v-icon>
      </template>
    </v-slider>
    <div>
      <v-btn x-small :color="csBgColor('barrier')" :disabled="remainingUses === 0" @click="csBarrierUsed++">
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
    remainingTicks () {
      return this.csMaxBarrierTicks - this.csBarrierTicksUsed
    },
    remainingUses () {
      return this.csMaxBarrierUses - this.csBarrierUsed || 0
    }
  }
}
</script>
