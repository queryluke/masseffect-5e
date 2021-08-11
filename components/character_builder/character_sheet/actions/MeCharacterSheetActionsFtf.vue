<template>
  <v-card outlined class="pl-2 pt-1">
    <v-row align="center" :no-gutters="$vuetify.breakpoint.smAndDown">
      <v-col cols="4" md="3">
        <div class="text-truncate d-inline-block mt-1">
          {{ itemData.name }}
        </div>
      </v-col>
      <v-col cols="7">
        <me-character-sheet-use-tracker v-if="uses" :used="timesUsed" :uses="uses" @increment="timesUsed++" @decrement="timesUsed--" />
      </v-col>
      <v-col cols="1">
        <v-icon size="18" class="mt-n1" @click="infoDialog = true">
          mdi-information-outline
        </v-icon>
      </v-col>
    </v-row>
    <me-standard-dialog :title="itemData.name" :shown="infoDialog" @close="infoDialog = false">
      <me-html :content="itemData.html" />
    </me-standard-dialog>
  </v-card>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      infoDialog: false
    }
  },
  computed: {
    uses () {
      return this.item.has.uses
    },
    itemData () {
      return this.$store.getters.getItem(this.item.subType, this.item.has.id)
    },
    timesUsed: {
      get () {
        return this.character.currentStats.featuresTimesUsed[this.item.has.id] || 0
      },
      set (value) {
        const setValue = value > this.uses ? this.uses : value < 0 ? 0 : value
        return this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: `currentStats.featuresTimesUsed.${this.item.has.id}`, value: setValue })
      }
    }
  }
}
</script>
