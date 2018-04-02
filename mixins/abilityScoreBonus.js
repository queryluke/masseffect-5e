export const AbilityScoreBonus = {
  methods: {
    abilityScoreBonus (score) {
      return score >= 10 ? Math.floor((score - 10) / 2) : Math.ceil((score - 10) / 2)
    }
  }
}
