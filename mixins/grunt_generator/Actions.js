export const Actions = {
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
    setGruntActions () {
      this.grunt.actions = []
      this.grunt.legendaryActions = []
      const attackOptions = this.getAttackOptions()
      const filteredAttackOptions = attackOptions.filter(ao => ao.dpr >= this.cr.dmgMin && ao.dpr <= this.cr.dmgMax)
      const attack = filteredAttackOptions.length > 0 ? this.randomValue(filteredAttackOptions) : attackOptions.pop()
      this.dpr.weapon = attack.dpr
      // Add multi-attack
      if (attack.numAttacks > 1) {
        this.grunt.actions.push({
          type: 'standard',
          name: 'Multiattack',
          description: this.generateMultiattackDescription(attack)
        })
      }
      // Add weapons
      for (const weapon of attack.weapons) {
        this.grunt.actions.push(this.generateWeaponAction(weapon))
        if (weapon.attack.bonus > this.adjustments.hit) {
          this.adjustments.hit = weapon.attack.bonus
        }
      }
      // Add grenades
      const hasGrenades = Math.floor(Math.random() * 100) < (this.crMetaLevel + 1) * 10
      if (hasGrenades) {
        const grenade = this.randomValue(this.grenades)
        this.grunt.actions.push({
          type: 'grenade',
          id: grenade.id
        })
        if (grenade.damage !== 'none') {
          this.dpr.grenade = this.averageFromDie(grenade.damage)
        }
      }
      // Add Heavy Weapons
      const hasHw = Math.floor(Math.random() * 100) < (this.crMetaLevel * 5)
      if (hasHw) {
        const hw = this.randomValue(this.weapons.filter(w => w.type === 'Heavy Weapon'))
        this.grunt.actions.push(this.generateWeaponAction(hw))
        this.dpr.heavyWeapon = this.averageFromDie(hw.damage)
      }
      // Add legendary actions
      if (attack.type === 'legendary') {
        // weapon attack
        let text = ` ${attack.weapons[0].name}`
        if (attack.weapons.length > 1) {
          text += ` or its ${attack.weapons[1].name}`
        }
        this.grunt.legendaryActions.push({
          name: 'Attack',
          cost: 1,
          description: `The ${this.sc.id} makes one weapon attack with its${text}.`
        })
        // grenade
        if (hasGrenades) {
          this.grunt.legendaryActions.push({
            name: 'Use grenade',
            cost: 2,
            description: `The ${this.sc.id} uses one grenade.`
          })
        }
        // spellcasting
        if (this.grunt.spellcasting) {
          this.grunt.legendaryActions.push({
            name: 'Cast a spell',
            cost: 3,
            description: `The ${this.sc.id} casts a spell.`
          })
        }
        // Move
        if (this.grunt.legendaryActions.length < 3) {
          this.grunt.legendaryActions.unshift({
            name: 'Move',
            cost: 1,
            description: `The ${this.sc.id} moves up to its speed.`
          })
        }
        // Search
        if (this.grunt.legendaryActions.length < 3) {
          this.grunt.legendaryActions.unshift({
            name: 'Search',
            cost: 1,
            description: `The ${this.sc.id} takes the Search action.`
          })
        }
      }
    },
    generateWeaponAction (weapon) {
      let weaponAction = {
        type: 'weapon',
        id: weapon.id
      }
      switch (weapon.id) {
        case 'm-37_falcon':
          weaponAction = {
            type: 'standard',
            name: weapon.name,
            description: `Target a creature within ${weapon.range}. It makes a DC ${8 + weapon.attack.bonus + this.cr.profBonus} Dexterity saving throw, taking ${this.averageFromDie(weapon.damage)} (${weapon.damage}) thunder damage on a failed save, or have as much damage on a successful one.`
          }
          break
        case 'venom_shotgun':
          weaponAction = {
            type: 'standard',
            name: weapon.name,
            description: `Target a creature within  ${weapon.range}. It makes a DC 13 Dexterity saving throw, taking ${this.averageFromDie(weapon.damage)} (${weapon.damage}) thunder damage on a failed save, or have as much damage on a successful one.`
          }
          break
        default:
          if (weapon.type === 'Heavy Weapon') {
            weaponAction = {
              type: 'standard',
              name: weapon.name,
              recharge: `${weapon.heat} ${weapon.heat > 1 ? 'charges' : 'charge'}`,
              description: weapon.notes
            }
          }
      }
      return weaponAction
    },
    getAttackOptions () {
      const weapons = this.weapons
        .filter((weapon) => {
          return weapon.damage !== null &&
            this.gruntWeaponRarity[this.crMetaLevel].includes(weapon.rarity) &&
            weapon.type !== 'Heavy Weapon'
        })
        .map(weapon => this.setWeaponDamage(weapon))
      // filters can go here, filtering out any weapons from the weapons const
      /*
      if (!config.allowHeavyWeapons && weapon.type === 'Heavy Weapon') {
        continue
      }
      */
      const attacks = []
      for (const weapon of weapons) {
        for (let i = 1; i <= 3; i++) {
          attacks.push({
            dpr: (weapon.attack.damage + weapon.attack.bonus) * i,
            numAttacks: i,
            weapons: [weapon],
            type: 'weapon'
          })
          // if cr >= 9, add legendary attack options
          if (this.crMetaLevel > 2) {
            const legendaryBonus = (weapon.attack.damage + weapon.attack.bonus) * 3
            attacks.push({
              dpr: ((weapon.attack.damage + weapon.attack.bonus) * i) + legendaryBonus,
              numAttacks: i,
              weapons: [weapon],
              type: 'legendary',
              legendaryBonus
            })
          }
        }
      }

      // dual wielding
      const dualOpts = weapons.filter((weapon) => {
        return (weapon.type === 'Heavy Pistol' || weapon.type === 'SMG' || weapon.type === 'Melee') && !/two/gi.test(weapon.tags)
      })
      const combinations = []

      for (const main of dualOpts) {
        const mainDpr = main.attack.damage + main.attack.bonus

        // each possible off-hand
        for (const off of dualOpts) {
          // Only allow melee/weapon combos if melee has hip fire
          if ((main.type === 'Melee' && (off.type !== 'Melee' && !/hip/gi.test(off.tags))) ||
              (off.type === 'Melee' && (main.type !== 'Melee' && !/hip/gi.test(off.tags)))) {
            continue
          }
          // filter out existing combos
          if (combinations.includes(`${main.id}-${off.id}`) || combinations.includes(`${off.id}-${main.id}`)) {
            continue
          }
          const offDpr = off.attack.damage + off.attack.bonus
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
    setWeaponDamage (weapon) {
      const strBonus = this.abilityScoreBonus(this.grunt.abilityScores.str)
      const dexBonus = this.abilityScoreBonus(this.grunt.abilityScores.dex)
      weapon.attack = {
        damage: this.averageFromDie(weapon.damage)
      }
      if (weapon.type === 'Melee') {
        let finalBonus = 0
        if (/(finesse|recoil)/gi.test(weapon.tags)) {
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
    generateMultiattackDescription (attack) {
      const name = this.sc.id
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
