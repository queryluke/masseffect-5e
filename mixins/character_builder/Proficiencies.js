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
      for (const key in profs) {
        // Temp
        const oldSelected = this.character.selections.filter(i => i.type === 'profs' && i.subType === key)
        for (const selection of oldSelected) {
          profs[key] = profs[key].concat(selection.has || null)
          profs[key] = profs[key].concat(selection.value || null)
        }
        const selected = this.mechanicBag.filter(i => i.type === 'prof' && i.profType === key)
        for (const selection of selected) {
          profs[key] = profs[key].concat(selection.value)
        }
      }
      // create uniques
      for (const key in profs) {
        profs[key] = [...new Set(profs[key].filter(i => i))]
      }
      return profs
    }
  }
}
