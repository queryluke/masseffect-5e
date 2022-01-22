<template>
  <div>
    <me-cb-choices-v-select
      :items="items"
      label="Choose a feat"
      :total-selections="1"
      :value="currentValue.map(i => i.value)"
      :acquired="alreadyAcquired"
      @change="upsert"
    />
    <div v-if="feat">
      <me-html :content="feat.html" />
      <v-card v-for="(mechanic, index) of (feat.mechanics || []).filter(i => i.options)" :key="index" outlined class="mb-2">
        <div class="pa-2">
          <me-cb-aspect-selectable
            :mechanic="mechanic"
            :path="id"
          />
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'
export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    id: {
      type: String,
      required: true
    },
    mechanic: {
      type: Object,
      required: true
    },
    currentValue: {
      type: Array,
      required: true
    }
  },
  computed: {
    type () {
      return this.mechanic.profType
    },
    items () {
      // TODO: add prereqs
      return this.feats.map((i) => {
        return {
          text: i.name,
          value: i.id
        }
      })
    },
    feat () {
      console.log(this.currentValue)
      if (this.currentValue[0]?.value) {
        return this.feats.find(i => this.currentValue[0].value === i.id)
      }
      return false
    },
    appended () {
      return {
        type: 'feat'
      }
    }
  },
  methods: {
    alreadyAcquired (value) {
      return this.selectedFeats.includes(value)
    },
    upsert (value) {
      this.deleteSelections(this.id)
      this.$emit('upsert', value.map((i) => {
        return { value: i, ...this.appended }
      }))
    }
  }
}
</script>
