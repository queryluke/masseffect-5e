<template>
  <v-list dense>
    <v-list-item v-for="skill in csSkills" :key="skill.id" class="mt-n2">
      <v-list-item-avatar :color="csSkillProficient(skill.id) && !csSkillExpertise(skill.id) ? `primary` : 'transparent'" size="12">
        <v-icon v-if="csSkillExpertise(skill.id)" size="16" color="orange">
          mdi-star
        </v-icon>
      </v-list-item-avatar>
      <v-list-item-content class="ml-n2">
        <v-list-item-title>
          {{ skill.name }}
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-list-item-action-text class="text-body-2">
          {{ csSkillModText(skill.id) }}
        </v-list-item-action-text>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    csSkills: {
      type: Array,
      default: () => []
    }
  }
}
</script>
