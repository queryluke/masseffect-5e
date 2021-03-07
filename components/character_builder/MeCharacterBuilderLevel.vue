<template>
  <v-text-field
    v-model="level"
    label="Level"
    type="number"
    :min="1"
    :max="20"
    :rules="[v => (v <= 20 && v >= 1) || 'Level must be between 1-20']"
  />
</template>

<script>
export default {
  computed: {
    level: {
      get () {
        return this.$store.getters['user/character'].level
      },
      set (value) {
        return this.$store.commit('user/UPDATE_CHARACTER', { attr: 'level', value })
      }
    }
  }
}
</script>
