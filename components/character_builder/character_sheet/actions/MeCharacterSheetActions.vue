<template>
  <div>
    <me-character-sheet-card-title>
      Actions
    </me-character-sheet-card-title>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-list dense three-line>
          <v-subheader>
            Weapon Attacks
          </v-subheader>
          <template v-for="weapon in csWeapons.filter(i => i.equipped)">
            <me-character-sheet-actions-weapon :key="`weapon-action-${weapon.id}`" :item="weapon" />
            <v-divider :key="`weapon-action-${weapon.id}-divider`" />
          </template>
          <v-subheader>
            Grenades
          </v-subheader>
          <template v-for="item in csGear.filter(i => i.subType === 'grenade')">
            <me-character-sheet-actions-limited-use :key="`grenade-${item.id}`" :item="item" type="gear" />
          </template>
          <v-subheader>
            Heavy Weapons
          </v-subheader>
          <template v-for="item in csGear.filter(i => i.subType === 'heavy_weapon')">
            <me-character-sheet-actions-limited-use :key="`hw-${item.id}`" :item="item" type="gear" />
          </template>
        </v-list>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  data () {
    return {
      tab: 0,
      tabs: ['Actions', 'Bonus Actions', 'Reactions', 'Limited Use']
    }
  }
}
</script>
