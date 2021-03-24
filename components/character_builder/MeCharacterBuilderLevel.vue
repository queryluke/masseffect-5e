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
        return this.$store.getters['cb/character'].level
      },
      set (value) {
        const prog = this.cProg.find(i => i.level === parseInt(value))
        if (prog) {
          this.$store.commit('user/UPDATE_CHARACTER', { attr: 'proficiencyBonus', value: prog.bonus })
        }
        return this.$store.commit('cb/UPDATE_CHARACTER', { attr: 'level', value })
      }
    },
    cProg () {
      return this.$store.getters.getData('character-progression')
    }
  }
}
</script>
