<template>
  <div>
    <div class="d-flex align-center">
      <v-list-item-avatar class="mr-2">
        <v-list-item-action-text class="text-h6 d-flex align-center">
          +{{ toHit }}
        </v-list-item-action-text>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          {{ itemData.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          <small class="d-flex align-end">
            <me-weapon-range :item="{...itemData, ...item.stats}" />
            <span v-if="notifyProps.length > 0">
              <template v-for="notifyProp in notifyProps">
                <span :key="notifyProp" class="ml-2">
                  <me-weapon-prop :id="notifyProp" />
                </span>
              </template>
            </span>
          </small>
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action-text>
        <div class="text-caption">
          {{ weaponDamage }}
        </div>
        <div class="mt-n2">
          {{ item.stats.damage.type }}
        </div>
      </v-list-item-action-text>
    </div>
    <div v-if="itemData.type !== 'melee'" class="d-flex align-start mx-6 mb-2">
      <v-btn x-small class="mr-1" color="primary" :icon="$vuetify.breakpoint.xsOnly" @click="reloadWeapon">
        <v-icon size="18">
          mdi-refresh
        </v-icon>
        <span v-if="$vuetify.breakpoint.smAndUp">Reload</span>
      </v-btn>
      <div style="width: 200px">
        <v-progress-linear
          :value="currentHeatPercent"
          height="6"
          class="mt-1"
          :color="`${heatColor}`"
          background-color="grey darken-2"
        />
        <div class="text-caption text-center">
          <small>
            {{ item.heat }} / {{ item.stats.heat }}
          </small>
        </div>
      </div>
      <v-btn x-small class="ml-1 mr-2" color="secondary" :icon="$vuetify.breakpoint.xsOnly" @click="fireWeapon">
        <v-icon size="18" :disabled="item.heat >= item.stats.heat">
          mdi-lightning-bolt
        </v-icon>
        <span v-if="$vuetify.breakpoint.smAndUp">Fire</span>
      </v-btn>
    </div>
  </div>
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
      return this.itemData.type === 'melee'
        ? this.finesse ? Math.max(this.dexMod, this.strMod) : this.strMod
        : this.recoil ? Math.max(this.dexMod, this.strMod) : this.dexMod
    },
    toHit () {
      const profBonus = this.proficiencies.weapon.includes(this.item.type) ? this.profBonus : 0
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
