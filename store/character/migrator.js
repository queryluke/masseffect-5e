
export const actions = {
  migrate ({ dispatch }, character) {
    return dispatch('toV101', character)
  },
  toV101 (character) {
    if (typeof character.meta === 'undefined') {
      character.meta = {
        remote: false,
        version: '1.0.1'
      }
      character.selected = []
      character.subspecies = null
      character.options = {
        tashas: false
      }
    }
    const klassSelections = character.selections.filter(i => i.source.startsWith('klass'))
    for (const ks of klassSelections) {
      const [model, klass, level] = ks.source
      const pathArray = [model, klass]
      if (!isNaN(parseInt(level))) {
        pathArray.push(level)
      }
      const type = ks.subtype === 'feat' ? 'feats' : ks.subtype
      pathArray.push(type)
      const converted = {
        path: pathArray.join('/'),
        value: []
      }
      if (ks.value.length) {
        for (const ksv of ks.value) {
          converted.value.push({ type, value: ksv })
        }
      }
    }
    for (const prof of ['armor', 'weapon', 'savingThrow', 'tool']) {
      const p = character.selections.find(i => i.source === `custom-${prof}`)
      character.settings[prof] = p?.value || []
    }
    // TODO: background
    character.currentStats = { ...character.currentStats, resources: {}, paragon: 0, renegade: 0 }
    character.settings = { ...character.settings, armor: [], savingThrow: [], weapon: [], tool: [], skill: character.settings.skill }
    delete character.settings.skills
    return character
  }
}
