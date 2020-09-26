<template>
  <v-container>
    <me-page-title />
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-form @submit.prevent="rollDice">
              <v-text-field
                v-model="formula"
                label="formula"
                outlined
                clearable
                hint="e.g. 5d12 + 6"
              />
            </v-form>
            <v-btn @click="rollDice">
              Roll
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p class="text-h4">
          Roll Log
        </p>
        <roll-log />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { DiceRoller } from '~/mixins/diceRoller'

export default {
  mixins: [DiceRoller],
  data () {
    return {
      formula: ''
    }
  },
  created () {
    this.$store.commit('pageTitle', 'Dice Roller')
  },
  methods: {
    rollDice () {
      const roll = this.rollFromString(this.formula)
      this.setRoll(roll)
    }
  },
  head () {
    return {
      title: 'Dice Roller | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Simple Dice Roller' }
      ]
    }
  }
}
</script>
