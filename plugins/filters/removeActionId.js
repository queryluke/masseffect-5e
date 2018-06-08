function removeActionId (id) {
  return id.replace(/---.*?$/, '')
}

export default removeActionId
