<template>
  <div>
    <v-card flat @click="dialog = true">
      <me-cb-xp-bar show-alert />
    </v-card>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>
          Manage {{ isMilestone ? 'Total Levels' : 'XP' }}
          <v-spacer />
          <v-icon @click="dialog = false">
            mdi-close
          </v-icon>
        </v-card-title>
        <v-card-text>
          <v-switch v-model="isMilestone" :label="isMilestone ? 'Milestone' : 'Experience Points'" />
          <v-row v-if="isMilestone">
            <v-col>
              <v-select v-model="selectedLevel" :items="levels" dense label="Set Level" :disabled="viewOnly" />
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="4">
              <v-select v-model="selectedType" :items="modTypes" dense />
            </v-col>
            <v-col cols="8">
              <v-select v-if="selectedType === 'Set Level'" v-model="selectedLevel" :items="levels" dense label="Level" />
              <v-text-field
                v-else
                v-model="xpToModInterface"
                label="Amount"
                outlined
                dense
                hide-details
                clearable
                :disabled="viewOnly"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="dialog = false">
            Cancel
          </v-btn>
          <v-spacer />
          <v-btn text color="success" :disabled="disabledApply" @click="applyChanges">
            Apply
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCbXpInterface',
  data () {
    return {
      dialog: false,
      xpToMod: 0,
      selectedType: 'Add XP',
      levels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      selectedLevel: null,
      modTypes: ['Add XP', 'Remove XP', 'Set XP', 'Set Level']
    }
  },
  computed: {
    ...mapGetters({ level: 'klasses/level', xp: 'xp', options: 'options' }),
    disabledApply () {
      return this.viewOnly || (this.isMilestone && !this.selectedLevel) || (!this.isMilestone && !this.selectedLevel && !this.xpToMod)
    },
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    xpToModInterface: {
      get () {
        return this.$options.filters.groupDigits(this.xpToMod, ',')
      },
      set (value) {
        const parsed = parseInt(value.replaceAll(',', ''))
        if (parsed) {
          this.xpToMod = parsed
        }
      }
    },
    progression () {
      return this.$store.getters.getData('character-progression')
    },
    isMilestone: {
      get () {
        return this.options.useMilestone || false
      },
      set (value) {
        this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'options.useMilestone', value: value || false })
        this.$nextTick(() => {
          this.reset()
        })
      }
    },
    newXpLevel () {
      switch (this.selectedType) {
        case 'Add XP':
          return Math.min(this.xp.points + this.xpToMod, 355000)
        case 'Remove XP':
          return Math.max(0, this.xp.points - this.xpToMod)
        case 'Set XP':
          return this.xpToMod
        case 'Set Level':
          if (this.selectedLevel) {
            return this.progression.find(i => i.level === this.selectedLevel).xp
          }
          return this.xp.points
        default:
          return this.xp.points
      }
    }
  },
  methods: {
    reset () {
      this.xpToMod = 0
      this.selectedType = 'Add XP'
      this.selectedLevel = null
    },
    async applyChanges () {
      let value = null
      if (this.isMilestone) {
        if (!this.selectedLevel) {
          return
        }
        value = {
          points: this.progression.find(i => i.level === this.selectedLevel).xp,
          milestone: this.selectedLevel
        }
      } else {
        const nextLevels = this.progression.filter(i => i.xp <= this.newXpLevel)
        nextLevels.sort((a, b) => b.xp - a.xp)
        const nextHighest = nextLevels[0] || { level: 20 }
        value = {
          points: this.newXpLevel,
          milestone: nextHighest.level
        }
      }
      await this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'experiencePoints', value })
      this.$nextTick(() => {
        this.dialog = false
        this.reset()
      })
    }
  }
}
</script>
