export const AbilityScoreBonus = {
  methods: {
    abilityScoreBonus (score) {
      return Math.floor((parseInt(score, 10) - 10) / 2)
    }
  }
}
