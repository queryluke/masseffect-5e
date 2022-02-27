<template>
  <div class="die-roller-menu">
    <v-speed-dial v-model="menu.open" color="green">
      <template #activator>
        <v-chip x-large :class="!menu.open ? 'chip-hide-bg' : '' ">
          <template v-if="menu.open">
            <v-btn fab color="secondary">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-btn class="ml-3" @click.stop="rollAllDice">Roll</v-btn>
          </template>
          <template v-else>
            <v-btn fab color="green">
              <v-icon>mdi-dice-multiple</v-icon>
            </v-btn>
          </template>
        </v-chip>
      </template>
      <template #default>
        <div v-for="(die, index) in dice" :key="die">
          <v-btn fab @click.stop="addToDie(die)">
            <v-icon>{{index == dice.length - 1 ? 'mdi-percent' : 'mdi-dice-' + die}}</v-icon>
            <v-badge v-if="rollController[die]" color="secondary" :content="rollController[die]"></v-badge>
          </v-btn>
        </div>
        <v-btn fab color="secondary" @click.stop="rollController = {}" depressed class="die-cancel-btn">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-speed-dial>
  </div>
</template>

<script>
import { ScoreText } from '~/mixins/character/scoreText'
export default {
  mixins: [ScoreText],
  data () {
    return {
      menu: {
        open: false
      },
      dice: ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'],
      rollController: {}
    }
  },
  computed: {
    roll () {
      const o = {}
      this.dice.forEach((die) => {
        o[die] = 0
        this.$set(this.rollController, die, this.rollController[die] + 1 || 0)
      })
      return o
    }
  },
  methods: {
    addToDie (die) {
      console.log('adding to die', die, this.roll)
      this.$set(this.rollController, die, this.rollController[die] + 1 || 0)
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
      console.log(output)
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

<style lang="scss">
.die-roller-menu {
  position: fixed;
  left: 300px;
  bottom: 30px;
  z-index: 300;
}
.v-speed-dial__list {
  align-items: flex-start;
}
.die-cancel-btn:not(.v-btn--text):not(.v-btn--outlined):focus:before {
  opacity: 0!important;
}
.chip-hide-bg, .chip-hide-bg:hover {
  background: none !important;
}
</style>
