<template>
  <v-text-field
    v-model="textRoll"
    label="Specify a Custom Roll"
    prepend-icon="mdi-dice-multiple"
    clearable
    hint="For example: 1d20 - 1d4 + 2"
    persistent-hint
  />
</template>

<script>
export default {
  name: 'MeCsRollCustomText',
  computed: {
    textRoll: {
      get () {
        return this.$store.getters['character/roller/customTextRoll']
      },
      set (value) {
        return this.$store.commit('character/roller/SET_CUSTOM_TEXT_ROLL', value)
      }
    }
  }
}
</script>
