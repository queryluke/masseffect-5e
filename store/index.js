import Vuex from 'vuex'

import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const createStore = () => {
  return new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {}
  })
}

export default createStore
