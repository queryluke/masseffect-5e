export const AbilityScoreBonus = {
  methods: {
    abilityScoreBonus(score) {
      return Math.floor((score - 10) / 2);
    }
  }
};
