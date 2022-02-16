<template>
  <div>
    <me-cs-card-title v-if="$vuetify.breakpoint.smAndDown">
      Logs
    </me-cs-card-title>
    <div class="mt-3">
      {{JSON.stringify(JSON.parse(sampleRoll), undefined, 4)}}
      <v-list v-if="logs.length">
        <v-list-item v-for="(entry, index) in logs" :key="index" class="pb-2">
          <v-card class="log-entry-container">
            <v-card-title class="pb-2">{{entry.title}}</v-card-title>
            <v-card-subtitle v-if="entry.subtitle">{{entry.subtitle}}</v-card-subtitle>
            <v-card-text>
              <v-row v-if="entry.rollData" class="d-inline-flex" align="stretch">
                <template v-for="(die, rollIndex) in entry.rollData.dice">
                  <v-col :key="index + ':' + rollIndex" class="text-center">
                    <v-img
                    :src="require('~/assets/images/misc/d20blank.png')"
                    max-width="60"/>
                    <div class="centered">d20</div>
                    <div class="">
                      <span>{{die.raw}}</span>
                      <span v-if="die.mod">({{die.mod >= 0 ? '+' : '-'}}{{Math.abs(die.mod)}})</span>
                    </div>
                  </v-col>
                </template>
                <v-col :key="index + ':mod'" class="d-flex align-center">
                  <h2 v-if="entry.rollData.mod">
                    {{entry.rollData.mod >= 0 ? '+' : '-'}} {{Math.abs(entry.rollData.mod)}}
                  </h2>
                </v-col>
                <v-col :key="index + ':total'" class="d-flex align-center">
                  <h2>= {{getRollTotal(entry.rollData)}}</h2>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <!--v-divider v-if="index != logs.length-1" style="width: 100%;"/-->
        </v-list-item>
      </v-list>
      <v-banner v-if="!logs.length">No Logs Found</v-banner>
    </div>
  </div>
</template>

<script>
//  import * as rpgDiceRoller from '@dice-roller/rpg-dice-roller'
import * as RpgDiceRoller from '@dice-roller/rpg-dice-roller'
import { debounce } from 'lodash'
export default {
  name: 'MeCsLogs',
  data () {
    return {
      cachedValue: null,
      loading: false
    }
  },
  computed: {
    logs () {
      return this.$store.getters['character/character'].logs || [{
        title: 'Cool Roll',
        rollData: {
          dice: [{
            type: 20,
            raw: 10,
            mod: -2
          },
          {
            type: 20,
            raw: 10
          }],
          mod: 5
        }
      }]
    },
    saveable () {
      return this.cachedValue !== this.logs
    },
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    diceRoller () {
      return new RpgDiceRoller.DiceRoller()
    },
    sampleRoll () {
      return this.diceRoller.roll('2d6 + 1d8 - 2').export()
    }
  },
  watch: {
    notes (newVal) {
      if (newVal !== this.cachedValue) {
        this.cachedValue = newVal
      }
    }
  },
  created () {
    this.cachedValue = this.logs
    this.debouncedUpdate = debounce(() => {
      this.updateAttr()
    }, 2000)
  },
  methods: {
    async updateAttr () {
      if (this.cachedValue !== this.logs) {
        this.loading = true
        await this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'logs', value: this.cachedValue })
        this.loading = false
      }
    },
    getRollTotal (rollData) {
      let total = 0
      rollData.dice.forEach((roll) => {
        total += Number(roll.raw || 0) + Number(roll.mod || 0)
      })
      total += rollData.mod
      return total
    }
  }
}
</script>

<style scoped>
h2 {
  white-space: nowrap;
  height: 30px;
}
.die-container {
  width: auto;
  /*height: 70px;*/
  margin: auto;
}
.log-entry-container {
  width: 100%;
}
</style>
