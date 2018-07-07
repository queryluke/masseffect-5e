import Vuex from 'vuex'

import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

// modules
import phb from './phb-pages'
import classPage from './classPage'
import itemList from './itemList'

const createStore = () => {
  return new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
      phb,
      classPage,
      itemList
    }
  })
}

export default createStore
