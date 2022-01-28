export const MechanicBag = {
  computed: {
    mechanicBag () {
      /*
        1. All Models that have static (options = false) mechanics on them (traits, fighting styles, species, etc)
        2. All Models that have optional (options = true) mechanics on them (traits, fighting styles, species, etc)
          a. further hydrated by character.selected where path = model = model && modelId = modelId && type = (type with '-choice' removed) && (todo: break out prof choices)
            example = trait/skill-profs/skill, value: [{type: 'skill', value: 'acrobatics'}]
          b. when a is a model itself (feat, benefit, etc)
            example = trait/feat/feats, value: [{type: 'feats', value: 'living-turret'}]
           - THEN, recursively look for 1 & 2???
              example
                - 1. trait/feat/feats/living-turret/action
                - 2. trait/feat/feats/living-turret/fighting-styles
                  - 1. trait/feat/feats/living-turret/fighting-styles/dual-wielder
        3. Then! Delete any unfound character.selected
       */
      // DISCUSSION: should we only get things from the mechanic bag that are still valid
      return [
        ...this.rootSpeciesMechanics,
        ...this.speciesTraits.reduce((acc, curr) => acc.concat(curr.mechanics || []), []),
        ...this.csFightingStyles.reduce((acc, curr) => acc.concat(curr.mechanics || []), []),
        ...this.hydratedMbs.reduce((acc, curr) => acc.concat(curr.mechanics || []), [])
      ]
    },
    // Technically this is mechanicBagWithSubSelections
    mechanicBagSelections () {
      return this.character.selected.reduce((acc, curr) => acc.concat(curr.value || []), [])
    },
    hydratedMbs () {
      return this.mechanicBagSelections
        .filter(i => ['feats', 'benefits'].includes(i.type))
        .map(i => this.$store.getters.getItem(i.type, i.value))
    }
  },
  methods: {
    mcBonus (bonus) {
      const multiplier = bonus.multiplier || 1
      const min = bonus.min || 0
      let b = 0
      switch (bonus.type) {
        case 'flat':
          b = bonus.value
          break
        case 'mod':
          b = this.absMod(bonus.value) * multiplier
          break
        case 'proficiency':
          b = this.profBonus * multiplier
          break
        case 'level':
          b = this.level * multiplier
          break
        default:
          b = 0
      }
      return Math.max(min, b)
    }
  }
}
