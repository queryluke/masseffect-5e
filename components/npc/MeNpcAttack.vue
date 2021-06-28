<template>
  <me-npc-feature :feature="feature">
    <template #description>
      <me-html :content="description" inline />
    </template>
  </me-npc-feature>
</template>

<script>
import { AbilityScoreBonus } from '~/mixins/abilityScoreBonus'
import { AverageFromDie } from '~/mixins/averageFromDie'

export default {
  mixins: [AbilityScoreBonus, AverageFromDie],
  props: {
    feature: {
      type: Object,
      required: true
    },
    abilityScores: {
      type: Object,
      required: true
    },
    profBonus: {
      type: Number,
      required: true
    }
  },
  computed: {
    description () {
      const sentences = []
      const attackType = this.attackPartLabel(`attack_types.${this.feature.attack}`)
      // attack type & description
      sentences.push(`${attackType} ${this.attackText}`)
      // hit & damage
      if (this.hitText) {
        sentences.push(`${this.attackPartLabel('hit_title')} ${this.hitText}`)
        // hit augment
        if (this.feature.hit) {
          sentences.push(this.feature.hit)
        }
      } else if (this.feature.hit) {
        sentences.push(`${this.attackPartLabel('hit_title')} ${this.feature.hit}`)
      }

      // miss
      if (this.feature.miss) {
        sentences.push(`${this.attackPartLabel('miss_title')} ${this.feature.miss}`)
      }
      return this.$t(`lists.sentences[${sentences.length}]`, sentences)
    },
    modBonus () {
      return this.abilityScoreBonus(this.abilityScores[this.feature.mod])
    },
    hitBonus () {
      let n = this.modBonus
      let bonusType = 'positive'
      if (this.feature.proficient) {
        n += this.profBonus
      }
      if (n < 0) {
        n *= -1
        bonusType = 'negative'
      }
      return this.$t(`npc.to_hit.${bonusType}`, { n })
    },
    rangeText () {
      return this.feature.attack === 'melee'
        ? this.$t('npc.range_types.reach', { range: `<me-distance :length="${this.feature.range}" abbr />` })
        : this.$t('npc.range_types.range', { short: `<me-distance :length="${this.feature.range}" abbr />`, long: `<me-distance :length="${this.feature.range * 3}" abbr />` })
    },
    hitText () {
      if (this.feature.damage) {
        const damages = this.feature.damage.map(i => `${this.damageFormula(i)} ${this.$t(`damage_types.${i.type}_damage`)}`)
        return this.$t(`lists.and_list[${damages.length}]`, damages)
      }
      return false
    },
    attackText () {
      const array = [
        this.hitBonus,
        this.rangeText,
        this.$te(`npc.target_types.${this.feature.target}`) ? this.$t(`npc.target_types.${this.feature.target}`) : this.feature.target
      ]
      return this.$t(`lists.comma_list[${array.length}]`, array)
    },
    range () {
      return Number.parseInt(this.attack.range, 10)
    },
    longRange () {
      return this.range * 3
    }
  },
  methods: {
    attackPartLabel (key) {
      const label = this.$t(`npc.${key}`)
      const labelText = this.$t('markdown_label', { label })
      return `<span class="font-italic font-weight-light">${labelText}</span>`
    },
    averageDamage (damage) {
      let base = damage.flat ? damage.flat : this.roundedAverageFromDie(damage.dieType, damage.dieCount)
      if (damage.mod) {
        base += this.modBonus
      }
      return base
    },
    damageFormula (damage) {
      const dice = damage.flat ? damage.flat : this.$t('dice', { dieType: damage.dieType, dieCount: damage.dieCount })
      const avg = this.averageDamage(damage)
      const formulaType = damage.mod && this.modBonus !== 0 ? this.modBonus > 0 ? 'plus' : 'minus' : 'base'
      const n = this.modBonus < 0 ? this.modBonus * -1 : this.modBonus
      const formula = this.$t(`dice_formulas.${formulaType}`, { dice, n })
      return this.$t('dice_average', { avg, formula })
    }
  }
}
</script>
