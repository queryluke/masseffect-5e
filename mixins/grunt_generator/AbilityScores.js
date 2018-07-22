export const AbilityScores = {
  methods: {
    setGruntAbilityScores (config, grunt) {
      grunt.abilityScores = {
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0
      }
      const classStats = {
        adept: {wis: 5, dex: 4, cha: 1},
        engineer: {int: 5, dex: 4, con: 1},
        infiltrator: {dex: 5, int: 4, str: 3},
        sentinel: {wis: 5, int: 4, dex: 2},
        soldier: {dex: 5, str: 4, con: 3},
        vanguard: {str: 5, wis: 4, con: 2},
        none: {dex: 5, str: 3, con: 2}
      }
      if (grunt.race.id === 'asari') {
        classStats.adept = {cha: 5, dex: 4, wis: 1}
        classStats.sentinel = {cha: 5, int: 4, dex: 2}
        classStats.vanguard = {str: 5, cha: 4, con: 2}
      }
      const standardArray = [15, 14, 13, 12, 10, 8]

      // Create stat weights
      const statWeights = classStats[grunt.sc.id]

      const weightedAbilitySelection = {
        increase: Object.keys(grunt.abilityScores),
        reduction: Object.keys(grunt.abilityScores)
      }
      // Set base ability scores & setup the weighted ability selection
      const abilities = Object.keys(grunt.abilityScores)
      for (const w in statWeights) {
        if (Object.prototype.hasOwnProperty.call(statWeights, w)) {
          const weightedArray = standardArray.slice(0, (standardArray.length - statWeights[w]))
          const score = this.randomValue(weightedArray)
          grunt.abilityScores[w] = score
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
        grunt.abilityScores[ability] = score
        standardArray.splice(standardArray.indexOf(score), 1)
        weightedAbilitySelection.reduction.push(ability)
        weightedAbilitySelection.reduction.push(ability)
      }
      // Set boosts based on CR
      if (config.cr.abIncrease) {
        const increase = this.randomValue(config.cr.abIncrease)
        for (let i = 0; i < increase; i++) {
          const ability = this.randomValue(weightedAbilitySelection.increase)
          grunt.abilityScores[ability]++
        }
      }
      // Set decreases based on CR
      if (config.cr.abReduction) {
        const reduction = this.randomValue(config.cr.abReduction)
        for (let i = 0; i < reduction; i++) {
          const ability = this.randomValue(weightedAbilitySelection.reduction)
          if (grunt.abilityScores[ability] === 1) {
            continue
          }
          grunt.abilityScores[ability]--
        }
      }

      // add race attributes
      switch (grunt.race.id) {
        case 'human': {
          let ability = this.randomValue(weightedAbilitySelection.increase)
          grunt.abilityScores[ability] += 2
          ability = this.randomValue(weightedAbilitySelection.increase)
          grunt.abilityScores[ability]++
          break
        }
        case 'unshackled_ai': {
          const filteredInt = weightedAbilitySelection.increase.filter(ability => {
            return ability === 'int'
          })
          const ability = this.randomValue(filteredInt)
          grunt.abilityScores[ability]++
          grunt.abilityScores.int += 2
          break
        }
        default: {
          const increases = grunt.race.increases.split(',')
          for (const inc of increases) {
            const ability = inc.toLowerCase().replace(/[^a-z]/g, '').slice(0, 3)
            const increase = parseInt(inc.replace(/\D/, ''), 10)
            grunt.abilityScores[ability] += increase
          }
        }
      }

      return grunt.abilityScores
    }
  }
}
