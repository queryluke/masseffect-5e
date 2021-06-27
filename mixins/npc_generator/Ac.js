export const Ac = {
  methods: {
    setAc () {
      this.npc.ac = 10
      let acModArray = []
      switch (this.options.offensiveScale) {
        case -2:
          acModArray = [3, 3, 2, 2, 1]
          break
        case -1:
          acModArray = [2, 2, 1, 1, 0]
          break
        case 0:
          acModArray = [1, 1, 0, 0, 0, -1, -1]
          break
        case 1:
          acModArray = [0, -1, -1, -2, -2]
          break
        case 2:
          acModArray = [-1, -2, -2, -3, -3]
      }
      const acMod = this.randomValue(acModArray)
      this.npc.ac = this.options.cr.ac + acMod
    }
  }
}
