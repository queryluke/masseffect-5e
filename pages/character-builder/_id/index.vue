<template>
  <v-container>
    <div v-if="!characterReady" class="text-center">
      <div class="text-h4">
        You're character still need some key selections!
      </div>
      <v-list>
        <v-list-item :color="speciesId ? 'primary' : 'warning'" :to="`/character-builder/${cid}/edit`" nuxt>
          <v-list-item-avatar>
            <v-icon>
              {{ speciesId ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline' }}
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            {{ speciesId ? 'Species selected' : 'Choose your species' }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item :color="characterClasses.length > 0 ? 'primary' : 'warning'" :to="`/character-builder/${cid}/edit`" nuxt>
          <v-list-item-avatar>
            <v-icon>
              {{ characterClasses.length > 0 ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline' }}
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            {{ characterClasses.length > 0 ? 'Starting class selections' : 'Select a starting class' }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item :color="allAbilityScoresSet ? 'primary' : 'warning'" :to="`/character-builder/${cid}/edit`" nuxt>
          <v-list-item-avatar>
            <v-icon>
              {{ allAbilityScoresSet ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline' }}
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            {{ allAbilityScoresSet ? 'Ability scores set' : 'Set your ability scores' }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
    <me-character-sheet v-else />
  </v-container>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  async asyncData ({ store }) {
    store.commit('pageTitle', 'Character Builder')
    await store.dispatch('cb/FETCH_CB_DATA')
  },
  computed: {
    characterReady () {
      return this.speciesId && this.characterClasses.length > 0 && this.allAbilityScoresSet
    }
  }
}
</script>
