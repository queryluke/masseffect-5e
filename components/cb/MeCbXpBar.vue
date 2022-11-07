<template>
  <v-card class="d-flex align-center" outlined height="50">
    <!-- alert -->
    <div v-if="showAlert && levelDifference !== 0" class="mx-2">
      <v-tooltip bottom max-width="300">
        <template #activator="{ on, attrs }">
          <div v-bind="attrs" class="d-flex align-center" v-on="on">
            <v-icon :color="alertColor">
              {{ alertIcon }}
            </v-icon>
            <span :class="`${alertColor}--text`">
              {{ levelDifferenceText }}
            </span>
          </div>
        </template>
        {{ levelDifferentText }}
      </v-tooltip>
    </div>
    <!-- milestone -->
    <div v-if="isMilestone" class="flex-grow-1 text-body-2 mx-2 d-flex justify-space-between">
      <div>
        Milestone Level: {{ characterLevel }}
      </div>
      <v-icon small>
        mdi-pencil
      </v-icon>
    </div>
    <!-- xp bar -->
    <div v-else class="d-flex align-center flex-grow-1 mt-2">
      <div class="mx-2 text-center">
        <div class="text-button" style="line-height: 8px">
          <small>
            LVL {{ levelFromXp.level }}
          </small>
        </div>
        <div class="text-caption">
          <small>
            {{ levelFromXp.xp | groupDigits(',') }}
          </small>
        </div>
      </div>
      <div class="flex-grow-1 d-flex flex-column">
        <v-progress-linear :value="levelProgress" height="8" />
        <div class="text-center text-caption">
          <small>
            {{ xp.points | groupDigits(',') }}
          </small>
        </div>
      </div>
      <div class="mx-2 text-center">
        <div class="text-button" style="line-height: 8px">
          <small>
            LVL {{ nextLevel.level }}
          </small>
        </div>
        <div class="text-caption">
          <small v-if="nextLevel.xp">
            {{ nextLevel.xp | groupDigits(',') }}
          </small>
          <small v-else>
            &nbsp;
          </small>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCbXpBar',
  props: {
    showAlert: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({ level: 'klasses/level', xp: 'xp', options: 'options' }),
    progression () {
      return this.$store.getters.getData('character-progression')
    },
    isMilestone () {
      return this.options.useMilestone || false
    },
    higherLevels () {
      return this.progression.filter(i => i.xp > this.xp.points).sort((a, b) => a.level - b.level)
    },
    lowerLevels () {
      return this.progression.filter(i => i.xp <= this.xp.points).sort((a, b) => b.level - a.level)
    },
    nextLevel () {
      return this.higherLevels[0] || { level: 'max', xp: null }
    },
    levelFromXp () {
      return this.lowerLevels[0] || { level: 1, xp: 0 }
    },
    characterLevel () {
      return this.isMilestone ? this.xp.milestone : (this.levelFromXp?.level || 20)
    },
    levelDifference () {
      return this.characterLevel - this.level
    },
    levelDifferenceText () {
      return this.levelDifference < 0 ? this.levelDifference * -1 : this.levelDifference
    },
    alertColor () {
      return this.levelDifference > 0 ? 'info' : 'error'
    },
    alertIcon () {
      return this.levelDifference > 0 ? 'mdi-arrow-up-box' : 'mdi-arrow-down-box'
    },
    levelProgress () {
      if (this.characterLevel === 20) {
        return 100
      }
      const span = this.nextLevel.xp - this.levelFromXp.xp
      const xpBlock = this.xp.points - this.levelFromXp.xp
      return Math.round((xpBlock / span) * 100)
    },
    levelDifferentText () {
      return this.levelDifference > 0
        ? `You have ${this.levelDifference} unassigned level${this.levelDifference > 1 ? 's' : ''}`
        : `You total class levels are greater than your ${this.isMilestone ? 'XP level' : 'indicated milestone level'}`
    }
  }
}
</script>
