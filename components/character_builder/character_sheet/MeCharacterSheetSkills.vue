<template>
  <div>
    <me-character-sheet-card-title>
      Skills
    </me-character-sheet-card-title>
    <v-list dense>
      <v-list-item v-for="skill in skills" :key="skill.id">
        <v-list-item-avatar :color="csSkillExpertise(skill.id) ? 'orange' : csSkillProficient(skill.id) ? `blue-grey` : 'transparent'" size="10" />
        <v-list-item-content>
          <v-list-item-title>
            {{ skill.name }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text>
            {{ csSkillModText(skill.id) }}
          </v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers]
}
</script>
