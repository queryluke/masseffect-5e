<template>
  <v-row justify="space-between" class="mx-n4 my-1" no-gutters>
    <v-col cols="3" class="text-center">
      <v-card color="transparent" elevation="0" outlined>
        <div class="text-caption">
          <small>AC</small>
        </div>
        <div class="text-h6">
          {{ csAc }}
        </div>
      </v-card>
    </v-col>
    <v-col cols="3" class="text-center">
      <v-card color="transparent" elevation="0" outlined>
        <div class="text-caption">
          <small>Prof Bonus</small>
        </div>
        <div class="text-h6">
          +{{ profBonus }}
        </div>
      </v-card>
    </v-col>
    <v-col cols="3" class="text-center">
      <v-card
        color="transparent"
        elevation="0"
        outlined
        hover
        @click="addlSpeedDialog = true"
      >
        <div class="text-caption">
          <small>Speed{{ allCsSpeeds.length > 1 ? '*' : '' }}</small>
        </div>
        <div class="text-h6">
          <me-distance :length="csSpeed.distance" abbr />
        </div>
      </v-card>
    </v-col>
    <v-col cols="3" class="text-center">
      <v-card color="transparent" elevation="0" outlined>
        <div class="text-caption">
          <small>Initiative</small>
        </div>
        <div class="text-h6 d-flex justify-center align-center">
          <me-cs-ad-icon
            v-if="(csInitiativeAdvantage && !csInitiativeDisadvantage) || (!csInitiativeAdvantage && csInitiativeDisadvantage)"
            :type="csInitiativeAdvantage ? 'a' : 'd'"
          />
          <span class="ml-1">
            {{ csInitiativeBonus }}
          </span>
        </div>
      </v-card>
    </v-col>
    <me-standard-dialog :shown="addlSpeedDialog" title="Speeds" @close="addlSpeedDialog = false">
      <v-list dense two-line>
        <v-list-item v-for="speed of allCsSpeeds" :key="`speed-${speed.speed}`">
          <v-list-item-content>
            <v-list-item-title>
              {{ $t(`speeds.${speed.speed}.title`) }} <me-distance :length="speed.distance" abbr />
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ speed.note }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </me-standard-dialog>
  </v-row>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character/hp')
export default {
  name: 'MeCsBlocksApsi',
  data () {
    return {
      addlSpeedDialog: false
    }
  },
  computed: {
    ...mapGetters([])
  }
}
</script>
