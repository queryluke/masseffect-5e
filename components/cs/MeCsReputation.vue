<template>
  <v-card flat color="transparent" @click="repDialog = true">
    <div class="d-flex justify-space-between mx-6">
      <v-avatar size="24">
        <v-img :src="require('~/assets/images/misc/paragon.png')" />
      </v-avatar>
      <v-avatar size="24">
        <v-img :src="require('~/assets/images/misc/renegade.png')" />
      </v-avatar>
    </div>
    <div class="d-flex justify-center mt-n5">
      <div id="reputationBars" class="mr-n1">
        <v-progress-circular
          id="renegadeBar"
          :value="reputation.renegade ? (reputation.renegade + 3) / 2 : 1"
          color="red darken-4"
          size="100"
          width="15"
          rotate="90"
          style="position: absolute;"
        />
        <v-progress-circular
          id="paragonBar"
          :value="reputation.paragon ? (reputation.paragon + 3) / 2 : 1"
          color="blue"
          size="100"
          width="15"
          rotate="90"
          style="margin-left: -6px"
        >
          <v-icon v-if="needSelection || needChange" :color="needChange ? 'warning' : 'info'" style="margin-left: 6px;" size="36">
            mdi-alert-circle
          </v-icon>
        </v-progress-circular>
      </div>
    </div>
    <me-standard-dialog :shown="repDialog" @close="repDialog = false">
      <template #title>
        Reputation
      </template>
      <div>
        <div class="text-subtitle-1">
          Paragon
        </div>
        <v-slider
          :value="reputation.paragon"
          class="align-center"
          :max="100"
          :min="0"
          hide-details
          thumb-label
          inverse-label
          :label="reputation.paragon.toString()"
          :disabled="viewOnly"
          @end="updateScore('paragon', $event)"
        />
      </div>
      <div>
        <div class="text-subtitle-1">
          Renegade
        </div>
        <v-slider
          :value="reputation.renegade"
          class="align-center"
          :max="100"
          :min="0"
          hide-details
          thumb-label
          inverse-label
          :label="reputation.renegade.toString()"
          :disabled="viewOnly"
          @end="updateScore('renegade', $event)"
        />
      </div>
      <div v-for="th in thresholds" :key="`select-benefit-${th.threshold}`">
        <me-cb-choices-v-select
          :items="th.options"
          :acquired="notAvailable"
          :label="`Threshold ${th.threshold}`"
          :value="th.selected ? [th.selected] : []"
          persistent-hint
          :append-icon="th.needsAttention ? 'mdi-alert-circle' : undefined"
          :error="th.needsAttention"
          :hint="th.needsAttention ? 'You no longer meet the prerequisites for this threshold.' : undefined"
          @change="changeSelection(th.threshold, $event)"
        >
          <template #itemSubtitle="{ item }">
            {{ notAvailableText(item, th) }}
          </template>
        </me-cb-choices-v-select>
      </div>
    </me-standard-dialog>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')

export default {
  name: 'MeCsReputation',
  data () {
    return {
      repDialog: false
    }
  },
  computed: {
    ...mapGetters({
      reputation: 'reputation/reputation',
      thresholds: 'reputation/thresholds',
      selected: 'selections/selected',
      selectedBenefits: 'reputation/selectedBenefits'
    }),
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    needSelection () {
      return this.thresholds.some(i => !i.selected)
    },
    needChange () {
      return this.thresholds.some(i => i.needsAttention)
    }
  },
  methods: {
    notAvailable (item) {
      return !item.available
    },
    notAvailableText (item, thresholdObject) {
      return this.notAvailable(item)
        ? thresholdObject.selected === item.value
          ? 'You no longer meet the prerequisites for this benefit'
          : 'You do not meet the prerequisites'
        : ''
    },
    changeSelection (threshold, value) {
      const path = `reputation/${threshold}/benefits`
      const newBenefits = this.selectedBenefits.slice()
      if (value) {
        const selectObj = {
          path,
          value: [{ type: 'benefits', value: value[0] }]
        }
        const index = newBenefits.findIndex(i => i.path === path)
        if (index > -1) {
          newBenefits.splice(index, 1, selectObj)
        } else {
          newBenefits.push(selectObj)
        }
        this.updateBenefits(newBenefits)
      }
    },
    updateBenefits (newBenefits) {
      const value = [
        ...this.selected.filter(i => !i.path.startsWith('reputation')),
        ...newBenefits
      ]
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'selected', value })
      this.$store.dispatch('character/mechanics/REPUTATION_MECHANIC', value)
    },
    updateScore (which, value) {
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: `currentStats.${which}`, value })
      const newBenefits = this.selectedBenefits.filter(i => i.threshold <= this.reputation.total)
      this.updateBenefits(newBenefits)
    }
  }

}
</script>

<style>
#reputationBars .v-progress-circular__underlay {
  stroke: transparent !important;
  z-index: 1;
}
#renegadeBar {
  -moz-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  transform: scaleX(-1);
  -ms-filter: fliph;
  filter: fliph;
}
</style>
