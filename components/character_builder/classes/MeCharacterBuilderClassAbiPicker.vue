<template>
  <v-row>
    <v-col sm="4">
      <v-select
        v-model="typeSelection"
        :items="improvementOptions"
        item-value="type"
        label="Choose an option..."
      />
    </v-col>
    <v-col v-if="featSelected">
      <v-autocomplete
        :items="feats"
        :value="featureSelection.value"
        label="Chosen Feat"
        item-text="name"
        item-value="id"
        @change="updateSelection"
      />
    </v-col>
    <template v-if="abiSelected">
      <v-col v-for="abiSelectionIndex in [0, 1]" :key="abiSelectionIndex" cols="4">
        <v-autocomplete
          class="flex"
          :items="abiArray"
          label="Chosen Ability Score Improvement"
          :value="featureSelection.value[abiSelectionIndex]"
          @change="updateSelection($event, abiSelectionIndex)"
        />
      </v-col>
    </template>
  </v-row>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  // TODO: Enforce feat prerequisites
  // TODO: Feat previews
  mixins: [CharacterBuilderHelpers],
  props: {
    classIndex: {
      type: Number,
      required: true
    },
    featureSelectionId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      improvementOptions: [
        { text: 'Ability Score Improvement', type: 'abi' },
        { text: 'Feat', type: 'feat' }
      ]
    }
  },
  computed: {
    featSelected () {
      return this.typeSelection && this.typeSelection === 'feat'
    },
    abiSelected () {
      return this.typeSelection && this.typeSelection === 'abi'
    },
    abiArray () {
      return ['str', 'dex', 'con', 'wis', 'int', 'cha'].map((i) => {
        return {
          text: this.$t(`abilities.${i}.title`),
          value: i
        }
      })
    },
    typeSelection: {
      get () {
        return this.featureSelection?.type || null
      },
      set (value) {
        this.featureSelection = { value: value === 'abi' ? [null, null] : null, type: value }
      }
    }
  },
  methods: {
    updateSelection (value, index) {
      let newValue = value
      if (this.typeSelection === 'abi') {
        if (index === 0) {
          newValue = [value, this.featureSelection[1]]
        } else {
          newValue = [this.featureSelection[0], value]
        }
      }
      this.featureSelection = { ...this.featureSelection, value: newValue }
    }
  }
}
</script>
