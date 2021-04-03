<template>
  <div
    v-if="level"
    class="d-flex justify-center xpBar mb-2"
  >
    <v-btn>
      <v-chip
        small
        class="mr-2 ml-0"
      >
        <h3>{{level}}</h3>
      </v-chip>
      <v-progress-linear
        class="ma-0 text-center"
        :value="xp"
        height="20"
        rounded
        style="min-width: 150px;"
      >
        {{xp}} / {{nextLevelInfo.xp}}
      </v-progress-linear>
      <v-chip
        small
        class="mr-0 ml-2"
      >
        <h3>{{level + 1}}</h3>
      </v-chip>
    </v-btn>
  </div>
  <!--v-row class="text-center">
      <v-col>
        Current Level: {{level || "None"}}
      </v-col>
      <v-col>
        Current Experience: {{xp ? xp : level >= 20 ? "MAX" : 0}}{{nextLevelInfo ? ' / '+nextLevelInfo.xp : ''}}
      </v-col>
    </v-row-->
</template>

<script>
export default {
  computed: {
    level () {
      const lvl = this.$store.getters['cb/getCharacterLevel'](this.$route.query.cid)
      return lvl
    },
    xp: {
      get () {
        return this.$store.getters['cb/characters'][this.$route.query.cid].character.experiencePoints || 0
      }
    },
    cProg () {
      return this.$store.getters.getData('character-progression') || {}
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

<style lang="scss">
  .xpBar {
    min-width: 100px;

    .v-chip__content {
      display: flex;
      justify-content: center;
    }

    .rightChip {
      opacity: 0.3
    }
  }
</style>
