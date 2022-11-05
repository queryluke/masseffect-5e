<template>
  <div>
    <v-row no-gutters class="my-1">
      <v-col>
        <v-card flat color="transparent" class="text-center mx-auto" max-width="70px">
          <div class="text-caption">
            <small>AC</small>
          </div>
          <div class="text-h6">
            {{ ac }}
          </div>
        </v-card>
      </v-col>
      <v-col>
        <v-card flat color="transparent" class="text-center mx-auto" max-width="70px">
          <div class="text-caption">
            <small>Prof Bonus</small>
          </div>
          <div class="text-h6">
            +{{ profBonus }}
          </div>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          elevation="0"
          color="transparent"
          hover
          class="text-center mx-auto"
          max-width="70px"
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
      <v-col>
        <v-card flat color="transparent" class="text-center mx-auto" max-width="70px">
          <div class="text-caption">
            <small>Initiative</small>
          </div>
          <div class="text-h6 d-flex justify-center align-center">
            <me-cs-ad-icon
              v-if="(initiativeAd && !initiativeDis) || (!initiativeAd && initiativeDis)"
              :type="initiativeAd ? 'a' : 'd'"
              class="mr-1"
            />
            <me-cs-roll-card :roll="{ type: 'roll', detail: 'initiative', notation: `1d20${rollText(initiativeBonus)}`}">
              <div class="py-1">
                {{ initiativeBonus > 0 ? '+' : '' }}{{ initiativeBonus }}
              </div>
            </me-cs-roll-card>
          </div>
        </v-card>
      </v-col>
      <v-col>
        <me-cs-inspiration />
      </v-col>
    </v-row>
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
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { ScoreText } from '~/mixins/character/scoreText'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCsApsi',
  mixins: [ScoreText],
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
      return Object.values(this.speeds).filter(i => i).length > 1
    },
    initiativeBonus () {
      const bonus = this.mechanics
        .filter(i => i.type === 'initiative' && i.effect === 'bonus')
        .reduce((acc, curr) => acc + this.$store.getters['character/mechanics/mcBonus'](curr.bonus), 0)
      return this.dexMod + bonus
    },
    initiativeAd () {
      return this.mechanics.filter(i => i.type === 'initiative' && i.effect?.type === 'advantage').length > 0
    },
    initiativeDis () {
      return this.mechanics.filter(i => i.type === 'initiative' && i.effect?.type === 'disadvantage').length > 0
    }
  }
}
</script>
