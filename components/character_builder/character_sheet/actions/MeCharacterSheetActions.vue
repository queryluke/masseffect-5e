<template>
  <div>
    <me-character-sheet-card-title v-if="$vuetify.breakpoint.smAndDown">
      Actions & Features
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
        <div class="text-subtitle-1 mt-3">
          Attacks
        </div>
        <me-character-sheet-actions-gen-attack :item="unarmedStrike" />
        <me-character-sheet-actions-gen-attack v-if="hasGunStrike" :item="gunStrike" />
        <template v-for="(item, index) in otherAttacks">
          <me-character-sheet-actions-gen-attack :key="`weapon-action-${item}-${index}`" :item="item.has" />
        </template>
        <template v-for="(weapon, index) in csEquippedWeapons">
          <me-character-sheet-actions-weapon :key="`weapon-action-${weapon.id}-${index}`" :item="weapon" />
        </template>
        <template v-for="(atkPower, index) in csAttackPowers">
          <me-character-sheet-actions-power :key="`power-attack-${atkPower.power.id}-${index}`" :item="atkPower" />
        </template>
      </v-tab-item>
      <v-tab-item>
        <div class="text-subtitle-1 mt-3">
          Class Features
        </div>
        <template v-for="(klass, index) of characterClasses">
          <me-character-sheet-class-features :key="`klass-features-for-${klass.id}`" :class-index="index" />
        </template>
      </v-tab-item>
      <v-tab-item>
        <div class="text-subtitle-1 mt-3">
          Traits
        </div>
        <template v-for="trait of speciesTraits">
          <me-character-sheet-feature :key="`species-trait-${trait.id}`" :feature="trait" type="traits" />
        </template>
      </v-tab-item>
      <v-tab-item>
        <div class="text-subtitle-1 mt-3">
          Feats
        </div>
        <template v-for="feat of csFeats">
          <me-character-sheet-feature :key="`selected-feat-${feat.id}`" :feature="feat" type="feats" />
        </template>
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
      tabs: ['Attacks', 'Class Features', 'Traits', 'Feats'],
      unarmedStrike: {
        name: 'Unarmed Strike',
        range: 5,
        damage: {
          type: 'bludgeoning'
        },
        mod: 'str'
      },
      gunStrike: {
        name: 'Gun Strike',
        range: 5,
        damage: {
          type: 'bludgeoning',
          dieCount: 1,
          dieType: 4
        },
        mod: 'str'
      }
    }
  },
  computed: {
    csEquippedWeapons () {
      return this.csWeapons.filter(i => i.equipped)
    },
    hasGunStrike () {
      return this.csEquippedWeapons.filter(i => !Object.keys(i.mods).includes('grip')).length > 0
    },
    otherAttacks () {
      return this.selections.filter(i => i.type === 'attack')
    }
  }
}
</script>
