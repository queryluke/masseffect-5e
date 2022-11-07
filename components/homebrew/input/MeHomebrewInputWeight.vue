<template>
  <v-text-field
    v-model="weightInput"
    filled
    dense
    label="Weight"
    :append-icon="icon"
  />
</template>

<script>
export default {
  name: 'MeHomebrewInputWeight',
  props: {
    weight: {
      type: Number,
      default: 0
    }
  },
  computed: {
    imperial () {
      return this.$store.getters['user/imperial']
    },
    icon () {
      return this.imperial ? 'mdi-weight-pound' : 'mdi-weight-kilogram'
    },
    weightInput: {
      get () {
        const weight = parseInt(this.weight, 10) || 0
        return this.imperial ? weight : Math.round(parseInt(weight, 10) / 2.204)
      },
      set (value) {
        const weight = parseInt(value) || 0
        const converted = this.imperial ? weight : Math.round(parseInt(weight, 10) * 2.204)
        this.$emit('update', converted)
      }
    }
  }
}
</script>
