import {get as lodashGet} from 'lodash'
export const Proficiencies = {
  computed: {
    blankProfsObj () {
      return JSON.parse(JSON.stringify({
        weapon: [],
        armor: [],
        tool: [],
        skill: [],
        savingThrow: []
      }))
    },
    proficiencies () {
      const profs = this.blankProfsObj
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
      // get class profs
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
      // get background profs
      if (this.backgroundId) {
        if (this.backgroundData.mechanics) {
          for (const mechanic in this.backgroundData.mechanics) {
            if (mechanic.type === 'profs') {

              // add the chosen profs
              if (mechanic.choices && this.character.background.selections[mechanic.id]) {
                profs[mechanic.profType] = profs[mechanic.profType].concat(this.character.background.selections[mechanic.id])
              }
            }
            // nested profs
            if (mechanic.picker) {
              const selection = this.character.background.selections[mechanic.id]
              if (typeof selection === 'string') {
                const mechanic.pickerData = mechanic.choices.items.find((i) => i.id === selection)
              }
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
  },
  methods: {
    /*
    example markdown

    mechanics:
      - id: specialty
        type: picker
        choices:
          items:
            - id: thief
              mechanics:
                  id: theif-skills
                - type: profs
                  profType: skill
                  has:
                    - perception
                  choices:
                    items:
                      - persuasion
                      - science
                    choices: 1
                    id: other-skills
                  - type: picker
                    choices:
                      items:
                        - one
                        - two
                      count: 2
            - id: criminal
              mechanics:
                - type: profs
                  profType: weapon
                  has:
                    - assault_rifles
                - type: profs
                  profType: skill
                  has:
                    - intimidation
        count: 2


     example selections
     {
       background: {
         id: criminal
         selections: {
           specialty: [{ // array or object based on count
           // array object would need to have their own special picker
             id: thief
             selections: {
             }
           }
         }
     }
     */
    getNestedProfsFromMechanics (mechanics, selectionPath) {
      const profs = this.blankProfsObj
      for (const mechanic in mechanics) {
        // get has profs from root mechanic
        if (mechanic.has) {
          profs[mechanic.profType] = profs[mechanic.profType].concat(mechanic.has)
        }
        // get choose profs from root mechanics
        const selections = mechanic.choices ? lodashGet(this.character, `${selectionPath}.${mechanic.id}`) : false
        if (selections?.selections) {
          const nestedProfs = this.getNestedProfsFromSelections(selections.selections)
          profs[mechanic.profType] = profs[mechanic.profType].concat(this.character.background.selections[mechanic.id])
        }
        const profReturn = this.getNestedProfsFromSelections()
      }
    },
    getNestedProfsFromSelections (mechanic) {
      const profs = this.blankProfsObj
      // add the mandatory profs
      if (mechanic.has) {
        profs[mechanic.profType] = profs[mechanic.profType].concat(mechanic.has)
      }
    }
  }
}
