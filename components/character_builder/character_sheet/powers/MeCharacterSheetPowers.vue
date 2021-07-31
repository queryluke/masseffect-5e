<template>
  <div>
    <me-character-sheet-card-title>
      Powers
    </me-character-sheet-card-title>
    <div class="d-flex justify-end">
      <v-btn small color="primary" @click="managerDialog = true">
        Manage
      </v-btn>
    </div>
    <v-dialog v-model="managerDialog" fullscreen>
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>
            Manage Powers
          </v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn icon @click="managerDialog = false">
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="mt-5">
          <me-character-sheet-powers-manager />
        </div>
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
      managerDialog: false
    }
  }
}
</script>
