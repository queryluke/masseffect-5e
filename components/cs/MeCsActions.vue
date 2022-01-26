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
        :disabled="disableActionTab(cTab.type)"
      >
        {{ cTab.title }}
      </v-chip>
    </v-chip-group>
    <div v-for="(contentTab, index) in tabs" :key="`action-content-tab-${index}`">
      <me-cs-action-list v-if="contentTab.type && (tab === 0 || index === tab)" :items="csAllActions[contentTab.type]">
        {{ contentTab.title }}
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
      tabs: [
        { title: 'All', type: false },
        { title: 'Attacks', type: 'attack' },
        { title: 'Actions', type: 'action' },
        { title: 'Bonus Actions', type: 'bonusAction' },
        { title: 'Reactions', type: 'reaction' },
        { title: 'Other', type: 'other' }
      ]
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
        attack: this.csAttacks,
        action: this.csActions,
        bonusAction: this.csBonusActions,
        reaction: this.csReactions,
        other: this.csOtherActions
      }
    },
    csActions () {
      return [
        ...this.csWeaponsAsAttacks.actions
      ]
    },
    csAttacks () {
      return [
        ...this.csWeaponsAsAttacks.attacks
      ]
    },
    csBonusActions () {
      return [
        ...this.csWeaponsAsAttacks.bonusActions
      ]
    },
    csReactions () {
      return []
    },
    csOtherActions () {
      return []
    },
    csWeaponsAsAttacks () {
      const attacks = {
        bonusActions: [],
        actions: [],
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
        const base = {
          type: 'attack',
          name: weapon.stats.name,
          resource: this.getWeaponResource(weapon),
          range: this.getWeaponRange(weapon),
          damage: this.getWeaponDamage(weapon),
          notes: [...(weapon.stats.notes || []), ...weapon.stats.properties.map(i => weaponProps[i])],
          properties: [type]
        }

        attacks.attacks.push({ ...base, attack: toHit })

        if (light || dt) {
          const twfText = this.$vuetify.breakpoint.xsOnly ? '2W-Fight' : 'Two-Weapon Fighting'
          const baProps = light && dt
            ? [twfText, 'Double Tap']
            : light
              ? [twfText]
              : ['Double Tap']
          attacks.bonusActions.push({ ...base, attack: toHit, properties: [...base.properties, baProps] })
        }

        if (bf) {
          attacks.actions.push({
            ...base,
            range: this.getWeaponRange(weapon, true),
            resource: { ...base.resource, increment: 3 },
            dc: {
              base: 15,
              proficient: false,
              mod: false,
              save: 'dex'
            },
            properties: [...base.properties, 'Burst First']
          })
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
    getWeaponDamage (weapon) {
      const type = weapon.stats.type
      const weaponBonus = weapon.bonusDamage || 0
      const globalBonus = this.character.settings.damageMod
        ? this.character.settings.damageMod
        : type === 'melee' && this.character.settings.damageMeleeMod
          ? this.character.settings.damageMeleeMod
          : this.character.settings.damageRangedMod || 0
      return [
        {
          ...weapon.stats.damage,
          mod: this.getWeaponAbilityMod(weapon),
          bonus: {
            type: 'flat',
            value: weaponBonus + globalBonus
          }
        }
      ]
    },
    disableActionTab (type) {
      if (type) {
        return this.csAllActions[type].length < 1
      }
      return false
    }
  }
}
</script>
