<template>
  <v-row no-gutters>
    <v-col cols="12">
      <me-character-sheet-card-title>Senses</me-character-sheet-card-title>
    </v-col>
    <v-col cols="12">
      <v-list dense>
        <v-list-item v-for="passive in csPassiveScores" :key="passive.skill" class="mt-n2">
          <v-list-item-avatar size="17" tile>
            {{ passive.score }}
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ passive.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-col>
    <v-col cols="12">
      <div class="d-flex justify-space-around flex-wrap">
        <template v-for="(sense, index) in csSenses">
          <v-btn
            v-if="sense.distance"
            :key="`sense-${index}`"
            text
            x-small
            plain
            class="px-0"
            @click="showSense(sense)"
          >
            {{ sense.title }} <me-distance :length="sense.distance" abbr class="ml-1" />
          </v-btn>
        </template>
      </div>
    </v-col>
    <me-standard-dialog :title="selectedSense.title" :content="selectedSense.html" :shown="senseDialog" @close="senseDialog = false" />
  </v-row>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  data () {
    return {
      senseDialog: false,
      selectedSense: {
        title: '',
        html: ''
      }
    }
  },
  methods: {
    showSense (sense) {
      this.senseDialog = true
      this.selectedSense = sense
    },
    closeSense () {
      this.senseDialog = false
      this.selectedSense = { title: '', html: '' }
    }
  }
}
</script>
