function versionTotal (version) {
  const parts = version.split('.')
  return (parseInt(parts[0], 10) * 100) + (parseInt(parts[1], 10) * 10) + (parseInt(parts[2], 10) * 1)
}

export default {
  bookmarkCount: (state, getters) => {
    return getters.bookmarks.length
  },
  bookmarks: state => {
    return state.bookmarks
  },
  bookmarksGroupedByType: (state, getters) => {
    return getters.bookmarks.reduce((rv, x) => {
      (rv[x.type] = rv[x.type] || []).push(x.card)
      return rv
    }, {})
  },
  getData: state => name => {
    let data = state[name]
    if (typeof data === 'object' && data) {
      return data
    }
    data = state.data[name]
    if (typeof data === 'object' && data.data) {
      return data.data
    }
    return data
  },
  getDataItem: (state, getters) => (name, id) => {
    const item = getters.getData(name).find(item => item.id === id)
    if (typeof item === 'undefined') {
      console.log(`cannot find ${name}: ${id}`)
      return {}
    }
    return item
  },
  getGruntConfig: state => (key = false) => {
    return key ? state.gruntConfig[key] : state.gruntConfig
  },
  getMutableData: (state, getters) => name => {
    return JSON.parse(JSON.stringify(getters.getData(name)))
  },
  getSheetUrl: state => name => {
    return state.data[name].source
  },
  getSheetUpdated: state => name => {
    return state.data[name].updated
  },
  getVersion: state => {
    return state.version
  },
  getSingleVersion: state => slug => {
    return state.versions.find(version => version.slug === slug)
  },
  getVersions: state => (limit = null, order = 'desc') => {
    const sortOrder = order === 'desc' ? 1 : -1
    let versions = state.versions.sort((a, b) => {
      const verA = versionTotal(a.slug)
      const verB = versionTotal(b.slug)
      if (verA === verB) {
        return 0
      }
      return (verA < verB) ? sortOrder : sortOrder * -1
    })
    if (Number.isInteger(limit)) {
      versions.slice(0, limit)
    }
    return versions
  },
  isBookmarked: (state, getters) => card => {
    return getters.bookmarks.find(bookmark => bookmark.card.id === card.id) !== undefined
  },
  mobileFilterDialog: state => {
    return state.mobileFilterDialog
  },
  primaryNavigation: (state) => {
    return state.primaryNavigation
  },
  sidebar: state => {
    return state.sidebar
  },
  stateKeys: state => {
    return Object.keys(state)
  }
}
