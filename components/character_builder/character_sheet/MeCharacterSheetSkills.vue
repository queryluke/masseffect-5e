<template>
  <div>
    <me-character-sheet-card-title>
      Skills
    </me-character-sheet-card-title>
    <v-row no-gutters>
      <v-col cols="12" md="4">
        <me-character-sheet-skill-list :cs-skills="skills.slice(0,6)" />
      </v-col>
      <v-col cols="12" md="4">
        <me-character-sheet-skill-list :cs-skills="skills.slice(6,12)" />
      </v-col>
      <v-col cols="12" md="4">
        <me-character-sheet-skill-list :cs-skills="skills.slice(12)" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers]
}
</script>
