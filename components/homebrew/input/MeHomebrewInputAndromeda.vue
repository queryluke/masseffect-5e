<template>
  <v-switch
    v-model="andromedaInput"
    label="Andromeda?"
  />
</template>

<script>
export default {
  name: 'MeHomebrewInputAndromeda',
  props: {
    andromeda: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    andromedaInput: {
      get () {
        return this.andromeda
      },
      set (value) {
        this.$emit('update', value)
      }
    }
  }
}
</script>
