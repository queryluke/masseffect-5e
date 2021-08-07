<template>
  <div>
    <v-row justify="space-between">
      <v-col cols="9" md="12">
        <me-character-sheet-name-img-settings />
      </v-col>
      <v-col cols="3" v-if="$vuetify.breakpoint.smAndDown">
        <v-card elevation="0" outlined @click="healthDialog = true">
          <me-character-sheet-health-text />
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="healthDialog" fullscreen>
      <v-card>
        <v-toolbar :color="csBgColor('damage')" :dark="!dark" :light="dark" flat>
          <v-toolbar-title>
            Hit Points
          </v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn icon @click="healthDialog = false">
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="mt-5">
          <me-character-sheet-health />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  data () {
    return {
      healthDialog: false
    }
  }
}
</script>
