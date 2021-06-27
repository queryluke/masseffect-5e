<template>
  <me-npc-attack v-if="!$fetchState.pending" :feature="weaponFeature" :ability-scores="abilityScores" :prof-bonus="feature.proficient ? profBonus : 0" />
</template>

<script>
import { AbilityScoreBonus } from '~/mixins/abilityScoreBonus'

export default {
  mixins: [AbilityScoreBonus],
  props: {
    feature: {
      type: Object,
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
      required: true
    }
  },
  async fetch () {
    await this.$store.dispatch('FETCH_LOTS', ['weapons', 'weapon-properties'])
  },
  computed: {
    weapon () {
      return this.$store.getters.getItem('weapons', this.feature.weaponId)
    },
    weaponFeature () {
      // TODO: This could be stored on the weapon itself since when dice rolls are introduced, most of it already is
      return {
        attack: this.attackType,
        props: this.featureProps,
        range: this.weapon.range,
        dc: false,
        proficient: this.feature.proficient,
        damage: [this.damage],
        name: this.weapon.name,
        mod: this.mod,
        hit: this.weapon.npcHit || false,
        miss: this.weapon.npcMiss || false,
        target: 'one'
      }
    },
    featureProps () {
      const notable = this.$store.getters.getData('weapon-properties').filter(i => ['two-handed', 'double-tap', 'hip-fire', 'burst-fire'].includes(i.id))
      const props = this.weapon.properties.filter(t => notable.map(i => i.id).includes(t))
      return props.length > 0 ? props : false
    },
    damage () {
      const clone = JSON.parse(JSON.stringify(this.weapon.damage))
      clone.mod = true
      return clone
    },
    mod () {
      if (this.feature.mod) {
        return this.feature.mod
      }
      let abilityMod = 0
      const strMod = this.abilityScoreBonus(this.abilityScores.str)
      const dexMod = this.abilityScoreBonus(this.abilityScores.dex)
      if (this.weapon.properties.includes('finesse') || this.weapon.properties.includes('recoil')) {
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
