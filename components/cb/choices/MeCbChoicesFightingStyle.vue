<template>
  <me-cb-choices-v-select
    :items="items"
    label="Choose Fighting Style..."
    :total-selections="1"
    :value="currentValue.map(i => i.value)"
    :acquired="alreadyAcquired"
    @change="upsert"
  />
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'
export default {
  mixins: [CharacterBuilderHelpers],
  props: {
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
    items () {
      const fs = this.fightingStyles.map((i) => {
        return {
          value: i.id,
          text: i.name
        }
      })
      if (this.mechanic.limit) {
        return fs.filter(i => this.mechanic.limit.includes(i.value))
      }
      return fs
    },
    selections () {
      return this.mechanic.selections || 1
    },
    appended () {
      return {
        type: 'fighting-style'
      }
    }
  },
  methods: {
    alreadyAcquired (value) {
      return this.selectedFightingStyles.includes(value)
    },
    upsert (value) {
      this.$emit('upsert', value.map((i) => {
        return { value: i, ...this.appended }
      }))
    }
  }
}
</script>
