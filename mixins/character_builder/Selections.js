/*
 * Selection Source Schema
 * species-batarian
 * species-batarian-shrewd-negotiator
 * species-batarian-shrewd-negotiator-profs-skill
 */

export const Selections = {
  computed: {
    selections () {
      return this.character.selections
    },
    speciesSource () {
      return `species-${this.speciesId}`
    }
  },
  methods: {
    mechanicNeedsSelection (mechanic, source, count = 1) {
      // NOTE: if we need a multipicker, need to iterate on choices.count not use index!!!
      const selection = this.selections.find(i => i.source === source)
      if (!selection) {
        return true
      }
      if (!selection.value || (Array.isArray(selection.value) && selection.value.length === 0)) {
        return true
      }
      return selection.value.length !== count
    },
    getMechanicsWithoutChoices (sourceId, mechanics) {
      const collection = []
      for (const mechanic of mechanics) {
        // mechanics with choices use pickers, and it is the pickers job to add the selection
        if (mechanic.choices) {
          continue
        }
        collection.push({
          source: `${sourceId}`,
          type: mechanic.type,
          subType: mechanic.subType || null,
          has: mechanic.has || null,
          value: mechanic.id || null
        })
      }
      return collection
    }
  }
}
