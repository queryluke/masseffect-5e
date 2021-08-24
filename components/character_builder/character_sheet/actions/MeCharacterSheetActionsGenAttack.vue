<template>
  <me-character-sheet-actions-weapon-card>
    <template #name>
      {{ item.name }}
    </template>
    <template #range>
      <me-weapon-range :item="{type: 'melee', range: item.range}" />
    </template>
    <template #mRange>
      <me-weapon-range :item="{type: 'melee', range: item.range}" />
    </template>
    <template #props>
      {{ item.notes }}
    </template>
    <template #hit>
      +{{ toHit }}
    </template>
    <template #damage>
      {{ weaponDamage }}
    </template>
    <template #damageType>
      {{ item.damage.type }}
    </template>
  </me-character-sheet-actions-weapon-card>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      importantProps: ['arc', 'burst-fire', 'double-tap', 'hip-fire', 'thrown'],
      heatColors: [
        'indigo darken-4',
        'blue darken-4',
        'cyan darken-3',
        'green',
        'light-green',
        'lime',
        'amber accent-4',
        'orange darken-1',
        'deep-orange darken-1',
        'red darken-4'
      ]
    }
  },
  computed: {
    abilityBonus () {
      return this.absMod(this.item.mod)
    },
    toHit () {
      const addProfBonus = this.item.profBonus ? this.item.profBonus : true
      const profBonus = addProfBonus ? this.profBonus : 0
      const globalBonus = this.character.settings.attackMod
        ? this.character.settings.attackMod
        : this.character.settings.attackMeleeMod || 0
      return profBonus + parseInt(globalBonus) + this.abilityBonus
    },
    weaponDamage () {
      const globalBonus = this.character.settings.damageMod
        ? this.character.settings.damageMod
        : this.character.settings.damageMeleeMod || 0
      const bonus = parseInt(globalBonus) + this.abilityBonus
      if (!this.item.damage.dieCount) {
        return 1 + bonus
      } else {
        return `${this.item.damage.dieCount}d${this.item.damage.dieType} + ${bonus}`
      }
    }
  }
}
</script>
