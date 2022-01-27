<template>
  <v-card flat color="transparent" @click="showRepDialog">
    <me-character-sheet-card-title>
      <v-icon v-if="selectionsAvailable || selectionsNeedAttention" :color="selectionsNeedAttention ? 'warning' : 'info'" class="ml-n6">
        mdi-alert-circle
      </v-icon>
      Reputation
    </me-character-sheet-card-title>
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
          :value="renegade ? (renegade + 3) / 2 : 1"
          color="red darken-4"
          size="100"
          width="15"
          rotate="90"
          style="position: absolute;"
        />
        <v-progress-circular
          id="paragonBar"
          :value="paragon ? (paragon + 3) / 2 : 1"
          color="blue"
          size="100"
          width="15"
          rotate="90"
          style="margin-left: -6px"
        />
      </div>
    </div>
    <v-dialog v-model="repDialog" max-width="500">
      <v-card>
        <v-toolbar flat dense>
          <v-toolbar-title>
            Reputation
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text class="mt-5">
          <div>
            <div class="text-subtitle-1">
              Paragon
            </div>
            <v-slider
              v-model="paragonSlider"
              class="align-center"
              :max="100"
              :min="0"
              hide-details
              @mouseup="debouncedUpdate()"
            >
              <template #append>
                <v-text-field
                  v-model="paragonSlider"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 60px"
                  @change="debouncedUpdate()"
                />
              </template>
            </v-slider>
          </div>
          <div>
            <div class="text-subtitle-1">
              Renegade
            </div>
            <v-slider
              v-model="renegadeSlider"
              class="align-center"
              :max="100"
              :min="0"
              hide-details
              @mouseup="debouncedUpdate()"
            >
              <template #append>
                <v-text-field
                  v-model="renegadeSlider"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 60px"
                  @change="debouncedUpdate()"
                />
              </template>
            </v-slider>
          </div>
          <v-col />
          <div v-for="th in thresholds" :key="th">
            <div v-if="total >= th">
              <div class="d-flex text-h6">
                <v-icon v-if="isNoLongerAvailable(th) || isAvailableForThreshold(th)" :color="isNoLongerAvailable(th) ? 'warning' : 'info'">
                  mdi-alert-circle
                </v-icon>
                Threshold {{ th }}
              </div>
              <div v-if="isNoLongerAvailable(th)" class="text-caption">
                You no longer meet the prerequisites for this threshold.
              </div>
              <v-select
                :items="itemsForThreshold(th)"
                label="Choose a benefit..."
                :value="selectedItemForThreshold(th)"
                chips
                deletable-chips
                @change="changeSelection($event, th)"
              />
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>

import { debounce } from 'lodash'
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  name: 'MeCsReputation',
  mixins: [CharacterBuilderHelpers],
  data () {
    return {
      thresholds: [15, 30, 60, 100],
      paragonSlider: 0,
      renegadeSlider: 0,
      repDialog: false
    }
  },
  computed: {
    selectedBenefitIds () {
      return this.character.selected
        .filter(i => i.path.startsWith('reputation'))
        .reduce((acc, curr) => acc.concat(curr.value), [])
        .map(i => i.value)
    },
    selectedBenefits () {
      return this.benefits.filter(i => this.selectedBenefitIds.includes(i.id))
    },
    unselectedBenefits () {
      return this.benefits.filter(i => !this.selectedBenefitIds.includes(i.id))
    },
    total () {
      return this.paragon + this.renegade
    },
    paragon () {
      return this.character.currentStats.paragon
    },
    renegade () {
      return this.character.currentStats.renegade
    },
    selectionsAvailable () {
      return this.unselectedBenefits.some(i => this.isAvailable(i))
    },
    selectionsNeedAttention () {
      return this.selectedBenefits.some(i => !this.isAvailable(i))
    }
  },
  created () {
    this.debouncedUpdate = debounce(() => {
      this.updateScores()
    }, 1000)
  },
  methods: {
    isNoLongerAvailable (threshold) {
      const selected = this.selectedBenefits.find(i => i.threshold === threshold)
      return selected ? !this.isAvailable(selected) : false
    },
    isAvailableForThreshold (threshold) {
      return !this.selectedItemForThreshold(threshold) && this.total >= threshold
    },
    itemsForThreshold (threshold) {
      return this.benefits.filter(i => i.threshold === threshold).map((i) => {
        return {
          disabled: !this.isAvailable(i) && !this.selectedBenefitIds.includes(i.id),
          text: i.name,
          value: i.id
        }
      })
    },
    selectedItemForThreshold (threshold) {
      const selected = this.character.selected.find(i => i.path === `reputation/${threshold}`)
      if (selected) {
        return selected.value[0].value
      }
      return null
    },
    isAvailable (benefit) {
      if (this.total < benefit.threshold) {
        return false
      }
      const stats = benefit.prereq.paragon || benefit.prereq.renegade
      if (stats.within) {
        return (this.renegade <= (this.paragon + stats.within) && this.renegade >= (this.paragon - stats.within)) || (this.paragon <= (this.renegade + stats.within) && this.paragon >= (this.renegade - stats.within))
      } else {
        const which = benefit.prereq.paragon ? 'paragon' : 'renegade'
        const other = benefit.prereq.paragon ? 'renegade' : 'paragon'
        return this[which] >= stats.min && this[which] >= this[other]
      }
    },
    changeSelection (value, threshold) {
      const path = `reputation/${threshold}`
      if (value) {
        const selectObj = {
          path,
          value: [{ type: 'benefits', value }]
        }
        const newSelections = JSON.parse(JSON.stringify(this.character.selected))
        const index = newSelections.findIndex(i => i.path === path)
        if (index > -1) {
          newSelections.splice(index, 1, selectObj)
        } else {
          newSelections.push(selectObj)
        }
        this.$store.dispatch('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'selected', value: newSelections })
      } else {
        this.deleteSelections(path)
      }
    },
    showRepDialog () {
      this.paragonSlider = this.paragon
      this.renegadeSlider = this.renegade
      this.repDialog = true
    },
    updateScores () {
      if (this.paragon !== this.paragonSlider) {
        this.$store.dispatch('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'currentStats.paragon', value: this.paragonSlider })
      }
      if (this.renegade !== this.renegadeSlider) {
        this.$store.dispatch('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'currentStats.renegade', value: this.renegadeSlider })
      }
      for (const th of this.thresholds) {
        if (this.total < th) {
          this.deleteSelections(`reputation/${th}`)
        }
      }
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
