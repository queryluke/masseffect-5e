<template>
  <v-row justify="space-between" class="mx-n4">
    <v-col cols="3" class="text-center">
      <div class="text-caption">
        <small>AC</small>
      </div>
      <div class="text-h6">
        {{ csAc }}
      </div>
    </v-col>
    <v-col cols="3" class="text-center">
      <div class="text-caption">
        <small>Prof Bonus</small>
      </div>
      <div class="text-h6">
        +{{ profBonus }}
      </div>
    </v-col>
    <v-col cols="3" class="text-center">
      <div class="text-caption">
        <small>Speed</small>
      </div>
      <div class="text-h6">
        <me-distance :length="csSpeed" abbr />
      </div>
    </v-col>
    <v-col cols="3" class="text-center">
      <div class="text-caption">
        <small>Barrier Ticks</small>
      </div>
      <div class="text-h6">
        {{ csMaxBarrierTicks - csBarrierTicksUsed || '-' }}
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers]
}
</script>
