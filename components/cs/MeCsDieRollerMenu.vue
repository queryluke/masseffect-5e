<template>
  <div>
    <v-speed-dial v-model="menu.open" color="green" v-bind="$attrs" :value="menu.open">
      <template #activator>
        <v-chip x-large :class="!menu.open ? 'chip-hide-bg' : '' ">
          <template v-if="menu.open">
            <v-btn fab color="secondary">
              <v-btn
              fab
              color="secondary"
              @click.stop="closeMenu()"
              class="die-cancel-btn">
              <v-icon>{{!rollControllerEmpty ? 'mdi-delete' : 'mdi-close'}}</v-icon>
              </v-btn>
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
        <v-row v-for="(dieGroup, index) in chunkedArr" :key="index">
          <v-col v-for="(die, dieIndex) in dieGroup" :key="dieIndex + ':' + index" class="die-col">
            <v-btn fab @click.stop="addToDie(die)">
              <v-icon>{{index == dice.length - 1 ? 'mdi-percent' : 'mdi-dice-' + die}}</v-icon>
              <v-badge v-if="rollController[die]" color="secondary" :content="rollController[die]"></v-badge>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="die-col">
            <v-btn fab @click.stop="addToDie('d100')">
              <v-icon>mdi-percent</v-icon>
              <v-badge v-if="rollController['d100']" color="secondary" :content="rollController['d100']"></v-badge>
            </v-btn>
          </v-col>
          <v-col class="die-col">
            <v-btn fab color="secondary" @click="customRollerDialog.open = true">
              <v-icon>mdi-wrench</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-speed-dial>
    <v-dialog v-model="customRollerDialog.open" persistent width="300">
      <v-card>
        <v-card-title>Specify a Custom Roll</v-card-title>
        <v-card-subtitle>For example: 1d20 - 1d4 + 2</v-card-subtitle>
        <v-card-text>
          <v-text-field v-model="customRollerDialog.roll" placeholder="1d20 - 1d4 + 2" prepend-icon="mdi-dice-multiple">

          </v-text-field>
          <v-btn color="green" @click="customRoll(customRollerDialog.roll)" block>
            Roll
          </v-btn>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="secondary" @click="customRollerDialog.open = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import chunk from 'lodash/chunk'
import { ScoreText } from '~/mixins/character/scoreText'
export default {
  mixins: [ScoreText],
  data () {
    return {
      menu: {
        open: false
      },
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
    }
  },
  methods: {
    addToDie (die) {
      console.log(die, this.rollController)
      this.$set(this.rollController, die, this.rollController[die] + 1 || 1)
      console.log(die, this.rollController)
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

<style lang="css">
.v-speed-dial__list {
  align-items: flex-start;
}
.die-cancel-btn:not(.v-btn--text):not(.v-btn--outlined):focus:before {
  opacity: 0!important;
}
.chip-hide-bg, .chip-hide-bg:hover {
  background: none !important;
}
.row {
  margin-top: 0 !important;
}
.die-col {
  padding: 4px;
}
</style>
