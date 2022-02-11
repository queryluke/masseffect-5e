<template>
  <div class="mx-sm-4">
    <me-character-sheet-card-title v-if="$vuetify.breakpoint.smAndDown">
      Actions
    </me-character-sheet-card-title>
    <v-chip-group v-model="tab" active-class="primary--text" column>
      <v-chip
        v-for="(cTab, index) in tabs"
        :key="`action-chip-tab-${index}`"
        small
        :disabled="disableActionTab(cTab)"
      >
        {{ cTab }}
      </v-chip>
    </v-chip-group>
    <div v-show="showTab(1)">
      <me-cs-action-list :items="csAllActions.attacks">
        Attacks
        <template #notes>
          <div v-if="globalAttackNotes.length" class="mt-1 mb-2">
            <div v-for="(gNote, index) in globalAttackNotes" :key="`gNote-${index}`" class="d-flex text-caption">
              <v-icon size="16" class="mr-1">
                {{ gNote.attack === 'ranged' ? 'mdi-target' : gNote === 'melee' ? 'mdi-sword' : 'mdi-octagram' }}
              </v-icon>
              <me-html inline :content="gNote.value" />
            </div>
          </div>
        </template>
      </me-cs-action-list>
    </div>
    <div v-show="showTab(2)">
      <me-cs-action-list :items="csAllActions.actions">
        Actions
      </me-cs-action-list>
    </div>
    <div v-show="showTab(3)">
      <me-cs-action-list :items="csAllActions.bonusActions">
        Bonus Actions
      </me-cs-action-list>
    </div>
    <div v-show="showTab(4)">
      <me-cs-action-list :items="csAllActions.reactions">
        Reactions
      </me-cs-action-list>
    </div>
    <div v-show="showTab(5)">
      <me-cs-action-list :items="csAllActions.other">
        Other Features
      </me-cs-action-list>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  data () {
    return {
      tab: 0,
      tabs: ['All', 'Attacks', 'Actions', 'Bonus Actions', 'Reactions', 'Other']
    }
  },
  computed: {
    ...mapGetters({
      mechanics: 'mechanics/mechanics',
      character: 'character',
      powers: 'powers/powers',
      equippedWeapons: 'equipment/equippedWeapons',
      profs: 'profs/profs',
      abilityBreakdown: 'abilities/abilityBreakdown',
      weaponAttacks: 'equipment/weaponAttacks'
    }),
    weaponProperties () {
      return this.$store.getters.getData('weapon-properties')
    },
    actionsList () {
      return this.$store.getters.getData('actions')
    },
    csAllActions () {
      return {
        attacks: this.csAttacks,
        actions: this.csActions,
        bonusActions: this.csBonusActions,
        reactions: this.csReactions,
        other: this.csOtherActions
      }
    },
    csActions () {
      return [
        {
          base: true,
          title: 'Actions in Combat',
          items: this.actionsList.filter(i => i.type === 'action')
        },
        ...[{
          group: true,
          title: 'Burst Fire',
          items: this.weaponAttacks.bf
        },
        {
          group: true,
          title: 'Powers',
          items: this.csPowersAsActions.actions
        }].filter(i => i.items.length),
        ...this.mechanics.filter(i => i.type === 'action'),
        ...this.csCustomAsActions.actions
      ]
    },
    csAttacks () {
      return [
        ...this.weaponAttacks.attacks,
        ...this.csPowersAsActions.attacks
      ]
    },
    globalAttackNotes () {
      return this.mechanics.filter(i => i.type === 'global-attack-note').sort((a, b) => a.attack > b.attack ? 1 : -1)
    },
    csBonusActions () {
      return [
        ...[{
          group: true,
          title: 'Two Weapon Fighting',
          items: this.weaponAttacks.twf
        },
        {
          group: true,
          title: 'Double Tap',
          items: this.weaponAttacks.dt
        },
        {
          group: true,
          title: 'Powers',
          items: this.csPowersAsActions.bonus_actions
        }].filter(i => i.items.length),
        ...this.mechanics.filter(i => i.type === 'bonus-action'),
        ...this.csCustomAsActions.bonus
      ]
    },
    csReactions () {
      return [
        {
          base: true,
          title: 'Actions in Combat',
          items: this.actionsList.filter(i => i.type === 'reaction')
        },
        ...[{
          group: true,
          title: 'Powers',
          items: this.csPowersAsActions.reactions
        }].filter(i => i.items.length),
        ...this.mechanics.filter(i => i.type === 'reaction'),
        ...this.csCustomAsActions.reactions
      ]
    },
    csOtherActions () {
      return [
        ...this.mechanics.filter(i => i.type === 'other')
      ]
    },
    csCustomAsActions () {
      const brew = this.character.brews
        .filter(i => ['action', 'reaction', 'bonus-action'].includes(i.type))
        .map((i) => {
          return {
            name: i.name,
            type: i.type,
            resource: i.mechanics.uses
              ? {
                  displayType: 'checkbox',
                  reset: i.mechanics.recharge,
                  max: { type: 'flat', value: i.mechanics.uses },
                  id: i.id
                }
              : false,
            moreInfo: {
              bind: i.html
            }
          }
        })
      return {
        actions: brew.filter(i => i.type === 'action'),
        bonus: brew.filter(i => i.type === 'bonus-action'),
        reactions: brew.filter(i => i.type === 'reaction')
      }
    },
    csPowersAsActions () {
      const sortedPowers = this.powers.slice().sort((a, b) => a.level - b.level)
      return {
        actions: sortedPowers.filter(i => i.castingTimes.includes('1A')),
        attacks: sortedPowers.filter(i => i.castingTimes.includes('Atk')),
        bonus_actions: sortedPowers.filter(i => i.castingTimes.includes('1BA')),
        reactions: sortedPowers.filter(i => i.castingTimes.includes('1R*'))
      }
    }
  },
  methods: {
    disableActionTab (typeString) {
      if (typeString === 'All') {
        return false
      }
      const type = typeString === 'Bonus Actions' ? 'bonusActions' : typeString.toLowerCase()
      if (type) {
        return this.csAllActions[type].length < 1
      }
      return false
    },
    showTab (index) {
      if (this.tab === 0) {
        return true
      }
      return this.tab === index
    },
    getWeaponResource (weapon) {
      // Resource (i.e. Heat)
      let resource = null
      if (weapon.data.heat) {
        resource = {
          displayType: 'heat',
          reset: 'manual',
          max: {
            type: 'flat',
            value: weapon.data.heat,
            min: 0
          },
          id: weapon.uuid
        }
      }
      return resource
    },
    getWeaponRange (weapon, bf = false) {
      const type = weapon.data.type
      const reach = weapon.data.properties.includes('reach')
      const range = weapon.data.range
      const hf = weapon.data.properties.includes('hip-fire')
      const shortRange = type === 'melee'
        ? reach ? 10 : 5
        : range
      const longRange = type === 'melee' ? null : type === 'shotgun' ? (range * 2) : (range * 3)
      const aoe = bf
        ? { type: 'cube', size: 10 }
        : false
      return {
        short: shortRange,
        long: bf ? null : longRange,
        aoe,
        note: hf ? 'Hip Fire' : false
      }
    },
    getWeaponAttack (weapon) {
      const type = weapon.data.type
      const weaponBonus = weapon.bonusHit || 0
      const globalBonus = this.character.settings.attackMod
        ? this.character.settings.attackMod
        : type === 'melee' && this.character.settings.attackMeleeMod
          ? this.character.settings.attackMeleeMod
          : this.character.settings.attackRangedMod || 0
      return {
        proficient: this.profs.weapon.includes(type),
        mod: this.getWeaponAbilityMod(weapon),
        bonus: {
          type: 'flat',
          value: weaponBonus + globalBonus
        }
      }
    },
    getWeaponAbilityMod (weapon) {
      // TODO: potential overrides like shoulder mounts
      const finesse = weapon.data.properties.includes('finesse')
      const recoil = weapon.data.properties.includes('recoil')
      const dexOrStr = this.abilityBreakdown.dex.mod > this.abilityBreakdown.str.mod ? 'dex' : 'str'
      return recoil || finesse
        ? dexOrStr
        : weapon.data.type === 'melee'
          ? 'str'
          : 'dex'
    },
    getWeaponDamage (weapon, negativeModOnly) {
      const type = weapon.data.type
      const weaponBonus = weapon.bonusDamage || 0
      const globalBonus = this.character.settings.damageMod
        ? this.character.settings.damageMod
        : type === 'melee' && this.character.settings.damageMeleeMod
          ? this.character.settings.damageMeleeMod
          : this.character.settings.damageRangedMod || 0
      let mod = this.getWeaponAbilityMod(weapon)
      if (negativeModOnly) {
        const modScore = this.abilityBreakdown[mod].mod
        if (modScore > 0) {
          mod = false
        }
      }
      return [
        {
          ...weapon.data.damage,
          mod,
          bonus: {
            type: 'flat',
            value: weaponBonus + globalBonus
          }
        }
      ]
    }
  }
}
</script>
