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
        <div class="text-subtitle-1 mt-3">
          Weapon Attacks
        </div>
        <me-character-sheet-actions-gen-attack :item="unarmedStrike" />
        <me-character-sheet-actions-gen-attack v-if="hasGunStrike" :item="gunStrike" />
        <template v-for="(item, index) in otherAttacks">
          <me-character-sheet-actions-gen-attack :key="`weapon-action-${item}-${index}`" :item="item.has" />
        </template>
        <template v-for="(weapon, index) in csEquippedWeapons">
          <me-character-sheet-actions-weapon :key="`weapon-action-${weapon.id}-${index}`" :item="weapon" />
        </template>

        <div class="text-subtitle-1 mt-3">
          Power Attacks
        </div>
        <template v-for="(atkPower, index) in csAttackPowers">
          <me-character-sheet-actions-power :key="`power-attack-${atkPower.power.id}-${index}`" :item="atkPower" />
        </template>
      </v-tab-item>
      <v-tab-item>
        <div class="text-subtitle-1 mt-3">
          Standard Combat Actions
        </div>
        <p class="text-caption">
          Attack, Cast a Power, Dash, Disengage, Dodge, Grapple, Help, Hide, Ready, Reload, Search, Shove, Use an Object
        </p>
        <template v-for="(action, index) in csActions">
          <me-character-sheet-actions-ftf :key="`action-ftf-${action.has.id}-${index}`" :item="action" />
        </template>
      </v-tab-item>
      <v-tab-item>
        <div class="text-subtitle-1 mt-3">
          Powers
        </div>
        <p class="text-caption">
          {{ powerBonusActions }}
        </p>
        <template v-for="(bAction, index) in csBonusActions">
          <me-character-sheet-actions-ftf :key="`action-ftf-${bAction.has.id}-${index}`" :item="bAction" />
        </template>
      </v-tab-item>
      <v-tab-item>
        <v-tab-item>
          <div class="text-subtitle-1 mt-3">
            Powers
          </div>
          <p class="text-caption">
            {{ powerReactions }}
          </p>
          <template v-for="(bAction, index) in csBonusActions">
            <me-character-sheet-actions-ftf :key="`action-ftf-${bAction.has.id}-${index}`" :item="bAction" />
          </template>
        </v-tab-item>
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
      tabs: ['Attacks', 'Actions', 'Bonus Actions', 'Reactions', 'Limited Use', 'Gear'],
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
    csActions () {
      return this.selections.filter(i => i.type === 'action' && ['class-features', 'traits', 'feats'].includes(i.subType))
    },
    otherAttacks () {
      return this.selections.filter(i => i.type === 'attack')
    },
    powerBonusActions () {
      return this.csAllPowers.filter(i => i.power.castingTimes.includes('bonus_action')).map(i => i.power.name).join(', ')
    },
    powerReactions () {
      return this.csAllPowers.filter(i => i.power.castingTimes.includes('reaction')).map(i => i.power.name).join(', ')
    },
    csBonusActions () {
      return this.selections.filter(i => i.type === 'bonus' && ['class-features', 'traits', 'feats'].includes(i.subType))
    },
    csReactions () {
      return this.selections.filter(i => i.type === 'reaction' && ['class-features', 'traits', 'feats'].includes(i.subType))
    }
  }
}
</script>
