<template>
  <div>
    <me-character-sheet-card-title>Senses</me-character-sheet-card-title>
    <v-list dense>
      <v-list-item v-for="passive in passives" :key="passive.skill">
        <v-list-item-avatar size="17" tile>
          {{ csPassiveScore(passive.skill) }}
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ passive.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  data () {
    return {
      passives: [
        { skill: 'perception', title: 'Passive Perception (Wisdom)' },
        { skill: 'investigation', title: 'Passive Investigation (Intelligence)' },
        { skill: 'insight', title: 'Passive Insight (Wisdom)' }
      ]
    }
  }
}
</script>
