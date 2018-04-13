export const AverageFromDie = {
  methods: {
    averageFromDie (die) {
      if (die) {
        const array = die.split('d')
        return Math.floor(parseInt(array[0], 10) * ((parseInt(array[1], 10) + 1) / 2))
      } else {
        return 0
      }
    }
  }
}
