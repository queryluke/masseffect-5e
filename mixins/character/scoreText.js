export const ScoreText = {
  methods: {
    modText (score) {
      return score > 0 ? `+${score}` : score
    },
    damageText (score) {
      return score > 0 ? ` + ${score}` : ` - ${score * -1}`
    }
  }
}
