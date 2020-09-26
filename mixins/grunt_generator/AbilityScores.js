export const AbilityScores = {
  methods: {
    setGruntAbilityScores () {
      this.grunt.abilityScores = {
        str: 1,
        dex: 1,
        con: 1,
        int: 1,
        wis: 1,
        cha: 1
      }
      const classStats = {
        adept: { wis: 5, dex: 4, cha: 1 },
        engineer: { int: 5, dex: 4, con: 1 },
        infiltrator: { dex: 5, int: 4, str: 3 },
        sentinel: { wis: 5, int: 4, dex: 2 },
        soldier: { dex: 5, str: 4, con: 3 },
        vanguard: { str: 5, wis: 4, con: 2 },
        none: { dex: 5, str: 3, con: 2 }
      }
      if (this.race.id === 'asari') {
        classStats.adept = { cha: 5, dex: 4, wis: 1 }
        classStats.sentinel = { cha: 5, int: 4, dex: 2 }
        classStats.vanguard = { str: 5, cha: 4, con: 2 }
      }
      const standardArray = [15, 14, 13, 12, 10, 8]

      // Create stat weights
      const statWeights = classStats[this.sc.id]

      const weightedAbilitySelection = {
        increase: Object.keys(this.grunt.abilityScores),
        reduction: Object.keys(this.grunt.abilityScores)
      }
      // Set base ability scores & setup the weighted ability selection
      const abilities = Object.keys(this.grunt.abilityScores)
      for (const w in statWeights) {
        if (Object.prototype.hasOwnProperty.call(statWeights, w)) {
          const weightedArray = standardArray.slice(0, (standardArray.length - statWeights[w]))
          const score = this.randomValue(weightedArray)
          this.grunt.abilityScores[w] = score
          standardArray.splice(standardArray.indexOf(score), 1)
          abilities.splice(abilities.indexOf(w), 1)
          let i = 0
          while (i < statWeights[w]) {
            weightedAbilitySelection.increase.push(w)
            i++
          }
        }
      }
      for (const ability of abilities) {
        const score = this.randomValue(standardArray)
        this.grunt.abilityScores[ability] = score
        standardArray.splice(standardArray.indexOf(score), 1)
        weightedAbilitySelection.reduction.push(ability)
        weightedAbilitySelection.reduction.push(ability)
      }
      // Set boosts based on CR
      if (this.cr.abIncrease) {
        const increase = this.randomValue(this.cr.abIncrease)
        for (let i = 0; i < increase; i++) {
          const ability = this.randomValue(weightedAbilitySelection.increase)
          this.grunt.abilityScores[ability]++
        }
      }
      // Set decreases based on CR
      if (this.cr.abReduction) {
        const reduction = this.randomValue(this.cr.abReduction)
        for (let i = 0; i < reduction; i++) {
          const ability = this.randomValue(weightedAbilitySelection.reduction)
          if (this.grunt.abilityScores[ability] === 1) {
            continue
          }
          this.grunt.abilityScores[ability]--
        }
      }

      // add race attributes
      switch (this.race.id) {
        case 'human': {
          let ability = this.randomValue(weightedAbilitySelection.increase)
          this.grunt.abilityScores[ability] += 2
          ability = this.randomValue(weightedAbilitySelection.increase)
          this.grunt.abilityScores[ability]++
          break
        }
        default: {
          const increases = this.race.abilityScoreIncrease
          for (const inc of increases) {
            const ability = inc.ability.toLowerCase().slice(0, 3)
            const increase = parseInt(inc.amount, 10)
            this.grunt.abilityScores[ability] += increase
          }
        }
      }
    }
  }
}
