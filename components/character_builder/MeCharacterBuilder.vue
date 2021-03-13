<script>
export default {
  computed: {
    character () {
      return this.$store.getters['user/character']
    },
    species () {
      return this.$store.getters.getData('species')
    },
    classes () {
      return this.$store.getters.getData('classes')
    },
    subclasses () {
      return this.$store.getters.getData('subclasses').filter(i => this.character.class ? i.class === this.character.class.id : false)
    },
    backgrounds () {
      return this.$store.getters.getData('backgrounds')
    },
    steps () {
      return [{},
        {
          name: 'Species',
          component: 'MeCharacterBuilderSpeciesSelect',
          props: {
            items: this.species,
            label: 'Species',
            attr: 'species'
          },
          isComplete: this.character.species.name !== ''
        },
        {
          name: 'Class',
          component: 'MeCharacterBuilderSelect',
          props: {
            items: this.classes,
            label: 'Class',
            attr: 'class'
          },
          isComplete: this.character.classes.length > 0
        } /*,
        {
          name: 'Ability Scores',
          component: 'CharacterBuilderAbilityScores',
          props: {
            abilityScoreMethod: this.character.settings.abilityScoreMethod,
            currentScores: this.character.baseAbilityScores
          },
          isComplete: false
          // isComplete: every(this.character.baseAbilityScores, score => score > 0)
        },
        {
          name: 'Description',
          component: 'CharacterBuilderDescription',
          props: {
            currentBackground: this.character.background,
            backgrounds: this.backgrounds,
            name: this.character.name,
            image: this.character.image,
            characteristics: this.character.characteristics
          },
          isComplete: this.character.name !== '' &&
            this.character.background.name !== ''
        },
        {
          name: 'Equipment',
          component: 'CharacterBuilderEquipment',
          props: {
            rawCharacter: this.character
          },
          isComplete: this.character.equipment.length > 0
        } */
      ]
    },

    numSteps () {
      return this.steps.length - 1
    },

    currentStep () {
      return 0
    }
  },
  methods: {
    nextStep () {
      this.$emit('goToStep', Math.min(this.numSteps, this.currentStep + 1))
    },

    prevStep () {
      this.$emit('goToStep', Math.max(this.currentStep - 1, 0))
    }
  }
}
</script>

<template>
  <v-stepper :value="currentStep" @change="newStep =&gt; $emit('goToStep', newStep)">
    <v-stepper-header>
      <template v-for="n in numSteps">
        <v-stepper-step
          :key="`${n}-step`"
          :complete="steps[n].isComplete"
          :step="n"
          editable="editable"
          edit-icon="fa-check"
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
          @updateCharacter="newCharacter =&gt; $emit('updateCharacter', newCharacter)"
          @deleteCharacterProperty="payload =&gt; $emit('deleteCharacterProperty', payload)"
          @replaceCharacterProperty="payload =&gt; $emit('replaceCharacterProperty', payload)"
          @replaceCharacterProperties="payload =&gt; $emit('replaceCharacterProperties', payload)"
        />
        <div class="d-flex justify-space-around flex-wrap mt-5">
          <v-btn v-if="currentStep &gt; 0" outlined="outlined" width="140" @click="prevStep">
            <v-icon class="mr-2 fa-cheveron-left" />
            Back
          </v-btn>
          <!--CharacterBuilderViewSheet(v-bind="{ characterValidation }", @click="$emit('viewSheet')").d-none.d-sm-flex-->
          <v-btn v-if="currentStep &lt; numSteps" color="primary" width="140" @click="nextStep">
            Continue
            <v-icon class="ml-2 fa-chevron-right" />
          </v-btn>
        </div>
        <!--CharacterBuilderViewSheet(v-bind="{ characterValidation }", @click="$emit('viewSheet')").d-flex.d-sm-none.justify-center.mt-5-->
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

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
