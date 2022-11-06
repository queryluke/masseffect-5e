<template>
  <v-card height="215" min-width="190" color="transparent" flat>
    <v-card-text>
      <div class="text-center">
        <v-btn
          x-small
          class="mb-2"
          :disabled="viewOnly || maxed"
          @click="rollDeathSave"
        >
          Roll Death Save
        </v-btn>
      </div>
      <v-card outlined min-height="150" min-width="110">
        <me-cs-health-dead-stable-overlay />
        <div class="d-flex justify-space-around">
          <!-- Successes -->
          <div class="d-flex flex-column align-center">
            <div class="text-caption text-center">
              Success
            </div>
            <v-btn
              v-for="success in [1, 2, 3]"
              :key="`successes-${success}`"
              :disabled="viewOnly"
              fab
              x-small
              :outlined="success > successes"
              :color="success <= successes ? 'green darken-1' : undefined"
              class="my-1"
              @click="successes = success"
            >
              <v-icon v-if="success <= successes">
                mdi-heart-pulse
              </v-icon>
            </v-btn>
          </div>
          <!-- Failures -->
          <div class="d-flex flex-column align-center">
            <div class="text-caption text-center">
              Failure
            </div>
            <v-btn
              v-for="fail in [1, 2, 3]"
              :key="`fails-${fail}`"
              :disabled="viewOnly"
              class="my-1"
              fab
              x-small
              :outlined="fail > failures"
              :color="fail <= failures ? 'red darken-4' : undefined"
              @click="failures = fail"
            >
              <v-icon v-if="fail <= failures">
                mdi-skull
              </v-icon>
            </v-btn>
          </div>
        </div>
      </v-card>
      <div class="text-center">
        <v-btn
          x-small
          class="mt-1"
          :disabled="viewOnly || maxed"
          color="green darken-1"
          @click="stabilize"
        >
          Stabilize
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCsHealthDeathSaves',
  computed: {
    ...mapGetters({
      currentStats: 'currentStats'
    }),
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    failures: {
      get () {
        return this.currentStats.deathSaves?.failures || 0
      },
      set (value) {
        const adder = value === this.failures ? -1 : 1
        const setValue = this.failures + adder
        this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.deathSaves.failures', value: setValue })
      }
    },
    successes: {
      get () {
        return this.currentStats.deathSaves?.successes || 0
      },
      set (value) {
        const adder = value === this.successes ? -1 : 1
        const setValue = this.successes + adder
        this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.deathSaves.successes', value: setValue })
      }
    },
    maxed () {
      return this.successes === 3 || this.failures === 3
    }
  },
  methods: {
    async rollDeathSave () {
      if (this.maxed) {
        return
      }
      const dsRoll = {
        type: '',
        detail: 'Death Saving Throw',
        notation: '{1d20}',
        text: '1d20'
      }
      const result = await this.$store.dispatch('character/roller/ROLL', dsRoll)
      const total = result.data.total
      if (!total) {
        return
      }
      if (total === 20) {
        const lost = this.currentStats.hitPointsLost
        await this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.hitPointsLost', value: lost - 1 })
      } else if (total < 11) {
        const fails = total === 1 ? 2 : 1
        this.failures = Math.max((this.failures + fails), 3)
      } else {
        this.successes = Math.max((this.successes + 1), 3)
      }
    },
    stabilize () {
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.deathSaves.successes', value: 3 })
    }
  }
}
</script>
