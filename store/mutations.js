export default {
  addBookmark (state, payload) {
    state.bookmarks.push(payload)
  },
  addEncounterNpc (state, payload) {
    const index = state.encounter.npcs.list.indexOf(payload)
    if (index > -1) {
      state.encounter.npcs.counts[index] += 1
    } else {
      state.encounter.npcs.list.push(payload)
      state.encounter.npcs.counts.push(1)
    }
  },
  toggleMobileFilterDialog (state) {
    state.mobileFilterDialog = !state.mobileFilterDialog
  },
  removeBookmark (state, index) {
    state.bookmarks.splice(index, 1)
  },
  removeEncounterNpc (state, payload) {
    const index = state.encounter.npcs.list.indexOf(payload)
    if (index > -1) {
      state.encounter.npcs.counts.splice(index, 1)
      state.encounter.npcs.list.splice(index, 1)
    }
  },
  toggleGlobalDialog (state, payload) {
    state.globalDialog.show = payload
  },
  toggleSidebar (state, payload) {
    state.sidebar = payload
  },
  update (state, payload) {
    state[payload.key] = payload.items
  },
  updateGlobalDialogComponent (state, payload) {
    state.globalDialog.component = payload
  },
  updateGruntConfig (state, payload) {
    state.gruntConfig[payload.key] = payload.value
  },
  updatePageTitle (state, payload) {
    state.pageTitle = payload.value
  },
  updateSearchString (state, payload) {
    state.searchString = payload.value
  }
}
