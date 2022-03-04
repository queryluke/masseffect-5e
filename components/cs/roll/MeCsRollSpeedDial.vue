<template>
  <v-speed-dial
    v-model="menu"
    fixed
    bottom
    left
    transition="slide-y-reverse-transition"
    :style="nudgeMenu"
  >
    <template #activator>
      <v-btn fab :small="$vuetify.breakpoint.smOnly" color="red darken-4">
        <v-icon>
          mdi-dice-multiple
        </v-icon>
      </v-btn>
    </template>
    <v-btn
      v-for="die in dice"
      :key="die"
      fab
      small
      color="black"
      @click.stop="addToDie(die)"
    >
      <v-icon>
        {{ die === 'd100' ? 'mdi-percent' : `mdi-dice-${die}` }}
      </v-icon>
      <v-badge v-if="rollController[die]" color="red darken-4" :content="rollController[die]" />
    </v-btn>
  </v-speed-dial>
</template>

<script>
import chunk from 'lodash/chunk'
import { ScoreText } from '~/mixins/character/scoreText'
export default {
  name: 'MeCsRollSpeedDial',
  mixins: [ScoreText],
  data () {
    return {
      menu: false,
      sideMenu: false,
      chunk,
      dice: ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'],
      rollController: {},
      customRollerDialog: {
        open: false,
        roll: ''
      }
    }
  },
  computed: {
    nudgeMenu () {
      return this.$vuetify.breakpoint.lgAndUp && this.$store.getters.drawer
        ? 'margin-left: 240px'
        : this.$vuetify.breakpoint.md
          ? 'margin-left: -24px'
          : ''
    },
    roll () {
      const o = {}
      this.dice.forEach((die) => {
        o[die] = 0
        // need this to map the responsiveness
        this.$set(this.rollController, die, this.rollController[die] + 1 || 0)
      })
      return o
    },
    chunkedArr () {
      const a = chunk(this.dice, 2)
      a.pop()
      a.reverse()
      return a
    },
    rollControllerEmpty () {
      return Object.keys(this.rollController).length === 0
    },
    hasRolls () {
      return Object.keys(this.rollController).length > 0
    }
  },
  watch: {
    menu (newVal) {
      if (!newVal) {
        this.rollController = {}
      }
      this.sideMenu = newVal
    }
  },
  methods: {
    openMenu ($event) {
      console.log('opening')
      console.log(this.menu)
      this.menu = !this.menu
      $event.stopPropagation()
    },
    executeMenuClick () {
      if (!this.menu) {
        this.menu = true
      }
    },
    addToDie (die) {
      this.$set(this.rollController, die, (this.rollController[die] || 0) + 1)
    },
    closeMenu () {
      if (!this.rollControllerEmpty) {
        this.rollController = {}
      } else {
        this.menu.open = false
      }
    },
    customRoll (roll) {
      try {
        this.postRollResults(roll)
        this.customRollerDialog.open = false
      } catch (e) {
        alert('Something went wrong... Are you sure you typed your roll out correctly?')
      }
    },
    rollAllDice () {
      let output = ''
      let currentRoll = false
      for (let i = 0; i < this.dice.length; i++) {
        const d = this.dice[i]
        if (this.rollController[d]) {
          output += (currentRoll ? '+' : '') + this.rollController[d] + d
          currentRoll = this.rollController[d]
        }
      }
      this.rollController = {}
      this.menu.open = false
      if (output !== '') { return this.postRollResults(output) }
    },
    postRollResults (roll) {
      this.$store.dispatch('character/ROLL',
        {
          title: 'Custom Roll',
          type: 'dice-roll',
          roll
        })
    }
  }
}
</script>
