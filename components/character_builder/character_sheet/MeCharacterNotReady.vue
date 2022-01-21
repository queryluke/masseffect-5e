<template>
  <v-container style="max-width: 1200px">
    <div class="text-center">
      <me-tpg s="h3">
        You're character still need some key selections!
      </me-tpg>
      <v-list>
        <v-list-item :color="speciesId ? 'primary' : 'warning'" :to="`/characters/builder?id=${cid}`" nuxt>
          <v-list-item-avatar>
            <v-icon>
              {{ speciesId ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline' }}
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            {{ speciesId ? 'Species selected' : 'Choose your species' }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item :color="characterClasses.length > 0 ? 'primary' : 'warning'" :to="`/characters/builder?id=${cid}`" nuxt>
          <v-list-item-avatar>
            <v-icon>
              {{ characterClasses.length > 0 ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline' }}
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            {{ characterClasses.length > 0 ? 'Starting class selections' : 'Select a starting class' }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item :color="allAbilityScoresSet ? 'primary' : 'warning'" :to="`/characters/builder?id=${cid}`" nuxt>
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
  </v-container>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers]
}
</script>
