import { camelCase } from 'lodash'
export const CombatPowers = {
  computed: {
    ballisticBlades () {
      const dieCount = this.tierDieCount(2, 2)
      return {
        id: 'ballistic-blades',
        damage: this.averageFromDie(12, dieCount),
        type: 'actions',
        entry: {
          attack: 'ranged',
          hardRange: true,
          proficient: true,
          range: 30,
          dc: false,
          mod: 'dex',
          damage: [
            {
              dieCount,
              dieType: 12,
              type: 'piercing',
              mod: false
            }
          ],
          target: 'one',
          name: 'Ballistic Blades',
          uses: 1
        }

      }
    },
    beehive () {
      const dieCount = this.tierDieCount(3, 2)
      return {
        id: 'beehive',
        damage: this.averageFromDie(6, dieCount),
        type: 'actions',
        entry: {
          name: 'Beehive',
          uses: 1,
          text: `The ${this.lcName} shoots shrapnel in a <me-distance length="15" adj /> cone. Each creature in the area must make a DC ${this.calcDc('dex')} Dexterity saving throw, taking ${this.damageString(dieCount, 6)} piercing damage, or half as much damage on a successful one.`
        }
      }
    },
    concussiveShot () {
      const dieCount = this.tierDieCount(1, 1)
      return {
        id: 'concussive-shot',
        damage: this.averageFromDie(8, dieCount),
        type: 'features',
        entry: {
          name: 'Concussive Shot',
          uses: 3,
          text: `The ${this.lcName} may activate concussive shot with a bonus action. The next ranged weapon attack that hits deals an additional ${this.damageString(dieCount, 8)} bludgeoning damage and the must succeed on a DC ${this.calcDc('dex')} Strength saving throw or become <me-condition id="prone" />.`
        }
      }
    },
    flakCannon () {
      const dieCount = this.tierDieCount(2, 2)
      return {
        id: 'flak-cannon',
        damage: this.averageFromDie(6, dieCount),
        type: 'actions',
        entry: {
          name: 'Flak Cannon',
          uses: 3,
          text: `The ${this.lcName} targets an area within <me-distance length="30" />. Each creature in a <me-distance length="10" adj />-radius sphere centered on the target must make a DC ${this.calcDc('dex')} Dexterity saving throw, taking ${this.damageString(dieCount, 6)} piercing damage, or half as much damage on a successful one.`
        }
      }
    },
    fortification () {
      return {
        id: 'fortification',
        damage: 0,
        type: 'reactions',
        entry: {
          name: 'Fortification',
          uses: 1,
          text: `When the ${this.lcName} is targeted by an attack it can see, it gains +5 AC until the start of its next turn.`
        }
      }
    },
    havocStrike () {
      const dieCount = this.tierDieCount(2, 2)
      return {
        id: 'havoc-strike',
        damage: this.averageFromDie(8, dieCount),
        type: 'actions',
        entry: {
          name: 'Havoc Strike',
          uses: 2,
          text: `The ${this.lcName} moves to an unoccupied space within <me-distance length="20" />. Each creature within <me-distance length="5" adj /> from where its movement ends must make a DC ${this.calcDc('str')} Dexterity saving throw, taking ${this.damageString(dieCount, 8)} piercing damage, or half as much damage on a successful one.`
        }
      }
    },
    hawkMissileLauncher () {
      const dieCount = this.tierDieCount(3, 3)
      return {
        id: 'havoc-strike',
        damage: this.averageFromDie(6, dieCount),
        type: 'actions',
        entry: {
          name: 'Hawk Missile Launcher',
          uses: 1,
          text: `The ${this.lcName} targets a creature or object it can see within <me-distance length="150" />. The target suffers ${this.damageString(dieCount, 6)} thunder damage.`
        }
      }
    },
    hexShield () {
      return {
        id: 'hex-shield',
        damage: 0,
        type: 'actions',
        entry: {
          name: 'Hex Shield',
          uses: 1,
          text: `The ${this.lcName} creates a free-standing shield with 5 AC and 50 shield points within <me-distance length="5" />. The shield provides full cover until it has no shield points remaining.`
        }
      }
    },
    nightshadeBlades () {
      const dieCount = this.tierDieCount(1, 2)
      return {
        id: 'nightshade-blades',
        damage: this.averageFromDie(12, dieCount),
        type: 'actions',
        entry: {
          attack: 'ranged',
          hardRange: true,
          proficient: true,
          range: 30,
          dc: false,
          mod: 'dex',
          damage: [
            {
              dieCount,
              dieType: 12,
              type: 'poison',
              mod: false
            }
          ],
          hit: `The target must succeed on a DC ${8 + this.npc.profBonus} Constitution saving throw or become <me-condition id="poisoned" /> until it finishes a short rest`,
          target: 'one',
          name: 'Nightshade Blades',
          uses: 3
        }
      }
    },
    stimulantPack () {
      return {
        id: 'stimulant-pack',
        damage: 0,
        type: 'features',
        entry: {
          name: 'Stimulant Pack',
          uses: 1,
          text: `As a bonus action, the ${this.lcName} adds 1d4 to its attack rolls and saving throws for the next minute.`
        }
      }
    },
    trophySystem () {
      return {
        id: 'trophy-system',
        damage: 0,
        type: 'reactions',
        entry: {
          name: 'Trophy System',
          uses: 1,
          text: `When a grenade or missile from a heavy weapon comes within <me-distance length="15" /> of the ${this.lcName}, it may choose to detonate it immediately. If the detonate would cause the ${this.lcName} to make a Dexterity saving throw, it has advantage on the roll.`
        }
      }
    }
  },
  methods: {
    tierDieCount (initial, increase) {
      return initial + (increase * (this.metaTier - 1))
    },
    damageString (dieCount, dieType) {
      return `${Math.floor(this.averageFromDie(dieType, dieCount))} (${dieCount}d${dieType})`
    },
    setCombatPowers () {
      const numOptions = this.options.klass.id === 'soldier' ? Math.ceil(this.metaLevel / 4) : Math.ceil(this.metaLevel / 8)
      const num = this.randomValue([...Array(numOptions + 1).keys()])
      const options = this.$store.getters.getData('powers').filter(i => i.type === 'combat' && i.classes.includes(this.options.klass.id) && this.combatPower(i.id))
      const taken = []
      if (options.length > 0) {
        for (let i = 0; i < num; i++) {
          const remOptions = options.filter((i) => {
            const cp = this.combatPower(i.id)
            const type = i.id === 'concussive-shot' ? 'bonus' : 'combat'
            return !taken.includes(i.id) &&
            this.isDamageAddable({ type, damage: cp.damage, uses: cp.entry.uses })
          })
          if (remOptions.length > 0) {
            const option = this.randomValue(remOptions)
            const e = this.combatPower(option.id)
            const type = e.id === 'concussive-shot' ? 'bonus' : 'combat'
            this.npc.entries[e.type].push(e.entry)
            this.addDamage({ type, damage: e.damage, uses: e.entry.uses })
            taken.push(option.id)
          }
        }
      }
    },
    combatPower (id) {
      return this[camelCase(id)] || false
    }
  }
}
