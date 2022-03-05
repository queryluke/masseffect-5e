<template>
  <div>
    <v-speed-dial
      v-model="menu"
      fixed
      bottom
      left
      transition="slide-y-reverse-transition"
      :style="nudge"
    >
      <template #activator>
        <v-btn v-model="menu" fab color="red darken-4" :elevation="menu ? 0 : 24">
          <v-icon>
            {{ menu ? 'mdi-close' : 'mdi-dice-multiple' }}
          </v-icon>
        </v-btn>
      </template>
      <me-cs-roll-die-select v-for="dieType in dieTypes" :key="dieType" :die-type="dieType" overlay />
    </v-speed-dial>

    <v-btn
      fab
      shaped
      small
      fixed
      bottom
      right
      color="red darken-4"
      :style="nudgeLogButton"
      @click="toggleLogs"
    >
      <v-icon>
        mdi-chevron-{{ logsShown ? 'right' : 'left' }}
      </v-icon>
    </v-btn>

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
      sideMenu: false,
      dice: ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'],
      rollController: {},
      customRollerDialog: {
        open: false,
        roll: ''
      }
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
    nudgeLogButton () {
      if (this.logsShown && this.$vuetify.breakpoint.lgAndUp) {
        return {
          'margin-right': '246px'
        }
      }
      return undefined
    },
    dieTypes () {
      return this.$store.state.character.roller.dieTypes
    },
    rollable () {
      return Object.values(this.$store.getters['character/roller/rollController']).some(i => i) || this.$store.getters['character/roller/customTextRoll']
    },
    logsShown () {
      return this.$store.getters['character/navigation/sideNavbar']
    }
  },
  watch: {
    menu (newVal) {
      if (newVal === false) {
        this.closeRoller()
      }
    }
  },
  methods: {
    roll () {
      if (this.rollable) {
        this.$store.dispatch('character/roller/CUSTOM_ROLL')
      }
      this.closeRoller()
    },
    closeRoller () {
      this.$store.commit('character/roller/RESET_CONTROLLER')
      this.$store.commit('character/roller/SET_CUSTOM_TEXT_ROLL', null)
      this.mobileRoller = false
    },
    toggleLogs () {
      if (this.logsShown) {
        this.$store.commit('character/navigation/SET', { key: 'sideNavbar', value: false })
      } else {
        this.$store.dispatch('character/navigation/SHOW_SIDE_NAVBAR', 'me-cs-logs-list')
      }
    }
  }
}
</script>
