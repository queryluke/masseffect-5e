export const ScoreText = {
  methods: {
    modText (score) {
      return score > 0 ? `+${score}` : score
    },
    rollText (score) {
      const isNegative = score < 0
      score = score.toString().match(/\d+/g)
      return !isNegative ? `+${score}` : `-${score}`
    },
    damageText (score) {
      return score > 0 ? ` + ${score}` : ` - ${score * -1}`
    }
  }
}
