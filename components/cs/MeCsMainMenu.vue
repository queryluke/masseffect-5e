<template>
  <div class="mx-2">
    <v-row justify="space-around" no-gutters>
      <v-col cols="8" sm="9" md="12">
        <me-cs-nis />
      </v-col>
      <v-col v-if="$vuetify.breakpoint.smAndDown" cols="4" sm="3">
        <v-card elevation="0" outlined @click="healthDialog = true">
          <me-cs-health-text />
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
          <me-cs-health />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import { CsColors } from '~/mixins/character/csColors'

export default {
  mixins: [CsColors],
  data () {
    return {
      healthDialog: false
    }
  }
}
</script>
