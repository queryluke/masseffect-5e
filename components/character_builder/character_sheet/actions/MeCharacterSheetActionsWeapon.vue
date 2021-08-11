<template>
  <me-character-sheet-actions-weapon-card>
    <template #name>
      {{ itemData.name }}
    </template>
    <template #range>
      <me-weapon-range :item="{...itemData, ...item.stats}" />
    </template>
    <template #mRange>
      <me-weapon-range :item="{...itemData, ...item.stats}" />
    </template>
    <template #props>
      <template v-for="notifyProp in notifyProps">
        <span :key="notifyProp" class="ml-2 ml-md-0">
          <me-weapon-prop :id="notifyProp" />
        </span>
      </template>
    </template>
    <template #heat>
      <me-character-sheet-actions-weapon-heat-tracker v-if="itemData.type !== 'melee'" :item="item" />
    </template>
    <template #mHeat>
      <me-character-sheet-actions-weapon-heat-tracker v-if="itemData.type !== 'melee'" :item="item" />
    </template>
    <template #hit>
      +{{ toHit }}
    </template>
    <template #damage>
      {{ weaponDamage }}
    </template>
    <template #damageType>
      {{ item.stats.damage.type }}
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
    heatColor () {
      return this.heatColors[Math.ceil(this.currentHeatPercent / 10) - 1]
    },
    currentHeatPercent () {
      return Math.ceil((this.item.heat * 100) / this.item.stats.heat)
    },
    itemData () {
      return this.equipmentData('weapons', this.item.id)
    },
    strMod () {
      return this.absMod('str')
    },
    dexMod () {
      return this.absMod('dex')
    },
    recoil () {
      return this.item.stats.properties.includes('recoil')
    },
    finesse () {
      return this.item.stats.properties.includes('finesse')
    },
    notifyProps () {
      return this.item.stats.properties.filter(i => this.importantProps.includes(i))
    },
    abilityBonus () {
      const dexMod = this.speciesId === 'elcor' ? this.absMod('int') : this.dexMod
      return this.itemData.type === 'melee'
        ? this.finesse ? Math.max(this.dexMod, this.strMod) : this.strMod
        : this.recoil ? Math.max(dexMod, this.strMod) : dexMod
    },
    toHit () {
      const profBonus = this.proficiencies.weapon.includes(this.itemData.type) ? this.profBonus : 0
      const weaponBonus = this.item.bonusHit || 0
      const globalBonus = this.character.settings.attackMod
        ? this.character.settings.attackMod
        : this.itemData.type === 'melee' && this.character.settings.attackMeleeMod
          ? this.character.settings.attackMeleeMod
          : this.character.settings.attackRangedMod || 0
      return profBonus + parseInt(weaponBonus) + parseInt(globalBonus) + this.abilityBonus
    },
    weaponDamage () {
      const weaponBonus = this.item.bonusDamage || 0
      const globalBonus = this.character.settings.damageMod
        ? this.character.settings.damageMod
        : this.itemData.type === 'melee' && this.character.settings.damageMeleeMod
          ? this.character.settings.damageMeleeMod
          : this.character.settings.damageRangedMod || 0
      const bonus = parseInt(weaponBonus) + parseInt(globalBonus) + this.abilityBonus
      return `${this.item.stats.damage.dieCount}d${this.item.stats.damage.dieType} + ${bonus}`
    }
  },
  methods: {
    fireWeapon () {
      const changeItem = { ...this.item, heat: this.item.heat + 1 }
      this.removeEquipment('weapon', this.item.uuid, changeItem)
    },
    reloadWeapon () {
      const changeItem = { ...this.item, heat: 0 }
      this.removeEquipment('weapon', this.item.uuid, changeItem)
    }
  }
}
</script>
