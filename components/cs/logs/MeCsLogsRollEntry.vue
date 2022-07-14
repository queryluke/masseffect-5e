<template>
  <v-card elevation="2" class="my-1" @click="open = !open">
    <div class="d-flex justify-space-between align-center">
      <div class="d-flex align-center ml-1">
        <v-icon v-if="!isLastEntry" color="primary">
          mdi-chevron-{{ show ? 'up' : 'down' }}
        </v-icon>
        <div class="ml-1 text-body-2 text-capitalize">
          {{ data.detail }}: {{ data.type }}
        </div>
      </div>
      <div class="text-h5 ma-1 mr-2">
        {{ data.total }}
      </div>
    </div>

    <v-expand-transition>
      <div v-show="show" class="justify-space-between transition-ease-in-out">
        <div class="d-flex mx-2">
          <v-icon size="26">
            mdi-dice-multiple
          </v-icon>
          <!-- Machine Readable Results -->
          <div v-if="data.mrResults" class="d-flex mx-3 align-center font-weight-medium" style="font-size: 1.2em">
            <template v-for="(result, index) of data.mrResults">
              <div v-if="typeof result === 'object'" :key="`roll-result-${index}`" class="d-flex align-center">
                <template v-for="(diceResult, drIndex) of result">
                  <me-cs-roll-result :key="`dice-result-${drIndex}`" :result="diceResult" />
                  <span v-if="drIndex + 1 < result.length" :key="`dice-result-adder-${drIndex}`">+</span>
                </template>
              </div>
              <div v-else :key="`non-roll-${index}`">
                {{ result }}
              </div>
            </template>
          </div>
          <!-- Old Results -->
          <div v-else>
            {{ data.results }}
          </div>
        </div>
        <div class="mx-3 my-1 text-body-2">
          {{ data.text || data.notation }}
        </div>
        <v-divider />
        <v-card-actions>
          <!-- TODO: color based on next roll -->
          <v-btn
            v-for="(roll, index) of entry.nextRolls"
            :key="`add-roll-${index}`"
            text
            small
            color="red darken-4"
            @click.stop="makeNextRoll(index)"
          >
            {{ roll.text }}
          </v-btn>
          <v-spacer />
          <v-btn text small color="primary" @click.stop="reroll()">
            reroll
          </v-btn>
        </v-card-actions>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>

export default {
  props: {
    entry: {
      type: Object,
      default: () => {}
    },
    isLastEntry: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      data: this.entry.data || {},
      open: false
    }
  },
  computed: {
    show () {
      return this.open || this.isLastEntry
    }
  },
  watch: {
    isLastEntry (newVal) {
      if (newVal === false) {
        this.open = false
      }
    }
  },
  methods: {
    makeNextRoll (index) {
      const nextRoll = this.entry.nextRolls[index]?.roll
      if (nextRoll?.notation) {
        this.$store.dispatch('character/roller/ROLL', nextRoll)
      }
    },
    reroll () {
      const payload = {
        detail: this.data.detail,
        type: this.data.type,
        notation: this.data.notation,
        text: this.data.text
      }
      this.$store.dispatch('character/roller/ROLL', payload)
    }
  }
}
</script>
