<template>
  <div>
    <me-cs-roll-card :roll="damageRoll">
      <div class="ma-1" :class="{'text-body-1': large, 'font-weight-bold': large }">
        <span v-for="(part, partIndex) in rollParts" :key="`${part.type}-${partIndex}`">
          <span v-for="(die, diceIndex) in part.dice" :key="`die-part-${part.type}-${diceIndex}`">
            <span>{{ die }}</span>
            <span v-if="diceIndex < part.dice.length - 1">+</span>
          </span>
          <span v-if="part.bonus">
            + {{ part.bonus }}
          </span>
          <v-tooltip v-if="icon(part.type)" bottom open-delay="200">
            <template #activator="{ on, attrs }">
              <v-icon
                :size="large ? 16 : 12"
                v-bind="attrs"
                v-on="on"
              >
                {{ icon(part.type) }}
              </v-icon>
            </template>
            <span>{{ part.type }}</span>
          </v-tooltip>
          <br v-if="partIndex < rollParts.length - 1">
          <span v-if="partIndex < rollParts.length - 1" class="mx-1">+</span>
        </span>
      </div>
    </me-cs-roll-card>
  </div>
</template>
<script>
export default {
  name: 'MeCsActionDamage',
  props: {
    damage: {
      type: Object,
      required: true
    },
    large: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    rollParts () {
      const parts = []
      for (const [damageType, values] of Object.entries(this.damage.types)) {
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
      return parts
    },
    damageNotation () {
      return this.rollParts.map((i) => {
        const diceNotation = this.damage.reroll ? i.dice.map(d => `${d}ro<${this.damage.reroll}`) : i.dice
        const bonus = i.bonus ? ` + ${i.bonus}` : ''
        return `{${diceNotation.join(' + ')}${bonus}} [lightning]`
      }).join(' + ')
    },
    damageText () {
      return this.rollParts.map((i) => {
        const bonus = i.bonus ? ` + ${i.bonus}` : ''
        return `${i.dice.join(' + ')}${bonus} ${i.type}`
      }).join(' + ')
    },
    damageRoll () {
      return {
        notation: this.damageNotation,
        detail: this.damage.detail,
        type: this.damage.label || this.rollParts.map(i => i.type),
        text: this.damageText
      }
    }
  },
  methods: {
    icon (type) {
      return 'mdi-' + this.$store.state.config.damageTypeAttributes[type]?.icon
    }
  }
}
</script>
