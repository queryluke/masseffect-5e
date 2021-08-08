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
        const selected = this.selections.filter(i => i.type === 'profs' && i.subType === key)
        for (const selection of selected) {
          profs[key] = profs[key].concat(selection.has || null)
          profs[key] = profs[key].concat(selection.value || null)
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
