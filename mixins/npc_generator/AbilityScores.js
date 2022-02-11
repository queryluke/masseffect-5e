export const AbilityScores = {
  methods: {
    setAbilityScores () {
      this.npc.abilityScores = {
        str: 1,
        dex: 1,
        con: 1,
        int: 1,
        wis: 1,
        cha: 1
      }
      const classStats = {
        adept: ['wis', 'dex', 'cha'],
        engineer: ['int', 'dex', 'con'],
        infiltrator: ['dex', 'int', 'str'],
        sentinel: ['wis', 'int', 'dex'],
        soldier: ['dex', 'str', 'con'],
        vanguard: ['str', 'wis', 'con']
      }
      const standardArray = this.options.cr.normalized <= 5
        ? [12, 11, 10, 10, 9, 8]
        : [15, 14, 13, 12, 10, 8]

      // Create stat weights
      const statWeights = classStats[this.options.klass.id]
      // Set base ability scores & setup the weighted ability selection
      for (const w in this.npc.abilityScores) {
        if (statWeights.includes(w)) {
          this.npc.abilityScores[w] = standardArray[statWeights.indexOf(w)]
        } else {
          this.npc.abilityScores[w] = standardArray[this.randomValue([3, 4, 5])]
        }
      }

      // add species attributes
      const species = this.$store.getters.getData('species')
      const speciesData = species.find(i => i.id === this.options.species.id)
      const increases = speciesData.mechanics.filter(i => i.type.startsWith('asi'))
      if (speciesData.subspecies) {
        const subspecies = species.filter(i => i.type === 'subspecies' && i.species === this.options.species.id)
        const randomSubspecies = this.randomValue(subspecies)
        increases.push(...randomSubspecies.mechanics.filter(i => i.type.startsWith('asi')))
      }
      for (const inc of increases) {
        if (inc.type === 'asi-choice') {
          if (inc.limit) {
            this.npc.abilityScores[this.randomValue(inc.limit)] += 1
          } else {
            this.npc.abilityScores[this.randomValue(['str', 'dex', 'con', 'wis', 'int', 'cha'])] += 1
          }
        } else {
          const increase = parseInt(inc.amount, 10)
          this.npc.abilityScores[inc.ability] += increase
        }
      }

      // increase con based on offsensiveScale
      this.npc.abilityScores.con += (this.options.offensiveScale * -1)

      // reduce/increase primary score if it is not within damage margins
      const marginMin = this.options.cr.attack + (this.options.offensiveScale <= 0 ? this.options.offensiveScale : 0)
      let marginMax = this.options.cr.attack + (this.options.offensiveScale <= 0 ? 0 : this.options.offensiveScale)
      if (marginMax > 19) {
        marginMax = 19
      }
      const attackBonus = this.abilityScoreBonus(this.npc.abilityScores[statWeights[0]]) + this.options.cr.profBonus
      if (attackBonus > marginMax) {
        const diff = attackBonus - marginMax
        const reduction = diff * 2
        for (const score in this.npc.abilityScores) {
          if (this.npc.abilityScores[score] > 10) {
            this.npc.abilityScores[score] -= reduction
          }
        }
      } else if (attackBonus < marginMin) {
        const diff = marginMin - attackBonus
        for (const score of statWeights) {
          if (this.npc.abilityScores[score] + (diff * 2) > 30) {
            this.npc.abilityScores[score] = 30
          } else {
            this.npc.abilityScores[score] += (diff * 2)
          }
        }
        for (const score in this.npc.abilityScores) {
          if (!statWeights.includes(score)) {
            if (this.npc.abilityScores[score] + diff > 30) {
              this.npc.abilityScores[score] = 30
            } else {
              this.npc.abilityScores[score] += diff
            }
          }
        }
      }
    }

  }
}
