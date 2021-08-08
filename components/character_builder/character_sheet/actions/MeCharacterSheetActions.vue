<template>
  <div>
    <me-character-sheet-card-title v-if="$vuetify.breakpoint.smAndDown">
      Actions
    </me-character-sheet-card-title>
    <v-chip-group v-model="tab" active-class="primary--text" column>
      <v-chip
        v-for="(cTab, index) in tabs"
        :key="`action-chip-tab-${index}`"
        small
      >
        {{ cTab }}
      </v-chip>
    </v-chip-group>
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
        </v-list>
      </v-tab-item>
      <v-tab-item>
        Bonus Actions
      </v-tab-item>
      <v-tab-item>
        Reactions
      </v-tab-item>
      <v-tab-item>
        Limited Use
      </v-tab-item>
      <v-tab-item>
        <me-character-sheet-equipment-gear-list />
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
      tabs: ['Actions', 'Bonus Actions', 'Reactions', 'Limited Use', 'Gear']
    }
  }
}
</script>
