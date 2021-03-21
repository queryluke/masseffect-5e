<template>
  <v-text-field
    v-model="xp"
    label="XP"
  />
</template>

<script>
export default {
  computed: {
    xp: {
      get () {
        return this.$store.getters['user/character'].xp
      },
      set (value) {
        if (value && !isNaN(value)) {
          const val = parseInt(value)
          let level = null
          for (const prog of this.cProg) {
            if (prog.level < 20) {
              if (prog.xp <= val && this.cProg.find(i => i.level === prog.level + 1).xp > val) {
                level = prog.level
              }
            }
          }
          if (!level && val && val > 0) {
            level = 20
          }
          if (level) {
            this.$store.commit('user/UPDATE_CHARACTER', { attr: 'level', value: level })
          }
          this.$store.commit('user/UPDATE_CHARACTER', { attr: 'xp', value: val })
        }
      }
    },
    cProg () {
      return this.$store.getters.getData('character-progression')
    }
  }
}
</script>
