export const Weapons = {
  data () {
    return {
      gruntWeaponRarity: {
        0: ['Common'],
        1: ['Common', 'Uncommon'],
        2: ['Common', 'Uncommon', 'Rare'],
        3: ['Common', 'Uncommon', 'Rare', 'Very Rare']
      }
    }
  },
  methods: {
    setWeaponActions (config, grunt) {
      let availableAttacks = []
      let attacks = []
      attacks = this.getAttackOptions(config, grunt)
      // console.log(attacks)
      availableAttacks = attacks.filter(attack => {
        return attack.dpr >= config.targetDamage.dmgMin && attack.dpr <= config.targetDamage.dmgMax && attack.type !== 'Heavy Weapon'
      })
      // console.log(availableAttacks)
      if (availableAttacks.length < 1) {
        console.log('unable to meet necessary damage')
        console.log(attacks)
        const lowOrHigh = parseFloat(config.cr.cr) <= 1 ? 0 : attacks.length - 1
        availableAttacks = [attacks[lowOrHigh]]
      }
      // pick a random attack that falls within the dpr
      const attack = this.randomValue(availableAttacks)
      // set the actions for the grunt
      for (const weapon of attack.weapons) {
        grunt.actions.unshift(this.generateWeaponAttack(config.cr.profBonus, weapon))
      }
      // set legendary actions if needed
      if (attack.legendary) {
        grunt.legendaryActions = []
        for (const weapon of attack.weapons) {
          grunt.legendaryActions.push({
            name: `${weapon.name} Attack`,
            description: `The ${grunt.name} makes a ${weapon.name} attack.`,
            recharge: null
          })
        }
      }
      // Set multiattack if needed
      if (attack.numAttacks > 1) {
        grunt.actions.unshift({
          type: 'common',
          name: 'Multiattack',
          description: this.generateMultiattackDescription(grunt, attack)
        })
      }
      // chance of heavy weapons
      let heavyWeaponOptions = attacks.filter(attack => {
        return attack.dpr <= config.targetDamage.dmgMax && attack.type === 'Heavy Weapon'
      })
      if (heavyWeaponOptions.length > 0 && Math.floor(Math.random() * 100) > 85) {
        grunt.actions.push(this.generateWeaponAttack(config.cr.profBonus, this.randomValue(heavyWeaponOptions).weapons[0]))
      }
    },
    getAttackOptions (config, grunt) {
      const crMetaLevel = parseFloat(config.cr.cr) <= 1 ? 0 : Math.ceil(parseFloat(config.cr.cr) / 4)
      const weapons = this.getMutableData('weapons')
        .filter(weapon => weapon.damage !== null && this.gruntWeaponRarity[crMetaLevel].includes(weapon.rarity))
        .map(weapon => this.setWeaponDamage(weapon, grunt))
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

        for (let i = 1; i <= 3; i++) {
          if ((i > 1 && weapon.type === 'Heavy Weapon')) {
            continue
          }
          attacks.push({
            dpr: (weapon.attack.damage + weapon.attack.bonus + weapon.attack.extraDmg) * i,
            numAttacks: i,
            weapons: [weapon],
            type: weapon.type
          })
          // if cr >= 9, add legendary attack options
          if (crMetaLevel > 2) {
            attacks.push({
              dpr: ((weapon.attack.damage + weapon.attack.bonus + weapon.attack.extraDmg) * i) + ((weapon.attack.damage + weapon.attack.bonus + weapon.attack.extraDmg) * 3),
              numAttacks: i,
              weapons: [weapon],
              type: weapon.type,
              legendary: true
            })
          }
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
        const mainDpr = main.attack.damage + main.attack.bonus + main.attack.extraDmg

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
          const offDpr = off.attack.damage + off.attack.bonus + off.attack.extraDmg
          // single attack with each
          attacks.push({
            dpr: mainDpr + offDpr,
            numAttacks: 2,
            weapons: [main, off],
            type: 'dw'
          })
          // two attacks with each
          attacks.push({
            dpr: (mainDpr * 2) + (offDpr * 2),
            numAttacks: 4,
            weapons: [main, off],
            type: 'dw'
          })

          combinations.push(`${main.id}-${off.id}`)
        }
      }
      attacks.sort((a, b) => a.dpr - b.dpr)
      return attacks
    },
    generateMultiattackDescription (grunt, attack) {
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
