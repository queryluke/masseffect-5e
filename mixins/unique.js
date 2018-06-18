export const Unique = {
  methods: {
    unique (array) {
      return Array.from(new Set(array))
    }
  }
}
