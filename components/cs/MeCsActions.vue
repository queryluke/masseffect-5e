<template>
  <div class="mx-n3 mx-sm-4">
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
    ...mapGetters({ mechanics: 'mechanics/mechanics', character: 'character' }),
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
          items: this.csPowersAsActions.action
        }].filter(i => i.items.length),
        ...this.mechanicBag.filter(i => i.type === 'action'),
        ...this.csCustomAsAsctions.action
      ]
    },
    csAttacks () {
      return [
        ...this.csWeaponsAsAttacks.attacks,
        ...this.csPowersAsActions.attack,
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
          items: this.csPowersAsActions.bonus_action
        }].filter(i => i.items.length),
        ...this.mechanics.filter(i => i.type === 'bonus-action'),
        ...this.csCustomAsAsctions.bonus
      ]
    },
    csReactions () {
      return [
        ...[{
          group: true,
          title: 'Powers',
          items: this.csPowersAsActions.reaction
        }].filter(i => i.items.length),
        ...this.mechanics.filter(i => i.type === 'reaction'),
        ...this.csCustomAsAsctions.reaction
      ]
    },
    csOtherActions () {
      return [
        ...this.mechanics.filter(i => i.type === 'other')
      ]
    },
    csCustomAsAsctions () {
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
        action: brew.filter(i => i.type === 'action'),
        bonus: brew.filter(i => i.type === 'bonus-action'),
        reaction: brew.filter(i => i.type === 'reaction')
      }
    },
    csPowersAsActions () {
      const powers = {
        action: [],
        bonus_action: [],
        reaction: [],
        attack: []
      }
      const allPowers = this.csAllPowers
      for (const p of allPowers) {
        const levelText = p.power.level
          ? this.$tc(`ordinal_numbers[${p.power.level}]`)
          : 'cantrip'
        // TODO: overrides?
        const mod = p.power.type === 'tech'
          ? 'int'
          : p.power.type === 'biotic'
            ? 'wis'
            : p.power.mod === 'noMod'
              ? false
              : p.power.mod
        let toHit = false
        if (p.power.attack.melee || p.power.attack.ranged) {
          toHit = {
            proficient: true,
            mod: p.power.id === 'hawk-missile-launcher' ? false : mod
          }
        }
        const resource = p.power.type === 'combat'
          ? { reset: p.power.recharge, max: { type: 'flat', value: p.power.uses }, id: p.power.id }
          : p.csData.resource || false
        let dc = false
        if (!toHit) {
          const powerSaves = Object.entries(p.power.save)
          if (powerSaves.some(i => i[1])) {
            dc = {
              base: 8,
              proficient: true,
              mod,
              save: powerSaves.find(i => i[1])[0]
            }
          }
        }

        const base = {
          name: p.power.name,
          resource,
          range: {
            short: p.power.range,
            aoe: p.power.aoe
          },
          attack: toHit,
          notes: p.csData.advancement ? [`Adv: ${p.csData.advancement}`] : [],
          properties: [p.power.type, levelText],
          dc,
          moreInfo: {
            component: 'me-power-info',
            bind: p.power
          }
        }
        for (const casting of ['action', 'bonus_action', 'reaction', 'attack']) {
          if (p.power.castingTimes.includes(casting)) {
            powers[casting].push({ ...base, type: casting })
          }
        }
      }
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
      if (this.csWeapons.filter(i => i.equipped && i.stats.type === 'ranged')) {
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
