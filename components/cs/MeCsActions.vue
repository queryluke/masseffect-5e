<template>
  <div class="mx-n3 mx-sm-4">
    <me-character-sheet-card-title v-if="$vuetify.breakpoint.smAndDown">
      Actions & Features
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
        Other Actions
      </me-cs-action-list>
    </div>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  data () {
    return {
      tab: 0,
      tabs: ['All', 'Attacks', 'Actions', 'Bonus Actions', 'Reactions', 'Other']
    }
  },
  /*
  computed: {
    hasGunStrike () {
      return this.csEquippedWeapons.filter(i => !Object.keys(i.mods).includes('grip')).length > 0
    },
    otherAttacks () {
      return this.selections.filter(i => i.type === 'attack')
    },
    brews () {
      return this.character.brews || []
    },
    hasActionBrews () {
      return this.brews.filter(i => ['action', 'bonus-action', 'reaction'].includes(i.type))
    }
  },
  */
  computed: {
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
          group: true,
          title: 'Burst Fire',
          items: this.csWeaponsAsAttacks.bf
        }
      ]
    },
    csAttacks () {
      return [
        ...this.csWeaponsAsAttacks.attacks
      ]
    },
    csBonusActions () {
      return [
        {
          group: true,
          title: 'Two Weapon Fighting',
          items: this.csWeaponsAsAttacks.twf
        },
        {
          group: true,
          title: 'Double Tap',
          items: this.csWeaponsAsAttacks.dt
        }
      ]
    },
    csReactions () {
      return []
    },
    csOtherActions () {
      return []
    },
    csPowersAsActions () {
      const powers = {
        actions: [],
        bonusActions: [],
        reactions: [],
        attacks: []
      }
      console.log(this.csAllPowers)
      return powers
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
      const equippedWeapons = this.csWeapons.filter(i => i.equipped)
      for (const w of equippedWeapons) {
        const weapon = { ...w, stats: { ...this.equipmentData('weapons', w.id), ...w.stats } }
        const toHit = this.getWeaponAttack(weapon)
        const light = weapon.stats.properties.includes('light')
        const dt = weapon.stats.properties.includes('double-tap')
        const bf = weapon.stats.properties.includes('burst-fire')
        // TODO: thrown
        // const thrown = weapon.stats.properties.includes('thrown')
        // TODO: arc
        // const thrown = weapon.stats.properties.includes('thrown')
        const type = weapon.stats.type === 'melee' ? 'Melee' : 'Ranged'
        let damage = this.getWeaponDamage(weapon)
        const base = {
          type: 'attack',
          name: weapon.stats.name,
          resource: this.getWeaponResource(weapon),
          range: this.getWeaponRange(weapon),
          notes: [...(weapon.stats.notes || []), ...weapon.stats.properties.map(i => weaponProps[i])],
          properties: [type],
          moreInfo: {
            component: 'me-weapon-info',
            bind: weapon.stats
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
          const twfText = this.$vuetify.breakpoint.xsOnly ? '2W-Fight' : 'Two-Weapon Fighting'
          attacks.twf.push({ ...base, attack: toHit, properties: [...base.properties, twfText], damage })
        }
        if (dt) {
          attacks.dt.push({ ...base, attack: toHit, properties: [...base.properties, 'Double Tap'], damage })
        }
      }
      attacks.attacks.push({
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
        ]
      })
      if (equippedWeapons.length) {
        attacks.attacks.push({
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
          ]
        })
      }
      return attacks
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
      if (weapon.stats.heat) {
        resource = {
          displayType: 'heat',
          reset: 'manual',
          max: {
            type: 'flat',
            value: weapon.stats.heat,
            min: 0
          },
          id: weapon.uuid
        }
      }
      return resource
    },
    getWeaponRange (weapon, bf = false) {
      const type = weapon.stats.type
      const reach = weapon.stats.properties.includes('reach')
      const range = weapon.stats.range
      const hf = weapon.stats.properties.includes('hip-fire')
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
      const type = weapon.stats.type
      const weaponBonus = weapon.bonusHit || 0
      const globalBonus = this.character.settings.attackMod
        ? this.character.settings.attackMod
        : type === 'melee' && this.character.settings.attackMeleeMod
          ? this.character.settings.attackMeleeMod
          : this.character.settings.attackRangedMod || 0
      return {
        proficient: this.proficiencies.weapon.includes(type),
        mod: this.getWeaponAbilityMod(weapon),
        bonus: {
          type: 'flat',
          value: weaponBonus + globalBonus
        }
      }
    },
    getWeaponAbilityMod (weapon) {
      // TODO: potential overrides like shoulder mounts
      const finesse = weapon.stats.properties.includes('finesse')
      const recoil = weapon.stats.properties.includes('recoil')
      return recoil || finesse
        ? this.csHigherOfStrOrDex
        : weapon.stats.type === 'melee'
          ? 'str'
          : 'dex'
    },
    getWeaponDamage (weapon, negativeModOnly) {
      const type = weapon.stats.type
      const weaponBonus = weapon.bonusDamage || 0
      const globalBonus = this.character.settings.damageMod
        ? this.character.settings.damageMod
        : type === 'melee' && this.character.settings.damageMeleeMod
          ? this.character.settings.damageMeleeMod
          : this.character.settings.damageRangedMod || 0
      let mod = this.getWeaponAbilityMod(weapon)
      if (negativeModOnly) {
        const modScore = this.absMod(mod)
        if (modScore > 0) {
          mod = false
        }
      }
      return [
        {
          ...weapon.stats.damage,
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
