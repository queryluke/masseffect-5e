export const CrToInt = {
  methods: {
    crToInt (cr) {
      const [numerator, denominator] = cr.split('/')
      return denominator ? parseInt(numerator, 10) / parseInt(denominator, 10) : parseInt(numerator, 10)
    }
  }
}
