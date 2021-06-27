export const Features = {
  methods: {
    barrier () {
      const numTicks = this.progression.find(i => i.label === 'barrier_ticks').values[this.metaLevel - 1]
      const bonus = Math.floor(numTicks * 4.5)
      if (this.isHpBonusAddable(bonus)) {
        this.npc.entries.features.push({
          name: 'Barrier',
          uses: this.progression.find(i => i.label === 'barrier_uses').values[this.metaLevel - 1],
          perDay: true,
          text: `As an action or bonus action, the ${this.options.klass.id} gains ${numTicks} barrier ticks. When the ${this.options.klass.id} is dealt damage, remove one barrier tick and reduce the damage by 1d8.`,
          id: 'barrier'
        })
        this.healthBonus += bonus
      }
    },
    drone () {
      const bonus = (2 * this.metaTier)
      const dmg = {
        type: 'bonus',
        damage: 2,
        uses: 5
      }
      if (this.isHpBonusAddable(bonus) && this.isDamageAddable(dmg)) {
        const drones = ['assault', 'combat', 'defense', 'disruption', 'recon', 'rocket']
        this.npc.entries.actions.push({
          name: 'Summon Drone',
          uses: this.metaTier,
          perDay: true,
          text: `The ${this.lcName} summons a ${this.randomValue(drones)} drone in a unoccupied space within <me-distance length="30" />.`,
          id: 'summonDrone'
        })
        this.healthBonus += (5 * this.metaTier)
        this.addDamage(dmg)
      }
    },
    tacticalCloak () {
      const numUses = this.progression.find(i => i.label === 'tactical_cloak_uses').values[this.metaLevel - 1]
      const bonus = (5 * numUses)
      if (this.isHpBonusAddable(bonus)) {
        this.npc.entries.features.push({
          name: 'Tactical Cloak',
          uses: numUses,
          perDay: true,
          text: `As a bonus action, the ${this.lcName} may cast Tactical Cloak, becoming invisible. When it makes an attack roll, casts a power, or users a grenade or heavy weapon, tactical cloak ends.`,
          id: 'tacticalCloak'
        })
        this.healthBonus += (10 * numUses)
      }
    },
    sneakAttack () {
      const dmg = this.progression.find(i => i.label === 'sneak_attack_damage').values[this.metaLevel - 1]
      const [dieCount, dieType] = dmg.split('d')
      const extraDmg = Math.floor(this.averageFromDie(dieType, dieCount))
      const dmgObject = {
        type: 'bonus',
        damage: extraDmg,
        uses: 5
      }
      if (this.isDamageAddable(dmgObject)) {
        this.npc.entries.features.push({
          name: 'Sneak Attack',
          uses: 1,
          perTurn: true,
          text: `The ${this.lcName} deals an extra ${extraDmg} (${dmg}) damage when it hits a target with a weapon attack and has advantage on the attack roll,
                or when the target is within <me-distance length="5" /> of an ally of the ${this.lcName} that isn't incapacitated and the infiltrator doesn't have disadvantage on the attack roll.`,
          id: 'sneakAttack'
        })
        this.addDamage(dmgObject)
      }
    },
    techArmor () {
      const addPoints = (this.metaLevel + this.abilityScoreBonus(this.npc.abilityScores.cha)) * 2
      if (this.isHpBonusAddable(addPoints * 2)) {
        this.npc.entries.features.push({
          name: 'Tech Armor',
          uses: 2,
          perDay: true,
          text: `As a bonus action, the ${this.lcName} can activate its Tech Armor. It immediately gains ${addPoints} temporary hit points. Any damage is dealt to these temporary hit points first.`,
          id: 'techArmor'
        })
        this.healthBonus += (addPoints * 2)
      }
    },
    setFeatures () {
      switch (this.klass.id) {
        case 'sentinel':
          this.barrier()
          this.techArmor()
          break
        case 'infiltrator':
          this.tacticalCloak()
          this.sneakAttack()
          break
        case 'adept':
        case 'vanguard':
          this.barrier()
          break
        case 'engineer':
          this.drone()
          break
        default:
          break
      }
    }
  }
}
