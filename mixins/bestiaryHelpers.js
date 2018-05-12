import {AverageFromDie} from './averageFromDie'

export const BestiaryHelpers = {
  methods: {
    generateGrenadeAttack (grenade) {
      const description = grenade.desc.map(line => line.data).join(' ')
      const numGrenades = grenade.id === 'smoke_grenade' ? '1 grenade' : '3 grenades'
      return {
        type: 'common',
        name: grenade.name,
        recharge: numGrenades,
        description
      }
    },
    setFeatureDamage (feature, cr) {
      const featureCopy = Object.assign({}, feature)
      const crMetaLevel = Math.ceil(parseFloat(cr) / 4)
      if (featureCopy.id === 'relentless') {
        featureCopy.crEffect *= crMetaLevel
      }
      if (/\[dmg]/.test(featureCopy.description)) {
        const dmgArray = featureCopy.crEffect.split('d')
        const numDie = parseInt(dmgArray[0], 10) * crMetaLevel
        const avgDamage = Math.floor(((parseInt(dmgArray[1], 10) + 1) / 2) * numDie)
        featureCopy.crEffect = avgDamage
        const dmgDisplay = `${avgDamage} (${numDie}d${dmgArray[1]})`
        featureCopy.description = featureCopy.description.replace(/\[dmg]/g, dmgDisplay)
      }
      return featureCopy
    },
    setWeaponDamage (weapon, npc) {
      const strBonus = this.abilityScoreBonus(npc.abilityScores.str)
      const dexBonus = this.abilityScoreBonus(npc.abilityScores.dex)
      const bruteMod = npc.features ? npc.features.find(feature => feature.id === 'brute') : false
      weapon.attack = {}
      if (weapon.type === 'Melee' && bruteMod) {
        weapon.rof += 1
      }
      weapon.attack.damage = this.averageFromDie(weapon.damage)
      weapon.attack.extraDmg = weapon.addDmg ? parseInt(weapon.addDmg, 10) : 0
      // add str or dex to melee dpr
      if (weapon.type === 'Melee') {
        let finalBonus = 0
        if (/finesse/gi.test(weapon.tags)) {
          finalBonus = strBonus >= dexBonus ? strBonus : dexBonus
        } else {
          finalBonus = strBonus
        }
        weapon.attack.bonus = finalBonus
      } else if (weapon.type === 'Heavy Weapon') {
        weapon.attack.bonus = 0
      } else {
        weapon.attack.bonus = dexBonus
      }
      return weapon
    },
    generateWeaponAttack (profBonus, weapon) {
      profBonus = parseInt(profBonus, 10)
      // Heavy weapons
      if (weapon.type === 'Heavy Weapon') {
        return {
          type: 'common',
          name: weapon.name,
          recharge: `Charges ${weapon.heat}`,
          description: weapon.notes.map(n => n.data).join(' ')
        }
      }
      // Other special weapons
      if (weapon.id === 'm-37_falcon') {
        return {
          type: 'common',
          name: weapon.name,
          description: `Target a creature within  ${weapon.range}. It makes a DC ${8 + weapon.bonus + profBonus} Dexterity saving throw, taking ${weapon.dpr} (${weapon.damage}) thunder damage on a failed save, or have as much damage on a successful one.`
        }
      }
      if (weapon.id === 'venom_shotgun') {
        return {
          type: 'common',
          name: weapon.name,
          description: `Target a creature within  ${weapon.range}. It makes a DC 13 Dexterity saving throw, taking ${weapon.dpr} (${weapon.damage}) thunder damage on a failed save, or have as much damage on a successful one.`
        }
      }

      let bonusText = ''
      if (weapon.attack.bonus > 0) {
        bonusText = ` + ${weapon.attack.bonus}`
      } else if (weapon.attack.bonus < 0) {
        bonusText = ` - ${weapon.attack.bonus * -1}`
      }
      const reachOrRange = weapon.type === 'Melee' ? 'reach' : 'range'
      const longRangeMultiplier = weapon.type === 'Shotgun' ? 2 : 3
      const rangeString = weapon.type === 'Melee' || weapon.type === 'Heavy Weapon' ? `${weapon.range}m` : `(${weapon.range}m/${Number.parseInt(weapon.range, 10) * longRangeMultiplier}m)`
      const hipFire = /hip/gi.test(weapon.tags) ? ' & hip fire' : ''
      const target = weapon.id === 'n7_piranha' ? 'all creatures in 4m cone' : 'one target'
      const additionalHitMechanics = weapon.npcHit ? `, and ${weapon.npcHit}` : '.'
      const toHit = profBonus + weapon.attack.bonus >= 0 ? `+${profBonus + weapon.attack.bonus}` : profBonus + weapon.attack.bonus

      const description = {
        attack: `${toHit} to hit, ${reachOrRange} ${rangeString}${hipFire}, ${target}.`,
        hit: `${Math.floor(weapon.attack.damage + weapon.attack.bonus)} (${weapon.damage}${bonusText}) ${weapon.dmgType} damage${additionalHitMechanics}`,
        miss: null
      }

      // Miss mechanics
      if (weapon.id === 'scorpion') {
        description.miss = '2 (1d4) thunder damage'
      }

      return {
        type: 'attack',
        name: weapon.name,
        attackType: weapon.type === 'Melee' ? 'Melee' : 'Ranged',
        description
      }
    }
  },
  mixins: [AverageFromDie]
}
