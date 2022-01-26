export const AbilityScores = {
  computed: {
    absGenMethod: {
      get () {
        return this.character.abilityScores.genMethod
      },
      set (value) {
        return this.$store.dispatch('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'abilityScores.genMethod', value })
      }
    },
    csHigherOfStrOrDex () {
      const dex = this.absTotal('dex')
      const str = this.absTotal('str')
      return dex > str ? 'dex' : 'str'
    },
    selectedAbilityScores () {
      if (!this.absGenMethod) {
        return false
      }
      return this.character.abilityScores[this.absGenMethod.value]
    },
    allAbilityScoresSet () {
      if (!this.absGenMethod) {
        return false
      }
      return this.selectedAbilityScores && Object.values(this.selectedAbilityScores).every(abs => abs !== null)
    },
    selectionBonuses () {
      const bonuses = {
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0
      }
      const selections = this.selections.filter(i => i.type === 'ability')
      for (const selection of selections) {
        bonuses[selection.has.ability] += selection.has.bonus
      }
      const selected = this.mechanicBag.filter(i => i.type === 'asi')
      for (const s of selected) {
        bonuses[s.ability] += s.amount
      }
      // need to remove species for breakdown
      for (const a of ['str', 'dex', 'con', 'int', 'wis', 'cha']) {
        bonuses[a] -= this.absSpeciesBonus(a)
      }
      return bonuses
    },
    csInitiativeBonus () {
      const base = this.absMod('dex')
      const bonus = this.mechanicBag.filter(i => i.type === 'initiative' && typeof i.effect === 'object').reduce((acc, curr) => acc + this.mcBonus(curr.effect), 0)
      return `+${base + bonus}`
    },
    csInitiativeAdvantage () {
      return this.mechanicBag.filter(i => i.type === 'initiative' && i.effect === 'advantage').length > 0
    },
    csInitiativeDisadvantage () {
      return this.mechanicBag.filter(i => i.type === 'initiative' && i.effect === 'disadvantage').length > 0
    }
  },
  methods: {
    absSpeciesBonus (ability) {
      let base = 0
      if (!this.character.options.tashas) {
        const additions = this.speciesAsis.filter(i => i.ability === ability)
        const totalAddition = additions.reduce((acc, curr) => acc + curr.amount, 0)
        base += totalAddition
      }
      const selections = this.character.selected.find(i => i.path.startsWith('species/asi')) || { value: [] }
      const abilitySelected = selections.value.find(i => i.ability === ability) || { amount: 0 }
      base += abilitySelected.amount
      return base
    },
    getAbsBase (ability) {
      return this.selectedAbilityScores ? this.selectedAbilityScores[ability] : 0
    },
    setAbsBase ({ ability, value }) {
      const val = value === null ? null : Number.parseInt(value, 10)
      this.$store.dispatch('cb/UPDATE_CHARACTER', { cid: this.cid, attr: `abilityScores.${this.absGenMethod.value}.${ability}`, value: val })
    },
    absMod (ability) {
      return this.abilityScoreBonus(this.absTotal(ability))
    },
    absModText (ability) {
      const mod = this.absMod(ability)
      return mod >= 0 ? `+${mod}` : `-${mod * -1}`
    },
    absAbis (ability) {
      let final = 0
      const abis = this.selections.filter(i => i.source?.endsWith('abi') && i.type === 'abi')
      for (const abi of abis) {
        if (!abi.value) {
          continue
        }
        if (abi.value[0] === ability && !abi.value[1]) {
          final += 2
          continue
        }
        if (abi.value.includes(ability)) {
          final += 1
          continue
        }
      }
      return final
    },
    absMisc (ability) {
      return this.selectionBonuses[ability]
    },
    absTotal (ability) {
      const override = this.getAbsOverride(ability) || 0
      if (override > 0) {
        return Number.parseInt(override, 10)
      }
      const base = this.getAbsBase(ability)
      const species = this.absSpeciesBonus(ability)
      const abis = this.absAbis(ability)
      const other = this.getAbsOther(ability) || 0
      const misc = this.absMisc(ability)
      return base + species + abis + Number.parseInt(other, 10) + misc
    },
    getAbsOther (ability) {
      return this.character.abilityScores.other[ability]
    },
    setAbsOther ({ ability, value }) {
      return this.$store.dispatch('cb/UPDATE_CHARACTER', { cid: this.cid, attr: `abilityScores.other.${ability}`, value })
    },
    getAbsOverride (ability) {
      return this.character.abilityScores.override[ability]
    },
    setAbsOverride ({ ability, value }) {
      return this.$store.dispatch('cb/UPDATE_CHARACTER', { cid: this.cid, attr: `abilityScores.override.${ability}`, value })
    }
  }

}
