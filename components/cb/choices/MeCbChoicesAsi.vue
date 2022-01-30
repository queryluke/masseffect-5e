<template>
  <div>
    <span class="text-body-2">
      {{ label }}
    </span>
    <div class="d-flex flex-wrap">
      <v-chip
        v-for="chip in chips"
        :key="chip.label"
        :disabled="chip.disabled"
        small
        :color="chip.color"
        class="ma-1"
        @click="updateSelection(chip.ability)"
      >
        <span v-if="chip.prepend" class="pr-1">
          +{{ chip.prepend }}
        </span>
        {{ chip.label }}
      </v-chip>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MeCbChoicesAsi',
  props: {
    mechanic: {
      type: Object,
      required: true
    },
    currentValue: {
      type: Array,
      required: true
    }
  },
  computed: {
    chips () {
      return this.abiArray.map((i) => {
        const currentValue = this.currentValue.find((j) => {
          return j.ability === i
        })
        return {
          ability: i,
          label: this.$t(`abilities.${i}.title`),
          disabled: !currentValue && !this.selectionsActive,
          prepend: currentValue?.amount || null,
          color: currentValue ? 'primary' : undefined
        }
      })
    },
    selectionsActive () {
      return this.currentValue.reduce((acc, curr) => acc + curr.amount, 0) < this.selections
    },
    total () {
      return this.mechanic.total || 1
    },
    selections () {
      return this.mechanic.selections || 1
    },
    max () {
      return this.mechanic.max || 1
    },
    abiArray () {
      return this.mechanic.limit || ['str', 'dex', 'con', 'int', 'wis', 'cha']
    },
    label () {
      if (this.selections === 1) {
        return `+${this.max} to one ability from the following`
      }
      if (this.max === 1) {
        return `+${this.max} to ${this.$tc(`string_numbers[${this.selections}]`)} different abilities from the following`
      }
      const options = []
      let selections = 1
      let runningTotal = 0
      while (selections <= this.selections) {
        selections++
        if (this.total - (runningTotal + 2) >= 0) {
          options.push(2)
          runningTotal += 2
        } else if (this.total - (runningTotal + 1) >= 0) {
          options.push(1)
          runningTotal += 1
        }
      }
      const textBag = []
      for (const index in options) {
        textBag.push(`+${options[index]} to ${index.toString() === '0' ? 'one' : 'another'} ability`)
      }
      return `${textBag.join(' and ')}, or +1 to ${this.$tc(`string_numbers[${this.selections}]`)} different abilities from the following`
    }
  },
  methods: {
    updateSelection (value) {
      const currentValue = this.currentValue.slice()
      const currentIndex = currentValue.findIndex(i => i.ability === value)
      if (currentIndex > -1) {
        const currentTotal = currentValue.reduce((acc, curr) => acc + curr.amount, 0)
        const currentAmount = currentValue[currentIndex].amount
        if (currentTotal + 1 > this.total) {
          currentValue.splice(currentIndex, 1)
        } else if (currentAmount < this.max) {
          currentValue.splice(currentIndex, 1, { type: 'asi', ability: value, amount: currentAmount + 1 })
        } else {
          currentValue.splice(currentIndex, 1)
        }
      } else {
        currentValue.push({
          type: 'asi',
          ability: value,
          amount: 1
        })
      }
      this.$emit('upsert', currentValue)
    }
  }
}
</script>
