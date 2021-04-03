<template>
  <div class="d-flex justify-center">
    <v-row>
      <v-col md="2">
        <me-character-builder-avatar />
      </v-col>
      <v-col md="4">
        <div>
          <me-character-sheet-character-name
            :character="character"
          />
          <me-character-builder-level-tracker :level="character.level"/>
        </div>
      </v-col>
      <v-col md="6">
        <div>
          <me-character-sheet-health />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MeCharacterBuilderLevelTracker from '../classes/MeCharacterBuilderLevelTracker.vue'
import MeCharacterBuilderAvatar from '../MeCharacterBuilderAvatar.vue'
import MeCharacterSheetCharacterName from './MeCharacterSheetCharacterName.vue'
import MeCharacterSheetHealth from './MeCharacterSheetHealth.vue'
export default {
  components: { MeCharacterSheetCharacterName, MeCharacterBuilderLevelTracker, MeCharacterBuilderAvatar, MeCharacterSheetHealth },
  computed: {
    character () {
      const char = this.$store.getters['cb/characters'][this.$route.query.cid] || {}
      return char.character
    }
  }
}
</script>
