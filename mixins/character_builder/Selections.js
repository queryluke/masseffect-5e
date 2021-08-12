/*
 * Selection Source Schema
 * species-batarian
 * species-batarian-shrewd-negotiator
 * species-batarian-shrewd-negotiator-profs-skill
 */

/*
  TODO: There are some major discrepancies with aspects, selectables, and pickers
  the source ids sometimes use hyphens from the feat-id and
  sometimes use underscores from the picker id

  the ideal situation is that we only store selections that actually have choices
  if there is a nested choices we need a recursive

  and all potential selections are their own data model, sans a few outliers like profs

  example
  - cybernetic augmentation would have an option of 4 other species traits: muscular, ocular, cerebral, visceral
  mechanics:
    - type: picker
      choices:
        items:
          - trait/cybernetic-augmentation-muscular // the reference to another trait as string or object
          ...
        count: 1

  the reference is stored in the character.selections model
  selections: [
    'trait/cybernetic-augmentation-muscular'
  ]

  - should the abi selections go on the class model, tying the to a level? If so, how to easily remove/add based on level?
  - how to test if a selection is needed?
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
