<template>
  <div>
    <me-character-sheet-card-title>
      Saving Throws
    </me-character-sheet-card-title>
    <v-row no-gutters>
      <v-col cols="6">
        <v-list dense>
          <v-list-item v-for="ability in ['str', 'dex', 'con']" :key="ability">
            <v-list-item-avatar :color="proficient(ability) ? `blue-grey darken-3` : 'transparent'" size="10" />
            <v-list-item-content>
              <v-list-item-title>
                {{ $t(`abilities.${ability}.abbr`) }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text>
                {{ modText(ability) }}
              </v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="6">
        <v-list dense>
          <v-list-item v-for="ability in ['int', 'wis', 'cha']" :key="ability">
            <v-list-item-avatar :color="proficient(ability) ? `blue-grey darken-3` : 'transparent'" size="10" />
            <v-list-item-content>
              <v-list-item-title>
                {{ $t(`abilities.${ability}.abbr`) }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text>
                {{ modText(ability) }}
              </v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  methods: {
    proficient (ability) {
      return this.proficiencies.savingThrow.includes(ability)
    },
    modText (ability) {
      let mod = this.absMod(ability)
      if (this.proficient(ability)) {
        mod += this.profBonus
      }
      return mod >= 0 ? `+${mod}` : `-${mod * -1}`
    }
  }
}
</script>
