export const ScoreText = {
  methods: {
    modText (score) {
      return score > 0 ? `+${score}` : score
    }
  }
}
