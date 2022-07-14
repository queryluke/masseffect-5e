<template>
  <div>
    <v-speed-dial
      v-model="menu"
      fixed
      bottom
      left
      transition="slide-y-reverse-transition"
      style="transition: margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1); z-index: 10"
      :style="nudge"
    >
      <template #activator>
        <v-btn v-model="menu" fab color="red darken-4" :elevation="menu ? 0 : 24">
          <v-icon>
            {{ menu ? 'mdi-close' : 'mdi-dice-multiple' }}
          </v-icon>
        </v-btn>
      </template>
      <v-btn fab x-small color="secondary" @click="showLogs">
        <v-icon>
          mdi-math-log
        </v-icon>
      </v-btn>
      <v-btn outlined fab small @click="customRoll = true">
        <v-icon>
          mdi-wrench
        </v-icon>
      </v-btn>
      <me-cs-roll-die-select v-for="dieType in dieTypes" :key="dieType" :die-type="dieType" overlay />
    </v-speed-dial>

    <v-fade-transition>
      <v-btn
        v-show="menu"
        fixed
        bottom
        left
        rounded
        x-large
        :style="nudge"
        color="red darken-4"
        height="56"
        @click="roll"
      >
        <span class="pl-11">
          Roll
        </span>
      </v-btn>
    </v-fade-transition>

    <v-dialog v-model="customRoll" max-width="500">
      <v-card max-width="500">
        <v-card-title>Custom Roll</v-card-title>
        <v-card-text>
          <me-cs-roll-custom-text />
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="customRoll = false">
            Close
          </v-btn>
          <v-spacer />
          <v-btn text color="primary" @click="roll">
            Roll
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ScoreText } from '~/mixins/character/scoreText'
export default {
  name: 'MeCsRollSpeedDial',
  mixins: [ScoreText],
  data () {
    return {
      menu: false,
      customRoll: false
    }
  },
  computed: {
    nudge () {
      if (this.$store.getters.drawer && this.$vuetify.breakpoint.lgAndUp) {
        return {
          'margin-left': '246px'
        }
      }
      return undefined
    },
    dieTypes () {
      return this.$store.state.character.roller.dieTypes
    },
    rollable () {
      return Object.values(this.$store.getters['character/roller/rollController']).some(i => i) || this.$store.getters['character/roller/customTextRoll']
    }
  },
  watch: {
    menu (newVal) {
      if (newVal === false) {
        this.$store.commit('character/roller/RESET_CONTROLLER')
      }
    },
    customRoll (newVal) {
      if (newVal === false) {
        this.$store.commit('character/roller/SET_CUSTOM_TEXT_ROLL', null)
      }
    }
  },
  methods: {
    roll () {
      if (this.rollable) {
        this.$store.dispatch('character/roller/CUSTOM_ROLL')
      }
      if (this.menu) {
        this.menu = false
      }
      if (this.customRoll) {
        this.customRoll = false
      }
    },
    showLogs () {
      this.$store.dispatch('character/navigation/SHOW_SIDE_NAV', 'me-cs-logs-list')
    }
  }
}
</script>
