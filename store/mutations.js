export default {
  toggleSidebar (state, payload) {
    state.sidebar = payload
  },
  toggleGlobalDialog (state, payload) {
    state.globalDialog.show = payload
  },
  updateGlobalDialogComponent (state, payload) {
    state.globalDialog.component = payload
  },
  updateGruntConfig (state, payload) {
    state.gruntConfig[payload.key] = payload.value
  },
  addBookmark (state, payload) {
    state.bookmarks.push(payload)
  },
  removeBookmark (state, index) {
    state.bookmarks.splice(index, 1)
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
  removeEncounterNpc (state, payload) {
    const index = state.encounter.npcs.list.indexOf(payload)
    if (index > -1) {
      state.encounter.npcs.counts.splice(index, 1)
      state.encounter.npcs.list.splice(index, 1)
    }
  },
  update (state, payload) {
    state[payload.key] = payload.items
  }
}
