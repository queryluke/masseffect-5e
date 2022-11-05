export const state = () => ({
  characterHomebrew: []
})

export const getters = {
  characterHomebrew: state => state.characterHomebrew,
  powers: (state, getters) => getters.characterHomebrew.filter(i => i.homebrew.model === 'powers'),
  weapons: (state, getters) => getters.characterHomebrew.filter(i => i.homebrew.model === 'weapons')
}

export const mutations = {
  SET_CHARACTER_SPECIFIC_HOMEBREW (state, homebrew) {
    state.characterHomebrew = homebrew
  }
}

export const actions = {
  async SYNC_HOMEBREW ({ dispatch, commit, rootGetters }) {
    if (!rootGetters['auth/isAuthenticated']) {
      return
    }
    await dispatch('FETCH_HOMEBREW_DATA', null, { root: true })
    if (!rootGetters['character/characterReady']) {
      return
    }
    const homebrewPromises = []
    // sync powers
    const powerList = rootGetters['character/powers/powerList']
    for (const selectedPower of rootGetters['character/powers/selectedPowers']) {
      const power = powerList.find(i => i.id === selectedPower.id)
      if (!power) {
        const homebrewPower = rootGetters.homebrew.find(i => i.id === selectedPower.id)
        if (!homebrewPower) {
          homebrewPromises.push(
            dispatch('api/QUERY', { query: 'getHomebrew', variables: { id: selectedPower.id } }, { root: true })
          )
        }
      }
    }

    // sync weapons
    const weaponList = rootGetters['character/equipment/weaponsList']
    for (const selectedWeapon of rootGetters['character/equipment/equipment'].filter(i => i.type === 'weapon')) {
      const weapon = weaponList.find(i => i.id === weaponList.id)
      if (!weapon) {
        const homebrewWeapon = rootGetters.homebrew.find(i => i.id === selectedWeapon.id)
        if (!homebrewWeapon) {
          homebrewPromises.push(
            dispatch('api/QUERY', { query: 'getHomebrew', variables: { id: selectedWeapon.id } }, { root: true })
          )
        }
      }
    }
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
