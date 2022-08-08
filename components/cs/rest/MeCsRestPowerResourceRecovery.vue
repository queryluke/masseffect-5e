<template>
  <v-card flat class="my-1">
    <v-card-text class="px-3">
      <div class="d-flex align-center">
        <me-tpg s="subtitle">
          {{ settings.label }}
        </me-tpg>
        <v-btn
          v-if="rollable"
          outlined
          color="red darken-4"
          x-small
          class="ml-4"
          @click="rollDice"
        >
          <v-icon left>
            mdi-dice-multiple
          </v-icon>
          roll <span class="text-lowercase">{{ notation }}</span>
        </v-btn>
      </div>
      <div class="text-caption">
        <div>
          {{ selectionText }}
        </div>
      </div>
    </v-card-text>
    <v-card-text class="px-3 pb-0">
      <v-row>
        <template v-for="(choice, index) in localChoiceOptions">
          <v-col v-if="choice.shown" :key="`ps-recovery-${index}`" cols="6">
            <v-select
              :value="localChoices[index]"
              dense
              :disabled="choice.disabled"
              :items="choice.options"
              :label="choice.label"
              type="number"
              @change="updateLocalChoice($event, index)"
            />
          </v-col>
        </template>
      </v-row>
      <div class="d-flex justify-space-between">
        <div class="text-caption">
          <small v-if="rollable && rolled">
            Roll Result: {{ roll.results }} = {{ roll.total }}
          </small>
        </div>
        <div class="text-caption">
          <small v-if="(rollable && rolled) || !rollable">
            {{ selectedTotal }} of {{ total }} remaining
          </small>
          <small v-else>
            &nbsp;
          </small>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'MeCsRestPowerResourceRecovery',
  props: {
    index: {
      type: Number,
      required: true
    },
    options: {
      type: Object,
      default: () => {}
    },
    available: {
      type: Array,
      default: () => [0, 0, 0, 0, 0, 0]
    },
    maxes: {
      type: Array,
      default: () => [0, 0, 0, 0, 0, 0]
    },
    reset: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      rolled: false,
      roll: {
        results: null,
        total: 0
      },
      localChoices: [0, 0, 0, 0, 0, 0]
    }
  },
  computed: {
    localAvailable () {
      return this.available.map((v, i) => {
        if (this.localChoices[i]) {
          return v + this.localChoices[i]
        }
        return v
      })
    },
    globalDisabled () {
      if (this.settings.limit === 'points' && this.localAvailable[0] === 0) {
        return true
      } else if (this.settings.limit === 'slots' && this.localAvailable.slice(1).every(i => i === 0)) {
        return true
      }
      return this.localAvailable.every(i => i === 0)
    },
    settings () {
      const defaults = {
        dieCount: 0,
        dieType: 0,
        bonus: false,
        maxSlot: 5,
        label: 'Recharge',
        limit: null
      }
      return { ...defaults, ...this.options }
    },
    rollable () {
      return this.settings.dieCount && this.settings.dieType
    },
    bonus () {
      return this.settings.bonus ? this.$store.getters['character/mechanics/mcBonus'](this.settings.bonus) : 0
    },
    notation () {
      let notation = ''
      if (this.settings.dieCount && this.settings.dieType) {
        notation = `${this.settings.dieCount}d${this.settings.dieType}`
      }
      if (this.bonus !== 0) {
        notation += this.bonus > -1 ? `+${this.bonus}` : this.bonus
      }
      return notation
    },
    total () {
      if (this.rollable) {
        return this.roll.total
      }
      return this.bonus
    },
    selectionText () {
      if (this.rollable && !this.rolled) {
        return 'Roll to determine the amount recover'
      }
      if (this.settings.limit === 'points') {
        if (this.localAvailable[0] === 0) {
          return 'You have no points to recover'
        }
        return `You may recover ${this.total} tech point${this.total === 1 ? '' : 's'}`
      } else if (this.settings.limit === 'slots') {
        if (this.localAvailable.slice(1).every(i => i === 0)) {
          return 'You have no power slots to recover'
        }
        if (this.total === 1) {
          return 'You may recover one 1st-level power slot'
        } else {
          return `Choose up to ${this.total} levels worth of power slots`
        }
      } else {
        if (this.globalDisabled) {
          return 'You have no other power points or slots to recover'
        }
        if (this.total === 1) {
          return 'Choose either 1 tech point or one 1st-level power slot'
        }
        return `Choose up to ${this.total} tech points or levels worth of power slots to recover`
      }
    },
    selectedTotal () {
      return this.localChoices.reduce((a, c, i) => a + (c * (i || 1)), 0)
    },
    localChoiceOptions () {
      const selectionsRemaining = this.total - this.selectedTotal
      return this.localChoices.map((v, i) => {
        const levelMultiplier = i || 1
        const options = [
          {
            text: '-',
            value: 0
          }
        ]
        for (let count = 1; (((count * levelMultiplier) - (v * levelMultiplier)) <= selectionsRemaining); count++) {
          if (count > this.localAvailable[i]) {
            continue
          }
          const pointOrSlot = i === 0 ? 'point' : 'slot'
          const plural = count > 1 ? 's' : ''
          const clarification = i > 1 ? ` (= ${count * levelMultiplier} levels)` : ''
          options.push({
            text: `${count} ${pointOrSlot}${plural}${clarification}`,
            value: count
          })
        }
        const tpShown = i === 0 ? this.settings.limit !== 'slots' : true
        const psShown = i > 0 ? this.settings.limit !== 'points' : true
        const maxPsShown = i > 0 ? i <= this.settings.maxSlot : true
        const hasSlots = i > 0 ? this.maxes[i] > 0 : true
        const available = this.localAvailable[i] > 0 && i <= this.settings.maxSlot
        return {
          label: i === 0 ? 'Tech Points' : `${this.$t(`ordinal_numbers[${i}]`)} Level`,
          shown: tpShown && psShown && maxPsShown && hasSlots,
          disabled: options.length - 1 === 0 || !available,
          options
        }
      })
    }
  },
  watch: {
    reset (newVal) {
      if (newVal) {
        this.roll = {
          results: null,
          total: 0
        }
        this.rolled = false
        this.localChoices = [0, 0, 0, 0, 0, 0]
      }
    }
  },
  methods: {
    updateLocalChoice (value, index) {
      this.localChoices.splice(index, 1, (value || 0))
      this.$emit('updatePrr', { selections: this.localChoices, index: this.index })
    },
    async rollDice () {
      this.roll = await this.$store.dispatch('character/roller/INTERNAL_ROLL', this.notation)
      this.$emit('updatePrr', { selections: [0, 0, 0, 0, 0, 0], index: this.index })
      this.localChoices = [0, 0, 0, 0, 0, 0]
      this.rolled = true
    }
  }
}
</script>
