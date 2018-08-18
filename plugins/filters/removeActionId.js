function removeActionId (id) {
  if (id) {
    return id.replace(/---.*?$/, '')
  }
}

export default removeActionId
