export const Id = {
  methods: {
    setGruntId () {
      this.grunt.id = `${this.grunt.name.replace(' ', '_').toLowerCase()}_${Date.now()}`
    }
  }
}
