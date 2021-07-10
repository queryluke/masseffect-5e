export const Proficiencies = {
  computed: {
    proficiencies () {
      const profs = {
        weapon: [],
        armor: [],
        tool: [],
        skill: [],
        savingThrow: []
      }
      if (!this.startingClass) {
        return profs
      }
      // get profs from starting class
      const startingProfs = this.classData(this.startingClass.id).profs
      for (const key in startingProfs) {
        // add the mandatory profs
        if (startingProfs[key].has) {
          profs[key] = profs[key].concat(startingProfs[key].has)
        }
        // add the user selected profs
        if (this.startingClass.profSelections[key]) {
          profs[key] = profs[key].concat(this.startingClass.profSelections[key])
        }
      }
      if (this.multiclasses.length) {
        for (const multi of this.multiclasses) {
          const multiclassProfs = this.multiclassProficiencies[multi.id]
          for (const key in multiclassProfs) {
            if (multiclassProfs[key].has) {
              profs[key] = profs[key].concat(multiclassProfs[key].has)
            }
            // add the user selected profs
            if (multi.profSelections[key]) {
              profs[key] = profs[key].concat(multi.profSelections[key])
            }
          }
        }
      }
      // create uniques
      for (const key in profs) {
        profs[key] = [...new Set(profs[key])]
      }
      return profs
    }
  }
}
