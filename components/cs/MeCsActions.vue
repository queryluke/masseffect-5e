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
      abilityBreakdown: 'abilities/abilityBreakdown'
    }),
    weaponProperties () {
      return this.$store.getters.getData('weapon-properties')
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
        ...[{
          group: true,
          title: 'Burst Fire',
          items: this.csWeaponsAsAttacks.bf
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
        ...this.csWeaponsAsAttacks.attacks,
        ...this.csPowersAsActions.attacks,
        ...this.mechanics.filter(i => i.type === 'attack'),
        ...this.unarmedAndGunStrike
      ]
    },
    csBonusActions () {
      return [
        ...[{
          group: true,
          title: 'Two Weapon Fighting',
          items: this.csWeaponsAsAttacks.twf
        },
        {
          group: true,
          title: 'Double Tap',
          items: this.csWeaponsAsAttacks.dt
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
              ? { displayType: 'checkbox', reset: i.mechanics.recharge, max: { type: 'flat', value: i.mechanics.uses }, id: i.id }
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
    },
    csWeaponsAsAttacks () {
      const attacks = {
        twf: [],
        dt: [],
        bf: [],
        attacks: []
      }
      const weaponProps = {}
      for (const prop of this.weaponProperties) {
        weaponProps[prop.id] = prop.name
      }
      for (const weapon of this.equippedWeapons) {
        const toHit = this.getWeaponAttack(weapon)
        const light = weapon.data.properties.includes('light')
        const dt = weapon.data.properties.includes('double-tap')
        const bf = weapon.data.properties.includes('burst-fire')
        // TODO: thrown
        // const thrown = weapon.data.properties.includes('thrown')
        // TODO: arc
        // const ar = weapon.data.properties.includes('arc')
        const type = weapon.data.type === 'melee' ? 'Melee' : 'Ranged'
        let damage = this.getWeaponDamage(weapon)
        const base = {
          type: 'attack',
          name: weapon.data.name,
          resource: this.getWeaponResource(weapon),
          range: this.getWeaponRange(weapon),
          notes: [...(weapon.data.notes || []), ...weapon.data.properties.map(i => weaponProps[i])],
          properties: [type],
          moreInfo: {
            component: 'me-weapon-info',
            bind: weapon.data
          }
        }
        attacks.attacks.push({ ...base, attack: toHit, damage })

        if (bf) {
          attacks.bf.push({
            ...base,
            range: this.getWeaponRange(weapon, true),
            resource: { ...base.resource, increment: 3 },
            dc: {
              base: 15,
              proficient: false,
              mod: false,
              save: 'dex'
            },
            damage,
            properties: [...base.properties, 'Burst Fire']
          })
        }
        damage = this.getWeaponDamage(weapon, true)
        if (light) {
          attacks.twf.push({ ...base, attack: toHit, properties: [...base.properties, '2W-Fight'], damage })
        }
        if (dt) {
          attacks.dt.push({ ...base, attack: toHit, properties: [...base.properties, 'Double Tap'], damage })
        }
      }
      return attacks
    },
    unarmedAndGunStrike () {
      const atks = [
        {
          name: 'Unarmed Strike',
          range: {
            short: 5
          },
          attack: {
            proficient: true,
            mod: 'str'
          },
          damage: [
            {
              dieCount: 1,
              type: 'bludgeoning',
              mod: 'str'
            }
          ],
          properties: ['Melee']
        }
      ]
      if (this.equippedWeapons.filter(i => i.data.type === 'ranged')) {
        atks.push({
          name: 'Gun Strike',
          range: {
            short: 5
          },
          attack: {
            proficient: true,
            mod: 'str'
          },
          damage: [
            {
              dieCount: 1,
              dieType: 4,
              type: 'bludgeoning',
              mod: 'str'
            }
          ],
          properties: ['Melee']
        })
      }
      return atks
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
