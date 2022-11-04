<template>
  <v-text-field
    v-model="costModel"
    label="Cost"
    hide-details
    filled
    dense
  />
</template>

<script>
export default {
  name: 'MeHomebrewInputCost',
  props: {
    cost: {
      type: Number,
      default: 0
    }
  },
  computed: {
    costModel: {
      get () {
        return this.$options.filters.groupDigits(this.cost, ',')
      },
      set (value) {
        const parsed = parseInt(value.replaceAll(',', ''))
        if (parsed) {
          this.$emit('update', parsed)
        }
      }
    }
  }
}
</script>
