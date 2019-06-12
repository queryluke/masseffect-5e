<template lang="pug">
  v-container
    h2.display-1.hidden-sm-and-down Dice Roller
    v-layout(row wrap).mt-5
      v-flex(xs12 md5)
        v-card
          v-card-text
            v-layout(row)
              v-flex(xs9)
                v-form(v-on:submit.prevent="rollDice")
                  v-text-field(label="formula" outline clearable v-model="formula" messages="e.g. 5d12 + 6")
              v-flex(xs3)
                v-btn(@click="rollDice") Roll
      v-flex(xs12 md6 offset-md1)
        p.headline Roll Log
        roll-log
</template>

<script>
  import {DiceRoller} from '~/mixins/diceRoller'
  import RollLog from '~/components/dice_roller/RollLog.vue'

  export default {
    components: {RollLog},
    mixins: [DiceRoller],
    data () {
      return {
        formula: ''
      }
    },
    methods: {
      rollDice() {
        console.log(this.formula)
        const roll = this.rollFromString(this.formula)
        console.log(roll)
        this.setRoll(roll)
      }
    },
    head () {
      return {
        title: 'Dice Roller - For GMs | Mass Effect 5e',
        meta: [
          { hid: 'description', name: 'description', content: 'Simple Dice Roller' }
        ]
      }
    },
    layout: 'phb'
  }
</script>
