<template>
  <me-npc-attack v-if="!$fetchState.pending" :feature="feature" :ability-scores="abilityScores" />
</template>

<script>
import { AbilityScoreBonus } from '~/mixins/abilityScoreBonus'

export default {
  mixins: [AbilityScoreBonus],
  props: {
    id: {
      type: String,
      required: true
    },
    proficient: {
      type: Boolean,
      default: true
    },
    abilityScores: {
      type: Object,
      default: () => {
        return {
          str: 10,
          dex: 10
        }
      }
    }
  },
  async fetch () {
    await this.$store.dispatch('FETCH_LOTS', ['weapons', 'weapon-properties'])
  },
  computed: {
    weapon () {
      return this.$store.getters.getItem('weapons', this.id)
    },
    feature () {
      // TODO: This could be stored on the weapon itself since when dice rolls are introduced, most of it already is
      return {
        attack: this.attackType,
        props: this.featureProps,
        range: this.weapon.range,
        dc: false,
        proficient: this.proficient,
        damage: this.weapon.damage,
        name: this.weapon.name,
        mod: this.mod,
        hit: this.weapon.npcHit || false,
        miss: this.weapon.npcMiss || false,
        target: 'one'
      }
    },
    featureProps () {
      const notable = this.$store.getters.getData('weapon-properties').filter(i => ['two-handed', 'double-tap', 'hip-fire', 'burst-fire'].includes(i))
      const props = this.weapon.properties.filter(t => notable.includes(t))
      return props.length > 0 ? props : false
    },
    mod () {
      let abilityMod = 0
      const strMod = this.abilityScoreBonus(this.abilityScores.str)
      const dexMod = this.abilityScoreBonus(this.abilityScores.dex)
      if (this.weapon.props.includes('finesse') || this.weapon.props.includes('recoil')) {
        abilityMod = strMod > dexMod ? 'str' : 'dex'
      } else {
        abilityMod = this.attackType === 'melee' ? 'str' : 'dex'
      }
      return abilityMod
    },
    attackType () {
      return ['assault_rifle', 'heavy_pistol', 'smg', 'shotgun', 'sniper_rifle'].includes(this.weapon.type) ? 'ranged' : 'melee'
    }
  }
}
</script>
