<template>
  <v-row justify="space-between" class="mx-n4 my-1" no-gutters>
    <v-col cols="3" class="text-center">
      <v-card color="transparent" elevation="0" outlined>
        <div class="text-caption">
          <small>AC</small>
        </div>
        <div class="text-h6">
          {{ ac }}
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
          <small>Speed{{ additionalSpeeds ? '*' : '' }}</small>
        </div>
        <div class="text-h6">
          <me-distance :length="speeds.walk.distance || 0" abbr />
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
            v-if="(initiativeAd && !initiativeDis) || (!initiativeAd && initiativeDis)"
            :type="initiativeAd ? 'a' : 'd'"
          />
          <span class="ml-1">
            {{ initiativeBonus > 0 ? '+' : '' }}{{ initiativeBonus }}
          </span>
        </div>
      </v-card>
    </v-col>
    <me-standard-dialog :shown="addlSpeedDialog" title="Speeds" @close="addlSpeedDialog = false">
      <template v-for="(value, speed) of speeds">
        <v-card v-if="value" :key="`speed-${speed}`" outlined flat class="px-3 pa-2 my-1">
          <div class="text-subtitle-1">
            <strong>{{ $t(`speeds.${speed}.title`) }}</strong> <me-distance :length="value.distance" abbr />
          </div>
          <div v-if="value.note" class="text-caption">
            {{ value.note }}
          </div>
        </v-card>
      </template>
    </me-standard-dialog>
  </v-row>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCsApsi',
  data () {
    return {
      addlSpeedDialog: false
    }
  },
  computed: {
    ...mapGetters({
      ac: 'ac/ac',
      profBonus: 'profBonus',
      speeds: 'speeds',
      mechanics: 'mechanics/mechanics',
      dexMod: 'abilities/dexMod'
    }),
    additionalSpeeds () {
      return Object.values(this.speeds).length > 1
    },
    initiativeBonus () {
      const bonus = this.mechanics
        .filter(i => i.type === 'initiative' && typeof i.effect === 'object')
        .reduce((acc, curr) => acc + this.$store.getters['character/mechanics/mcBonus'](curr.effect), 0)
      return this.dexMod + bonus
    },
    initiativeAd () {
      return this.mechanics.filter(i => i.type === 'initiative' && i.effect === 'advantage').length > 0
    },
    initiativeDis () {
      return this.mechanics.filter(i => i.type === 'initiative' && i.effect === 'disadvantage').length > 0
    }
  }
}
</script>
