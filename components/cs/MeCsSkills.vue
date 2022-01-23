<template>
  <div>
    <me-cs-card-title>
      Skills
    </me-cs-card-title>
    <v-row no-gutters>
      <v-col cols="12" md="4">
        <me-cs-skill-list :items="csSkills.slice(0,6)" />
      </v-col>
      <v-col cols="12" md="4">
        <me-cs-skill-list :items="csSkills.slice(6,12)" />
      </v-col>
      <v-col cols="12" md="4">
        <me-cs-skill-list :items="csSkills.slice(12)" />
      </v-col>
    </v-row>
    <v-row v-if="allSkillAdvantageNotes.length || allSkillDisadvantageNotes.length" no-gutters>
      <v-col v-if="allSkillAdvantageNotes.length" cols="12" md="6" class="d-flex align-center pa-2">
        <me-cs-ad-icon type="a" small />
        <span class="text-caption pl-1">
          {{ allSkillAdvantageNotes.join(', ') }}
        </span>
      </v-col>
      <v-col v-if="allSkillDisadvantageNotes.length" cols="12" md="6" class="d-flex align-center pa-2">
        <me-cs-ad-icon type="d" small />
        <span class="text-caption pl-1">
          {{ allSkillDisadvantageNotes.join(', ') }}
        </span>
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
