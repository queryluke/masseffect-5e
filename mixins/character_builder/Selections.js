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
    },
    csFeats () {
      return this.selections.filter(i => i.type === 'feat').map(i => this.feats.find(j => j.id === i.value))
    }
  },
  methods: {
    mechanicNeedsSelection (mechanic, source, count = 1) {
      // NOTE: if we need a multipicker, need to iterate on choices.count not use index!!!
      // possible iterations, todo: better docs about this
      // source: e.g., species-quarian-cybernetic_augmentation
      // source-mechanic.id: e.g., idk?
      // source-mechanic.subType: e.g., species-drell-natural-hunters-skill && species-salarian-twice-as-bright-skill
      const sourceIterations = [source, `${source}-${mechanic.id}`, `${source}-${mechanic.subType}`]
      const selection = this.selections.find(i => sourceIterations.includes(i.source))
      if (!selection) {
        return true
      }
      if (!selection.value) {
        return true
      }
      return Array.isArray(selection.value) ? selection.value.length !== count : false
    },
    getMechanicsWithoutChoices (sourceId, mechanics) {
      // TODO: stop using this...if there are choices, look in selections for the choice, then look back
      // at the source data for the mechanics
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
