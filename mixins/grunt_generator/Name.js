export const Name = {
  methods: {
    setGruntName () {
      this.grunt.name = `${this.options.species.name} ${this.options.klass.name}`
    }
  }
}
