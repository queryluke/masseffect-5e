<template>
  <div class="mx-2">
    <v-row justify="space-around" no-gutters>
      <v-col cols="8" sm="6" md="12">
        <me-cs-nis />
      </v-col>
      <v-col v-if="$vuetify.breakpoint.smOnly" cols="3" class="d-flex flex-column justify-space-around align-end pr-4">
        <me-cs-rest-btn type="short" :props="{ outlined: true, 'x-small': true, width: '80px' }" />
        <me-cs-rest-btn type="long" :props="{ outlined: true, 'x-small': true, width: '80px' }" />
      </v-col>
      <v-col v-if="$vuetify.breakpoint.smAndDown" cols="4" sm="3">
        <v-card elevation="0" outlined @click="healthDialog = true">
          <me-cs-health-dead-stable-overlay small />
          <me-cs-health-text />
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="healthDialog" :fullscreen="$vuetify.breakpoint.xsOnly" :transition="$vuetify.breakpoint.xsOnly ? 'dialog-bottom-transition' : 'dialog-transition'" scrollable>
      <v-card>
        <v-card-title class="pa-0">
          <v-toolbar flat>
            <v-toolbar-title>
              Hit Points
            </v-toolbar-title>
          </v-toolbar>
        </v-card-title>
        <v-card-text class="mt-5">
          <me-cs-health />
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="healthDialog = false">
            Close
          </v-btn>
        </v-card-actions>
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
