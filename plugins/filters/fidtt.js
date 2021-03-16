function fidtt (string) {
  const theString = string.toString()
  let delimeter = '-'
  if (theString.match(/_/)) {
    delimeter = '_'
  }
  return theString.split(delimeter).map((v) => {
    if (['ai'].includes(v)) {
      return v.toUpperCase()
    }
    return v.charAt(0).toUpperCase() + v.slice(1)
  }).join(' ')
}

export default fidtt
