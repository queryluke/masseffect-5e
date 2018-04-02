function npcName (input, name) {
  return input.replace(/\[name]/g, name.toLowerCase())
}

export default npcName
