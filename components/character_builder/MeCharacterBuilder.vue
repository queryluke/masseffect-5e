<template>
  <v-stepper :value="currentStep" @change="newStep => $emit('goToStep', newStep)">
    <v-stepper-header>
      <template v-for="n in numSteps">
        <v-stepper-step
          :key="`${n}-step`"
          :complete="steps[n].isComplete"
          :step="n"
          editable="editable"
          edit-icon="fa-check"
          @click="currentStep = n"
        >
          {{ steps[n].name }}
        </v-stepper-step>
        <v-divider v-if="n !== numSteps" :key="n" :class="$style.divider" />
      </template>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content v-for="n in numSteps" :key="`${n}-content`" :step="n">
        <component
          :is="steps[n].component"
          v-bind="steps[n].props"
          @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)"
        />
        <div class="d-flex justify-space-around flex-wrap mt-5">
          <v-btn v-if="currentStep > 1" outlined="outlined" width="140" @click="prevStep">
            <v-icon class="mr-2 fa-cheveron-left" />
            Back
          </v-btn>
          <!--CharacterBuilderViewSheet(v-bind="{ characterValidation }", @click="$emit('viewSheet')").d-none.d-sm-flex-->
          <v-btn v-if="currentStep < numSteps" color="primary" width="140" @click="nextStep">
            Continue
            <v-icon class="ml-2 fa-chevron-right" />
          </v-btn>
        </div>
        <!--CharacterBuilderViewSheet(v-bind="{ characterValidation }", @click="$emit('viewSheet')").d-flex.d-sm-none.justify-center.mt-5-->
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
export default {
  computed: {
    currentStep: {
      get () {
        return this.$store.getters['user/character'].builder.currentStep
      },
      set (value) {
        console.log(value)
        return this.$store.commit('user/UPDATE_CHARACTER', { attr: 'builder.currentStep', value })
      }
    },
    character () {
      return this.$store.getters['user/character']
    },
    species () {
      return this.$store.getters.getData('species')
    },
    classes () {
      return this.$store.getters.getData('classes')
    },
    abilityScores () {
      return this.character.baseAbilityScores
    },
    backgrounds () {
      return this.$store.getters.getData('backgrounds')
    },
    steps () {
      return [
        {},
        {
          name: 'Species',
          component: 'MeCharacterBuilderSpecies',
          props: {
            items: this.species,
            label: 'Species',
            attr: 'species'
          },
          isComplete: this.character.species.name !== ''
        },
        {
          name: 'Class',
          component: 'MeCharacterBuilderClass',
          props: {
            items: this.classes,
            label: 'Class',
            attr: 'class'
          },
          isComplete: this.character.classes.length > 0
        },
        {
          name: 'Ability Scores',
          component: 'MeCharacterBuilderAbilityScores',
          props: {
            scores: this.abilityScores,
            label: 'Ability Scores'
          },
          isComplete: this.checkAbs()
        },
        {
          name: 'Character Description',
          component: 'MeCharacterBuilderCharacterDescription',
          isComplete: this.character.name !== ''
        }
      ]
    },

    numSteps () {
      return this.steps.length - 1
    }
  },
  methods: {
    nextStep () {
      this.currentStep = Math.min(this.numSteps, this.currentStep + 1)
    },

    prevStep () {
      this.currentStep = Math.max(this.currentStep - 1, 1)
    },

    checkAbs () {
      for (const char in this.character.baseAbilityScores) {
        if (this.character.baseAbilityScores[char] === 0) {
          return false
        }
      }
      return true
    }
  }
}
</script>

<style module lang="scss">
  .divider {
    visibility: visible;
  }

  .page {
    width: 1000px;
  }
</style>

<style lang="scss">
  .v-stepper .v-stepper__step__step .v-icon {
    font-size: 12px;
  }
</style>
