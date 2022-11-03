<template>
  <div class="d-flex justify-space-between mt-1">
    <div v-if="isObject(rollGroup)" class="d-flex align-center">
      <template v-for="(rollGroupResult, rgIndex) of rollGroup">
        <div v-if="isObject(rollGroupResult)" :key="`roll-group-result-${rgIndex}`" class="d-flex align-center">
          <me-cs-roll-result :key="`dice-result-${rgIndex}`" :result="rollGroupResult" />
          <span v-if="isObject(rollGroup[rgIndex + 1])" :key="`dice-result-adder-${rgIndex}`">+</span>
        </div>
        <div v-else :key="`non-roll-${rgIndex}`">
          {{ rollGroupResult }}
        </div>
      </template>
    </div>
    <div v-if="showSubtotals && subtotal">
      <span>{{ subtotal }}</span>
      <v-tooltip v-if="typeAttrs" bottom open-delay="200">
        <template #activator="{ on, attrs }">
          <v-icon
            :size="16"
            v-bind="attrs"
            :color="typeAttrs.color"
            v-on="on"
          >
            mdi-{{ typeAttrs.icon }}
          </v-icon>
        </template>
        <span>{{ type }}</span>
      </v-tooltip>
      <span v-else>
        {{ type }}
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MeCsRollGroupEntry',
  props: {
    rollGroup: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      default: 0
    },
    types: {
      type: [String, Array],
      default: ''
    },
    showSubtotals: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    subtotal () {
      let runningTotal = 0
      let lastOperator = '+'
      for (const result of this.rollGroup) {
        if (typeof result === 'object') {
          const maxRoll = Math.max(...result)
          runningTotal = this.operateOnRoll(lastOperator, runningTotal, maxRoll)
        } else if (['+', '-', '*', '/'].includes(result)) {
          lastOperator = result
        } else {
          runningTotal = this.operateOnRoll(lastOperator, runningTotal, result)
        }
      }
      return runningTotal
    },
    type () {
      if (typeof this.types !== 'object') {
        return
      }
      let i = this.index
      let type = null
      do {
        const typeLookup = this.types[i]
        type = typeLookup || null
        i--
      } while (type === null && i > -1)
      return type
    },
    typeAttrs () {
      return this.$store.state.config.damageTypeAttributes[this.type]
    }
  },
  methods: {
    operateOnRoll (operator, acc, curr) {
      switch (operator) {
        case '+':
          return acc + curr
        case '-':
          return acc - curr
        case '*':
          return acc * curr
        case '/':
          return acc / curr
        default:
          return acc
      }
    },
    isObject (thing) {
      return typeof thing === 'object'
    }
  }
}
</script>
