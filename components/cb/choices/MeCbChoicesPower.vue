<template>
  <me-cb-choices-v-select
    :items="items"
    :label="label"
    :total-selections="selections"
    :value="currentValue.map(i => i.value)"
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
    label () {
      return this.mechanic.label || (this.selections > 1 ? 'Select powers' : 'Select power')
    },
    limits () {
      return Object.entries(this.mechanic.limit || {})
    },
    items () {
      return this.powers.filter(this.matchingPowers).map((i) => {
        return {
          value: i.id,
          text: i.name
        }
      })
    },
    selections () {
      return this.mechanic.selections || 1
    },
    appended () {
      return {
        type: 'power',
        resource: this.mechanic.resource
      }
    }
  },
  methods: {
    matchingPowers (item) {
      return this.limits.every(([attr, value]) => {
        const comparitor = value || []
        return comparitor.includes(item[attr])
      })
    },
    upsert (value) {
      this.$emit('upsert', value.map((i) => {
        return { value: i, ...this.appended }
      }))
    }
  }
}
</script>
