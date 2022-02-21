<template>
  <v-container style="max-width: 1200px">
    <div class="text-center">
      <me-tpg s="h3">
        You're character still need some key selections!
      </me-tpg>
      <v-list>
        <v-list-item :color="character.species ? 'primary' : 'warning'" nuxt @click="editCharacter(0)">
          <v-list-item-avatar>
            <v-icon>
              {{ character.species ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline' }}
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            {{ character.species ? 'Species selected' : 'Choose your species' }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item :color="character.classes.length > 0 ? 'primary' : 'warning'" nuxt @click="editCharacter(1)">
          <v-list-item-avatar>
            <v-icon>
              {{ character.classes.length > 0 ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline' }}
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            {{ character.classes.length > 0 ? 'Starting class selections' : 'Select a starting class' }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item :color="allAbilityScoresSet ? 'primary' : 'warning'" nuxt @click="editCharacter(2)">
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
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCsNotReady',
  computed: {
    ...mapGetters(['character', 'id']),
    allAbilityScoresSet () {
      return Object.entries(this.character.abilityScores).every(i => i[1].value)
    }
  },
  methods: {
    editCharacter (tab) {
      this.$store.commit('tabbedPage/SET_ACTIVE_TAB', tab)
      this.$router.push(`/characters/builder/?id=${this.id}`)
    }
  }
}
</script>
