export const Weapons = {
  methods: {
    setWeaponActions(config, grunt) {
      const weapons = this.getMutableData('weapons')
        .filter(weapon => weapon.dmg !== null)
        .map(weapon => this.setWeaponDamage(weapon, grunt))
      const attacks = this.getAttackOptions(config, weapons)
      let availableAttacks = attacks.filter(attack => {
        return attack.dpr >= config.targetDamage.dmgMin && attack.dpr <= config.targetDamage.dmgMax
      })
      if (availableAttacks.length < 1) {
        availableAttacks = [attacks[0]]
      }
      const attack = this.randomValue(availableAttacks)
      for (const weapon of attack.weapons) {
        grunt.actions.unshift(this.generateWeaponAttack(config.cr.profBonus, weapon))
      }
      if (attack.numAttacks > 1) {
        grunt.actions.unshift({
          type: 'common',
          name: 'Multiattack',
          description: this.generateMultiattackDescription(grunt, attack)
        })
      }
    },
    getAttackOptions(config, weapons) {
      const attacks = []

      for (const weapon of weapons) {
        // filter heavy weapons
        if (!config.allowHeavyWeapons && weapon.type === 'Heavy Weapon') {
          continue
        }
        // filter melee weapons
        if (!config.allowMeleeWeapons && weapon.type === 'Melee') {
          continue
        }

        for (let i = 1 i <= 3 i++) {
          if ((i > 1 && weapon.type === 'Heavy Weapon') ||
            (i > 2 && ((weapon.type === 'Heavy Weapon' || weapon.type === 'Sniper Rifle') || weapon.heat < 3))) {
            continue
          }
          attacks.push({
            dpr: (weapon.attack.dpr + weapon.attack.bonus + weapon.attack.extraDmg) * i,
            numAttacks: i,
            weapons: [weapon]
          })
        }
      }

      // dual wielding
      const dualOpts = weapons.filter(weapon => {
        return (weapon.type === 'Heavy Pistol' || weapon.type === 'SMG' || weapon.type === 'Melee') && !/two/gi.test(weapon.tags)
      })
      const combinations = []

      for (const main of dualOpts) {
        // filter melee weapons
        if (!config.allowMeleeWeapons && main.type === 'Melee') {
          continue
        }
        const mainDpr = main.attack.dpr + main.attack.bonus + main.attack.extraDmg

        // each possible off-hand
        for (const off of dualOpts) {
          // filter out melee off-hands if melee turned off
          if (!config.allowMeleeWeapons && main.type === 'Melee') {
            continue
          }
          // Only allow melee/weapon combos if melee has hip fire
          if ((main.type === 'Melee' && (off.type !== 'Melee' && !/hip/gi.test(off.tags))) ||
            (off.type === 'Melee' && (main.type !== 'Melee' && !/hip/gi.test(off.tags)))) {
            continue
          }
          // filter out existing combos
          if (combinations.includes(`${main.id}-${off.id}`) || combinations.includes(`${off.id}-${main.id}`)) {
            continue
          }
          const offDpr = off.attack.dpr + off.attack.bonus + off.attack.extraDmg
          // single attack with each
          attacks.push({
            dpr: mainDpr + offDpr,
            numAttacks: 2,
            weapons: [main, off]
          })
          // two attacks with each
          attacks.push({
            dpr: (mainDpr * 2) + (offDpr * 2),
            numAttacks: 4,
            weapons: [main, off]
          })

          combinations.push(`${main.id}-${off.id}`)
        }
      }
      attacks.sort((a, b) => a.dpr - b.dpr)
      return attacks
    },
    generateMultiattackDescription(grunt, attack) {
      const name = grunt.sc.id === 'none' ? 'grunt' : grunt.sc.id
      const words = ['', 'one', 'two', 'three', 'four']
      const plural = attack.numAttacks > 1 ? 's' : ''
      let text = `The ${name} makes`
      if (attack.weapons.length > 1) {
        if (attack.weapons[0].type === 'Melee' && attack.weapons[1].type === 'Melee') {
          text += ` ${words[attack.numAttacks]} melee attack${plural}`
        } else if (attack.weapons[0].id === attack.weapons[1].id) {
          text += ` ${words[attack.numAttacks]} ${attack.weapons[0].name} attack${plural}, one in each hand.`
        } else {
          const halfWord = words[attack.numAttacks / 2]
          text += ` ${words[attack.numAttacks]} attacks: ${halfWord} with its ${attack.weapons[0].name} and ${halfWord} with its ${attack.weapons[1].name}`
        }
      } else {
        text += ` ${words[attack.numAttacks]} ${attack.weapons[0].name} attack${plural}`
      }
      return text
    }
  }
}
