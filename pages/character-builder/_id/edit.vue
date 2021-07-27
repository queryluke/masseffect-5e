<template>
  <v-container>
    <v-stepper :value="currentStep">
      <v-stepper-header>
        <template v-for="(step, index) in builderSteps">
          <v-stepper-step
            v-if="index !== 0"
            :key="`${index}-step`"
            :complete="step.isComplete"
            :step="index"
            editable
            edit-icon="mdi-check"
            @click="currentStep = index"
          >
            {{ step.name }}
          </v-stepper-step>
          <v-divider v-if="index !== 0 && index < builderSteps.length - 1" :key="`divider-${index}`" />
        </template>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content v-for="(step, index) in builderSteps" :key="`${index}-content`" :step="index">
          <component :is="step.component" />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <v-row>
      <v-col class="d-flex justify-space-around flex-wrap mt-5">
        <v-btn v-if="currentStep > 1" outlined="outlined" width="140" @click="goToPrevStep">
          <v-icon class="mr-2">
            mdi-chevron-left
          </v-icon>
          Back
        </v-btn>
        <v-btn :to="`/character-builder/${cid}`">
          Go to Character Sheet
        </v-btn>
        <v-btn v-if="currentStep < builderSteps.length - 1" color="primary" width="140" @click="goToNextStep">
          Continue
          <v-icon class="ml-2">
            mdi-chevron-right
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
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
    builder () {
      return this.character.builder
    },
    builderSteps () {
      return [
        {},
        {
          name: 'Species',
          component: 'MeCharacterBuilderSpecies',
          isComplete: this.speciesId !== null
        },
        {
          name: 'Class',
          component: 'MeCharacterBuilderClass',
          isComplete: this.characterClasses?.length > 0
        },
        {
          name: 'Ability Scores',
          component: 'MeCharacterBuilderAbilityScores',
          isComplete: this.allAbilityScoresSet
        },
        {
          name: 'Character Description',
          component: 'MeCharacterBuilderCharacterDescription',
          isComplete: this.character.background !== null && this.character.name !== null
        }
      ]
    },
    currentStep: {
      get () {
        return this.builder.currentStep
      },
      set (value) {
        return this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'builder.currentStep', value })
      }
    }
  },
  methods: {
    goToNextStep () {
      this.currentStep = Math.min(this.builderSteps.length, this.currentStep + 1)
    },
    goToPrevStep () {
      this.currentStep = Math.max(this.currentStep - 1, 0)
    }
  }
}
</script>
