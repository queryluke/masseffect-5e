export const SavingThrows = {
  methods: {
    setGruntSavingThrows () {
      this.grunt.savingThrows = []
      let numSavingThrows = this.randomValue(this.savingThrowWeights[this.crMetaLevel])
      const savingThrows = this.savingThrows.slice()
      const classSavingThrows = this.sc.savingThrows.map((st) => {
        return st.toLowerCase().trim().slice(0, 3)
      })
      for (const classSt of classSavingThrows) {
        if (numSavingThrows > 0) {
          savingThrows.splice(savingThrows.indexOf(classSt), 1)
          this.grunt.savingThrows.push(classSt)
          numSavingThrows--
        }
      }
      for (let i = 1; i <= numSavingThrows; i++) {
        const savingThrow = this.randomValue(savingThrows)
        savingThrows.splice(savingThrows.indexOf(savingThrow), 1)
        this.grunt.savingThrows.push(savingThrow)
      }
    }
  },
  data () {
    return {
      savingThrowWeights: {
        0: [0, 0, 0, 1],
        1: [0, 1, 1, 2],
        2: [1, 1, 2, 2],
        3: [2, 2, 2, 3]
      },
      savingThrows: ['str', 'dex', 'con', 'int', 'wis', 'cha']
    }
  }
}
