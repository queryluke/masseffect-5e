<template>
  <v-row justify="space-between" class="mx-n4" :no-gutters="$vuetify.breakpoint.mdAndUp">
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
      <v-card
        v-if="csAddlSpeeds.length > 0"
        color="transparent"
        elevation="0"
        outlined
        class="primary--text"
        @click="addlSpeedDialog = true"
      >
        <div class="text-caption">
          <small>Speed*</small>
        </div>
        <div class="text-h6">
          <me-distance :length="csSpeed" abbr />
        </div>
      </v-card>
      <div v-else>
        <div class="text-caption">
          <small>Speed</small>
        </div>
        <div class="text-h6">
          <me-distance :length="csSpeed" abbr />
        </div>
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
    <me-standard-dialog :shown="addlSpeedDialog" title="Additional Speeds" @close="addlSpeedDialog = false">
      <v-list dense>
        <v-list-item v-for="speed of csAddlSpeeds" :key="`speed-${speed.type}`">
          <v-list-item-content>
            <v-list-item-title>
              {{ $t(`speeds.${speed.type}.title`) }} <me-distance :length="speed.speed" abbr />
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </me-standard-dialog>
  </v-row>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  data () {
    return {
      addlSpeedDialog: false
    }
  }
}
</script>
