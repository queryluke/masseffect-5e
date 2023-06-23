export const state = () => ({
  campaigns: []
})

export const getters = {
  campaigns: state => state.campaigns
}

export const mutations = {
  SET_CAMPAIGNS (state, campaigns) {
    state.campaigns = campaigns
  },
  PUT_CAMPAIGN (state, campaign) {
    if (!campaign.id) {
      console.error('Cannot write campaign without providing an ID!')
      return
    }
    // overwrites campaign if matching id found, otherwise inserts it
    const ind = state.campaigns.findIndex(function ($campaign) {
      if ($campaign.id === campaign.id) {
        $campaign = campaign
        return true
      }
      return false
    })
    if (ind === -1) {
      state.campaigns.push(campaign)
    } else {
      state.campaigns.splice(ind, 1, campaign)
    }
  }
}

export const actions = {
  LOG_WRITE ({ dispatch, commit, rootGetters, getters }, entry) {
    debugger
    const ind = getters.campaigns.findIndex(campaign => campaign.characters[entry.source.id])
    if (ind !== -1) {
      const campaign = JSON.parse(JSON.stringify(getters.campaigns[ind]))
      campaign.logs.push(entry)
      commit('PUT_CAMPAIGN', campaign)
    }
  }
}
