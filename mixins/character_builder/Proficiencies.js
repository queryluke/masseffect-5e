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
      // get species profs
      if (this.speciesId) {
        for (const trait of this.speciesTraits) {
          if (trait.mechanics) {
            for (const mechanic of trait.mechanics) {
              if (mechanic.type === 'profs') {
                // add the mandatory profs
                if (mechanic.has) {
                  profs[mechanic.profType] = profs[mechanic.profType].concat(mechanic.has)
                }
                // add the chosen profs
                if (mechanic.choices && this.character.species.traitSelections[mechanic.id]) {
                  profs[mechanic.profType] = profs[mechanic.profType].concat(this.character.species.traitSelections[mechanic.id])
                }
              }
            }
          }
        }
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
