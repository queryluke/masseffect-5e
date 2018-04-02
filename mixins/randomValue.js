export const RandomValue = {
  methods: {
    randomValue (array) {
      return array[Math.floor(Math.random() * array.length)]
    }
  }
}
