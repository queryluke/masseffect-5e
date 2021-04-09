<template>
  <div>
    <v-row>
      <v-col>
        <me-character-sheet-top />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <me-character-sheet-panel />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MeCharacterSheetPanel from './MeCharacterSheetPanel.vue'
import MeCharacterSheetTop from './MeCharacterSheetTop.vue'
export default {
  components: { MeCharacterSheetTop, MeCharacterSheetPanel }
}
</script>
