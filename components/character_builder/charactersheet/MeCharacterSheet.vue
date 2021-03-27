<template>
  <div>
    <v-row>
      <v-col>
        <me-character-builder-avatar />
      </v-col>
      <v-col>
        <div>
          <me-character-sheet-character-name :character="character"/>
          <me-character-builder-level-tracker :level="character.level"/>
        </div>
      </v-col>
      <v-col>
        <div>
          <span></span>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MeCharacterBuilderLevelTracker from '../classes/MeCharacterBuilderLevelTracker.vue'
import MeCharacterBuilderAvatar from '../MeCharacterBuilderAvatar.vue'
import MeCharacterSheetCharacterName from './MeCharacterSheetCharacterName.vue'
export default {
  components: { MeCharacterSheetCharacterName, MeCharacterBuilderLevelTracker, MeCharacterBuilderAvatar },
  computed: {
    character () {
      const char = this.$store.getters['cb/characters'][this.$route.query.cid] || {}
      return char.character
    }
  }
}
</script>
