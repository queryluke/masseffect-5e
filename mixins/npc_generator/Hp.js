export const Hp = {
  data () {
    return {
      baseShields: {
        0: { shields: [0, 0, 0, 5, 5], regen: [0] },
        1: { shields: [0, 0, 5, 5, 5], regen: [0, 0, 0, 5, 5] },
        2: { shields: [5, 5, 5, 10, 10], regen: [0, 0, 5, 5, 10] },
        3: { shields: [5, 10, 10, 10, 15], regen: [0, 5, 5, 5, 10] },
        4: { shields: [10, 15, 15, 20], regen: [0, 5, 10] },
        5: { shields: [15, 20, 20], regen: [5, 10] },
        6: { shields: [20, 20, 20, 25, 25], regen: [5, 10, 15] },
        7: { shields: [20, 20, 25, 25, 30], regen: [10, 10, 15] },
        8: { shields: [20, 25, 30], regen: [10, 15] },
        9: { shields: [25, 30], regen: [10, 15] },
        10: { shields: [30], regen: [15] }
      },
      defensivePercentiles: [0.5, 0.25, 0.1, 0.25, 0.5]
    }
  },
  computed: {
    speciesDieType () {
      return this.options.species.id === 'volus' ? 6 : 8
    }
  },
  methods: {
    setHp () {
      this.npc.shields = false
      let shieldMod = 0
      // shields
      const baseShields = this.baseShields[this.defensiveCrMeta]
      const capacity = this.randomValue(baseShields.shields)
      shieldMod += capacity
      if (capacity > 0) {
        const regen = this.randomValue(baseShields.regen.filter(r => r <= capacity))
        shieldMod += regen
        if (this.isHpBonusAddable(shieldMod)) {
          this.npc.shields = { capacity, regen }
          this.healthBonus += shieldMod
        }
      }

      // Calculation
      let numDice = 0
      let average = 0
      while (average < this.minHp) {
        numDice++
        average = this.getAverage(numDice)
        if (average > this.minHp && this.options.offensiveScale < 0) {
          while (average < this.maxHp) {
            numDice++
            average = this.getAverage(numDice)
            if (average > this.maxHp) {
              break
            }
          }
        }
      }
      this.npc.hp = {
        dieCount: numDice,
        dieType: this.speciesDieType
      }
    },
    getAverage (numDice) {
      // Die Type (size)
      const averageRoll = (this.speciesDieType + 1) / 2
      // Con Modifier
      const conMod = this.abilityScoreBonus(this.npc.abilityScores.con)
      return ((numDice * averageRoll) + (numDice * conMod))
    }
  }
}
