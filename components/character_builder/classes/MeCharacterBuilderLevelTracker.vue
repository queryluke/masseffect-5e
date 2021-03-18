<template>
  <v-row class="text-center">
      <v-col>
        Current Level: {{level || "None"}}
      </v-col>
      <v-col>
        Current Experience: {{xp ? xp : level >= 20 ? "MAX" : 0}}{{nextLevelInfo ? ' / '+nextLevelInfo.xp : ''}}
      </v-col>
    </v-row>
</template>

<script>
export default {
  props: {
    level: {
      type: Number
    },
    cProg: {
      type: Array,
      required: true
    }
  },
  computed: {
    xp: {
      get () {
        return this.$store.getters['user/character'].xp
      }
    },
    currentLevelInfo () {
      return this.cProg[this.level - 1]
    },
    nextLevelInfo () {
      return this.cProg[this.level]
    },
    showLevelUpBtn () {
      if (!this.nextLevelInfo) {
        return false
      }
      return this.xp >= this.nextLevelInfo.xp
    }
  }
}
</script>
