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
        class="ma-1"
        @click="upsertSelection(chip.ability)"
      >
        <v-avatar v-if="chip.prepend">
          +{{ chip.prepend }}
        </v-avatar>
        {{ chip.label }}
      </v-chip>
    </div>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
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
          disabled: this.selections > 1 && !currentValue && !this.selectionsActive,
          prepend: currentValue?.amount || null
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
        return `+${this.max} to ${this.selections} different abilities from the following`
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
      for (const index of options) {
        textBag.push(`+${options[index]} to ${index === 0 ? 'one' : 'another'} ability`)
      }
      return `${textBag.join(' and ')}, or +1 to ${this.selections} different abilities from the following`
    }
  },
  methods: {
    upsertSelection (value) {
      const currentValue = this.currentValue.slice()
      const currentIndex = currentValue.findIndex(i => i.ability === value)
      if (currentIndex > -1) {
        const currentAmount = currentValue[currentIndex].amount
        if (currentAmount < this.max) {
          currentValue[currentIndex].amount++
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
