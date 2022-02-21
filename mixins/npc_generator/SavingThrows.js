export const SavingThrows = {
  methods: {
    setSavingThrows () {
      this.npc.savingThrows = []
      let numSavingThrows = this.randomValue(this.savingThrowWeights[this.defensiveCrMeta])
      const savingThrows = this.savingThrows.slice()
      const classSavingThrows = this.options.klass.profs['saving-throw'].has.slice()
      for (const classSt of classSavingThrows) {
        if (numSavingThrows > 0) {
          savingThrows.splice(savingThrows.indexOf(classSt), 1)
          this.npc.savingThrows.push(classSt)
          numSavingThrows--
        }
      }
      for (let i = 1; i <= numSavingThrows; i++) {
        const savingThrow = this.randomValue(savingThrows)
        savingThrows.splice(savingThrows.indexOf(savingThrow), 1)
        this.npc.savingThrows.push(savingThrow)
      }
    }
  },
  data () {
    return {
      savingThrowWeights: {
        0: [0, 1, 1, 2],
        1: [1, 1, 2, 2],
        2: [1, 2, 2, 3],
        3: [2, 2, 3, 3],
        4: [2, 3, 3, 4],
        5: [3, 3, 4, 4],
        6: [3, 4, 4, 5]
      },
      savingThrows: ['str', 'dex', 'con', 'int', 'wis', 'cha']
    }
  }
}
