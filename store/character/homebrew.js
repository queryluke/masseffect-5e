export const state = () => ({
  characterHomebrew: []
})

export const getters = {
  characterHomebrew: state => state.characterHomebrew,
  powers: (state, getters) => getters.characterHomebrew.filter(i => i.homebrew.model === 'powers')
}

export const mutations = {
  SET_CHARACTER_SPECIFIC_HOMEBREW (state, homebrew) {
    state.characterHomebrew = homebrew
  }
}

export const actions = {
  async SYNC_HOMEBREW ({ dispatch, commit, rootGetters }) {
    await dispatch('FETCH_HOMEBREW_DATA', null, { root: true })
    if (!rootGetters['auth/isAuthenticated']) {
      return
    }
    if (!rootGetters['character/characterReady']) {
      return
    }
    const homebrewPromises = []
    // sync powers
    const powerList = rootGetters['character/powers/powerList']
    for (const selectedPower of rootGetters['character/powers/selectedPowers']) {
      const power = powerList.find(i => i.id === selectedPower.id)
      if (!power) {
        homebrewPromises.push(
          dispatch('api/QUERY', { query: 'getHomebrew', variables: { id: selectedPower.id } }, { root: true })
        )
      }
    }
    homebrewPromises.push(
      dispatch('api/QUERY', { query: 'getHomebrew', variables: { id: 'notfoundtest' } }, { root: true })
    )
    const homebrewBatchResponse = await Promise.all(homebrewPromises)
    const characterSpecificHomebrew = homebrewBatchResponse.filter(i => i).map((i) => {
      const data = JSON.parse(i.data)
      return {
        ...data,
        id: i.id,
        homebrew: {
          createdBy: i.profile.username || 'anonymous',
          model: i.model
        }
      }
    })
    commit('SET_CHARACTER_SPECIFIC_HOMEBREW', characterSpecificHomebrew || [])
  }
}
