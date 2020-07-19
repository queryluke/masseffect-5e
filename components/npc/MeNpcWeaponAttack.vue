<template>
  <me-npc-attack v-if="!loading" :attack="attack" :recharge="recharge" />
</template>

<script>
import { AbilityScoreBonus } from '~/mixins/abilityScoreBonus'
import { AverageFromDie } from '~/mixins/averageFromDie'

export default {
  mixins: [AbilityScoreBonus, AverageFromDie],
  props: {
    id: {
      type: String,
      required: true
    },
    abilityScores: {
      type: Object,
      default: () => {
        return {
          str: 10,
          dex: 10
        }
      }
    },
    profBonus: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      loading: true,
      weapon: {
        name: 'NOT FOUND',
        tags: '',
        type: '',
        damage: '1d4',
        range: 2,
        properties: []
      }
    }
  },
  computed: {
    attack () {
      return {
        name: this.weapon.name,
        type: this.attackType,
        attackMod: this.attackMod + this.profBonus,
        range: this.weapon.range,
        hit: this.damageText,
        target: 'one target',
        miss: this.weapon.npcMiss ? this.weapon.npcMiss : false
      }
    },
    recharge () {
      return this.notableTags.length > 0 ? this.notableTags.join(', ') : false
    },
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
      return `${this.damage} (${this.weapon.damage}${attackModText}) ${this.weapon.dmgType} damage${npcHit}.`
    }
  },
  async created () {
    this.weapon = await this.$store.dispatch('FETCH_ITEM', { endpoint: 'weapons', id: this.id })
    this.loading = false
  }
}
</script>
