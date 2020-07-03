<template lang="pug">
  div
    p.mb-0
      strong
        em {{ weapon.name }}
          span(v-if="notableTags.length > 0").ml-1 ({{ notableTags.join(', ') }})
        span .
      em.ml-1 {{ attackType | capitalize }} Weapon Attack:
      span.ml-1 +{{ attackMod + profBonus }} to hit,
      span.ml-1 {{ rangeType }} {{ weapon | weaponRange }},
      span.ml-1 one target.
      p(:class="[weapon.npcMiss ? 'my-0' : 'mt-0']") #[em Hit]: {{ damageText }}
      p(v-if="weapon.npcMiss").mt-0 #[em Miss]: {{ weapon.npcMiss }}
</template>

<script>
import weapons from '~/static/data/weapons'
import { AbilityScoreBonus } from '~/mixins/abilityScoreBonus'
import { AverageFromDie } from '~/mixins/averageFromDie'

export default {
  mixins: [AbilityScoreBonus, AverageFromDie],
  props: {
    id: {
      type: String,
      default: ''
    },
    abilityScores: {
      type: Object,
      default: () => { return {} }
    },
    profBonus: {
      type: Number,
      default: 2
    }
  },
  computed: {
    attackMod () {
      const tags = this.tags
      let abilityMod = 0
      const strMod = this.abilityScoreBonus(this.abilityScores.str)
      const dexMod = this.abilityScoreBonus(this.abilityScores.dex)
      if (tags.includes('finesse') || tags.includes('recoil')) {
        abilityMod = strMod > dexMod ? strMod : dexMod
      } else {
        abilityMod = this.weapon.type === 'Melee' ? strMod : dexMod
      }
      return abilityMod
    },
    attackType () {
      return this.weapon.type === 'Melee' ? 'melee' : 'ranged'
    },
    rangeType () {
      return this.weapon.type === 'Melee' ? 'reach' : 'range'
    },
    tags () {
      return this.weapon.properties.map(t => t.toLowerCase().trim())
    },
    notableTags () {
      const notableTags = ['two-handed', 'double tap', 'hip fire', 'burst fire']
      return this.tags.filter(t => notableTags.includes(t))
    },
    damage () {
      return this.averageFromDie(this.weapon.damage) + this.attackMod
    },
    damageText () {
      const npcHit = this.weapon.npcHit ? ` and ${this.weapon.npcHit}` : ''
      const attackModText = this.attackMod > 0 ? ` + ${this.attackMod}` : ''
      return `${this.damage} (${this.weapon.damage}${attackModText}) ${this.weapon.dmgType} damage${npcHit}`
    },
    weapon () {
      let weapon = weapons.find(w => w.id === this.id)
      if (typeof (weapon) === 'undefined') {
        console.log(`could not find ${this.id}`)
        weapon = {
          name: 'NOT FOUND',
          tags: '',
          type: '',
          damage: '1d4',
          range: 2
        }
      }
      return weapon
    }
  }
}
</script>
