<template>
  <v-list dense>
    <v-list-item v-for="skill in items" :key="skill.id" class="mt-n2">
      <v-list-item-avatar :color="skill.proficient && !skill.expertise ? `primary` : 'transparent'" size="12">
        <v-icon v-if="skill.expertise" size="16" color="orange">
          mdi-star
        </v-icon>
      </v-list-item-avatar>
      <v-list-item-content class="ml-n2">
        <v-list-item-title>
          {{ skill.name }}
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action class="d-flex justify-end">
        <v-list-item-action-text class="text-body-2 d-flex align-center">
          <me-cs-ad-icon v-if="skill.advantage" small :text="skill.advantageNotes.length > 0 ? skill.advantageNotes.join(', ') : false" />
          <me-cs-ad-icon v-if="skill.disadvantage" small :text="skill.disadvantageNotes.length > 0 ? skill.disadvantageNotes.join(', ') : false" />
          <span class="pl-1">
            {{ skill.modText }}
          </span>
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
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>
