export const AverageFromDie = {
  methods: {
    averageFromDie (dieType, dieCount) {
      return parseInt(dieCount, 10) * ((parseInt(dieType, 10) + 1) / 2)
    }
  }
}
