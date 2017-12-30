export const AverageFromDie = {
  methods: {
    averageFromDie(die) {
      const array = die.split('d');
      return Math.floor(array[0] * ((array[1] + 1) / 2));
    }
  }
};
