<template>
  <div v-if="shouldShow">
    <div v-if="isMultiDamage">
      <span class="text-caption red--text text--darken-4">
        DMG
      </span>
      <v-btn
        v-for="(dmg, index) in nextRoll.roll.damages"
        :key="`next-dmg-roll-${index}`"
        small
        color="red darken-4"
        @click.stop="makeDamageRoll(dmg)"
      />
    </div>
    <v-btn
      v-if="isDamage"
      text
      small
      color="red darken-4"
      @click.stop="makeDamageRoll(nextRoll.roll.damages[0])"
    >
      {{ nextRoll.text }}
    </v-btn>
    <v-btn
      v-else
      text
      small
      color="primary"
      @click.stop="makeNotationRoll()"
    >
      {{ nextRoll.text }}
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    nextRoll: {
      type: Object,
      default: () => {
        return {
          text: null,
          roll: {
            detail: null,
            type: null,
            damages: [],
            notation: null
          }
        }
      }
    }
  },
  computed: {
    shouldShow () {
      return this.nextRoll?.roll?.notation || this.isDamage
    },
    isDamage () {
      return this.nextRoll.roll?.type === 'damage'
    },
    isMultiDamage () {
      return this.isDamage && (this.nextRoll.roll?.damages || []).length > 1
    }
  },
  methods: {
    makeNotationRoll () {
      this.$store.dispatch('character/roller/ROLL', this.nextRoll.roll)
    },
    makeDamageRoll (damage) {
      const parts = []
      for (const [damageType, values] of Object.entries(damage.types)) {
        const dice = []
        let bonus = false
        for (const [dieType, dieCount] of Object.entries(values)) {
          if (dieType === 'bonus') {
            bonus = dieCount
          } else {
            const dieTypeString = dieType === 'none' ? '' : `d${dieType}`
            dice.push(`${dieCount}${dieTypeString}`)
          }
        }
        parts.push({
          type: damageType,
          dice,
          bonus
        })
      }

      const notation = parts.map((i) => {
        const diceNotation = damage.reroll ? i.dice.map(d => `${d}ro<${damage.reroll}`) : i.dice
        const bonus = i.bonus ? ` + ${i.bonus}` : ''
        return `{${diceNotation.join(' + ')}${bonus}} [lightning]`
      }).join(' + ')

      const text = parts.map((i) => {
        const bonus = i.bonus ? ` + ${i.bonus}` : ''
        return `${i.dice.join(' + ')}${bonus} ${i.type}`
      }).join(' + ')

      const roll = {
        notation,
        detail: this.nextRoll.roll.detail,
        type: this.nextRoll.label || parts.map(i => i.type),
        text
      }
      this.$store.dispatch('character/roller/ROLL', roll)
    }
  }
}
</script>
