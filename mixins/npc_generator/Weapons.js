export const Weapons = {
  data () {
    return {
      tierRarity: {
        1: ['common'],
        2: ['common', 'uncommon'],
        3: ['common', 'uncommon', 'rare', 'very_rare'],
        4: ['common', 'uncommon', 'rare', 'very_rare', 'spectre']
      }
    }
  },
  computed: {
    weapons () {
      return this.$store.getters.getData('weapons')
    },
    attackOptions () {
      const weapons = this.weapons.filter(i => this.tierRarity[this.metaTier].includes(i.rarity) && (this.options.species.id === 'hanar' ? i.properties.includes('light') : true)).map(weapon => this.setWeaponDamage(weapon))
      const attacks = []
      for (const weapon of weapons) {
        for (let i = 1; i <= 3; i++) {
          attacks.push({
            damage: (weapon.attack.damage + weapon.attack.bonus) * i,
            numAttacks: i,
            weapons: [weapon],
            type: 'single'
          })
        }
      }
      // dual wielding
      const dualOpts = weapons.filter((weapon) => {
        return weapon.properties.includes('light') && !weapon.properties.includes('two-handed')
      })
      const combinations = []

      for (const main of dualOpts) {
        const mainDpr = main.attack.damage + main.attack.bonus

        // each possible off-hand
        for (const off of dualOpts) {
          // Only allow melee/weapon combos if ranged has hip fire
          if (
            (main.type === 'melee' && (off.type !== 'melee' && !off.properties.includes('hip-fire'))) ||
            (off.type === 'melee' && (main.type !== 'melee' && !main.properties.includes('hip-fire'))) ||
            (main.type === 'melee' && (main.id === off.id))
          ) {
            continue
          }
          // filter out existing combos
          if (combinations.includes(`${main.id}-${off.id}`) || combinations.includes(`${off.id}-${main.id}`)) {
            continue
          }
          const offDpr = off.attack.damage + off.attack.bonus
          // single attack with each
          attacks.push({
            damage: mainDpr + offDpr,
            numAttacks: 2,
            weapons: [main, off],
            type: 'dw'
          })
          /*
          attacks.push({
            damage: (mainDpr + offDpr) * 2,
            numAttacks: 4,
            weapons: [main, off],
            type: 'dw'
          })
          */
          combinations.push(`${main.id}-${off.id}`)
        }
      }
      attacks.sort((a, b) => b.damage - a.damage)
      return attacks
    }
  },
  methods: {
    setWeaponDamage (weapon) {
      const strBonus = this.abilityScoreBonus(this.npc.abilityScores.str)
      const dexBonus = this.abilityScoreBonus(this.npc.abilityScores.dex)
      weapon.attack = {
        damage: this.averageFromDie(weapon.damage.dieType, weapon.damage.dieCount)
      }
      let finalBonus = dexBonus
      if (weapon.properties.some(r => ['finesse', 'recoil'].includes(r))) {
        finalBonus = strBonus >= dexBonus ? strBonus : dexBonus
      } else if (weapon.type === 'melee') {
        finalBonus = strBonus
      }
      weapon.attack.bonus = finalBonus
      return weapon
    },
    setWeaponActions () {
      let options = this.attackOptions.filter(i => this.isDamageAddable({ type: 'weapon', damage: i.damage, uses: 5 }))
      if (options.length === 0) {
        options = [...this.attackOptions].slice(-5)
        /*
        if (this.options.traits && ['hanar', 'vorcha'].includes(this.options.species.id)) {
          return
        }
        this.npc.entries.actions['unarmed-strike'] = {
          name: 'Unarmed Strike',
          attack: 'melee',
          proficient: true,
          range: 5,
          dc: false,
          mod: 'str',
          damage: [
            {
              flat: 1,
              type: 'bludgeoning',
              mod: true
            }
          ],
          target: 'one'
        }
        this.addDamage({ type: 'weapon', damage: 1, uses: 5 })
       */
      }
      const minDmgOptions = options.filter(i => i.damage >= this.minDmg)
      const finalOptions = minDmgOptions.length === 0 ? options.slice(0, 20) : minDmgOptions
      const attack = this.randomValue(finalOptions)
      this.addDamage({ type: 'weapon', damage: attack.damage, uses: 5 })
      // Add multi-attack
      if (attack.numAttacks > 1) {
        this.npc.entries.actions.push({
          name: 'Multiattack',
          text: this.generateMultiattackDescription(attack),
          id: 'multiattack'
        })
      }
      // Add weapons
      let idInc = 0
      for (const weapon of attack.weapons) {
        const action = {
          ref: 'weapon',
          proficient: true,
          weaponId: weapon.id,
          id: `${weapon.id}-${idInc}`
        }
        if (this.options.species.id === 'elcor') {
          action.mod = 'int'
        }
        this.npc.entries.actions.push(action)
        idInc++
      }
    },
    generateMultiattackDescription (attack) {
      const name = this.lcName
      const words = ['', 'one', 'two', 'three', 'four']
      const plural = attack.numAttacks > 1 ? 's' : ''
      let text = `The ${name} makes`
      if (attack.weapons.length > 1) {
        if (attack.weapons[0].type === 'melee' && attack.weapons[1].type === 'melee') {
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
