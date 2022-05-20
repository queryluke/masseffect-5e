export const state = () => ({
  thresholds: [15, 30, 60, 100]
})

export const getters = {
  benefitsList: (state, getters, rootState, rootGetters) => {
    return rootGetters.getData('edges').filter(i => i.type === 'benefits')
  },
  selectedBenefits: (state, getters, rootState, rootGetters) => {
    return rootGetters['character/character'].selected
      .filter(i => i.path.startsWith('reputation'))
      .map((i) => {
        return {
          ...i,
          threshold: parseInt(i.path.split('/')[1], 10)
        }
      })
  },
  reputation: (state, getters, rootState, rootGetters) => {
    const paragon = rootGetters['character/character'].currentStats.paragon || 0
    const renegade = rootGetters['character/character'].currentStats.renegade || 0
    return {
      paragon,
      renegade,
      total: paragon + renegade
    }
  },
  thresholds: (state, getters) => {
    function isAvailable (reputation, benefit) {
      if (reputation.total < benefit.threshold) {
        return false
      }
      const stats = benefit.prereq.paragon || benefit.prereq.renegade
      if (stats.within) {
        const renegadeWithin = (reputation.renegade <= (reputation.paragon + stats.within) && reputation.renegade >= (reputation.paragon - stats.within))
        const paragonWithin = (reputation.paragon <= (reputation.renegade + stats.within) && reputation.paragon >= (reputation.renegade - stats.within))
        return renegadeWithin || paragonWithin
      } else {
        const which = benefit.prereq.paragon ? 'paragon' : 'renegade'
        const other = benefit.prereq.paragon ? 'renegade' : 'paragon'
        return reputation[which] >= stats.min && reputation[which] >= reputation[other]
      }
    }

    const thresholds = []
    for (const threshold of state.thresholds) {
      if (getters.reputation.total >= threshold) {
        const thObject = {
          threshold,
          options: getters.benefitsList.filter(i => i.threshold === threshold).map((i) => {
            return {
              ...i,
              text: i.name,
              value: i.id,
              available: isAvailable(getters.reputation, i)
            }
          }),
          selected: null,
          needsAttention: false
        }
        const selectedAtThreshold = getters.selectedBenefits.find(i => i.threshold === threshold)
        if (selectedAtThreshold) {
          // Always, only 1?
          const selectedId = selectedAtThreshold.value[0].value
          if (selectedId) {
            thObject.selected = selectedId
            try {
              const benefit = getters.benefitsList.find(i => i.id === selectedId)
              thObject.needsAttention = !isAvailable(getters.reputation, benefit)
            } catch (e) {
              console.error(`could not find ${selectedId}`)
            }
          }
        }
        thresholds.push(thObject)
      }
    }
    return thresholds
  },
  benefitsMechanics: (state, getters) => {
    return getters.thresholds.map((i) => {
      return {
        path: `reputation/${i.threshold}`,
        mechanics: [
          {
            type: 'model-choice',
            model: 'benefits',
            options: true
          }
        ]
      }
    })
  }

}

export const mutations = {
}

export const actions = {
}
