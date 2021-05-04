<template>
  <me-npc-feature :feature="feature">
    <template #description>
      <span class="font-italic font-weight-light">
        {{ $t(`npc.attack_types.${feature.attack}`) }}
      </span>
      <me-html :content="attackIntro" inline />
      <span class="font-italic">
        Hit:
      </span>
      <span>
        {{ attack.hit }}
      </span>
      <span v-if="attack.miss" class="font-italic">
        Miss:
      </span>
      <span v-if="attack.miss">
        {{ attack.miss }}
      </span>
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
    modBonus () {
      return this.abilityScoreBonus(this.feature.mod)
    },
    hitBonus () {
      let bonus = this.modBonus
      if (this.feature.proficient) {
        bonus = bonus + this.profBonus
      }
      return bonus >= 0 ? `+${bonus}` : bonus
    },
    rangeText () {
      return this.feature.attack === 'melee'
        ? this.$t('range_types.reach', { range: `<me-distance :length="${this.range}" abbr />` })
        : this.$t('range_types.range', { short: `<me-distance :length="${this.range}" abbr />`, long: `<me-distance :length="${this.range * 3}" abbr />` })
    },
    hitText () {
      const damages = this.feature.damage.map(i => this.damagePart(i))
      const hitText = this.$t('lists.and_list', damages.length, damages)
      return this.feature.hit ? `${hitText}. ${this.feature.hit}.` : ''
    },
    attackText () {
      const elements = {
        toHit: this.$t('npc.to_hit', { bonus: this.hitBonus }),
        range: this.rangeText,
        target: this.$t(`target_types.${this.feature.target}`)
      }
      return this.$t('npx.attack_text', elements)
    },
    range () {
      return Number.parseInt(this.attack.range, 10)
    },
    longRange () {
      return this.range * 3
    }
  },
  methods: {
    averageDamage (damage) {
      let base = this.averageFromDie(damage.dieType, damage.dieCount)
      if (damage.mod) {
        base += this.modBonus
      }
      return base
    },
    damageFormula (damage) {
      let operator = false
      if (damage.mod) {
        operator = this.modBonus === 0 ? false : this.modBonus > 0 ? '+' : '-'
      }
      const dice = this.$t('dice', { dieType: damage.dieType, dieCount: damage.dieCount })
      return `(${operator ? `(${dice} ${operator} ${this.modBonus})` : dice})`
    },
    damagePart (damage) {
      return this.$t('npc.damage_text', {
        avg: this.averageDamage(damage),
        formula: this.damageFormula(damage),
        damageType: this.$t(`damage_types.${damage.type}_damage`)
      })
    }
  }
}
</script>
