export const AverageFromDie = {
  methods: {
    averageFromDie (dieType, dieCount) {
      const dt = parseInt(dieType, 10) || 0
      const dc = parseInt(dieCount, 10) || 0
      return dc * ((dt + 1) / 2)
    },
    roundedAverageFromDie (dieType, dieCount) {
      return Math.floor(this.averageFromDie(dieType, dieCount))
    }
  }
}
