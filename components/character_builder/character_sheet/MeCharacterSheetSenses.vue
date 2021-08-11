<template>
  <v-row no-gutters>
    <v-col cols="12">
      <me-character-sheet-card-title>Senses</me-character-sheet-card-title>
    </v-col>
    <v-col cols="12">
      <v-list dense>
        <v-list-item v-for="passive in passives" :key="passive.skill" class="mt-n2">
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
    </v-col>
    <v-col cols="12">
      <v-row no-gutters class="px-5">
        <v-col v-for="(sense, index) in csSenses" :key="`sense-${index}`" cols="6" class="text-caption">
          <me-html :content="senseText(sense[0], sense[1])" inline />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
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
  },
  computed: {
    csSenses () {
      const settingSenses = { ...this.character.settings.senses }
      const selections = this.selections.filter(i => i.type === 'sense')
      for (const selection of selections) {
        if (!settingSenses[selection.has.id] || selection.has.distance > settingSenses[selection.has.id]) {
          settingSenses[selection.has.id] = selection.has.distance
        }
      }
      return Object.entries(settingSenses).filter(i => i[1])
    }
  },
  methods: {
    senseText (sense, distance) {
      return `${this.$t(`senses.${sense}_title`)} <me-distance length="${distance}" abbr />`
    }
  }
}
</script>
