<template>
  <div
    v-if="level"
    class="xpBar mb-2"
  >
    <v-btn style="width: 100%;">
      <v-chip
        small
        class="mr-2 ml-0"
      >
        <h3>{{ level }}</h3>
      </v-chip>
      <v-progress-linear
        class="ma-0 text-center"
        :value="nextLevelInfo.xp ? xp / nextLevelInfo.xp : 100"
        height="20"
        rounded
      >
        {{ xpProgressText }}
      </v-progress-linear>
      <v-chip
        small
        class="mr-0 ml-2"
      >
        <h3>{{ nextLevelText }}</h3>
      </v-chip>
    </v-btn>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  computed: {
    nextLevelText () {
      return this.level + 1 > 20 ? 'Max' : this.level + 1
    },
    xpProgressText () {
      return this.nextLevelInfo ? `${this.xp} / ${this.nextLevelInfo.xp}` : 'Max'
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
