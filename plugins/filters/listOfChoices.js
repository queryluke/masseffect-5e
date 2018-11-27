function arrayToChoices (list, count = 1) {
  if (list.length === 1) {
    return list[0]
  }
  const finalItem = list.splice(-1, 1)
  return `${list.join(', ')}${list.length > 1 ? ', ' : ''} ${count > 1 ? 'and' : 'or'} ${finalItem}`
}

function digitToString (digit) {
  return ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'][digit - 1]
}

function listOfChoices (originalList, count = 1) {
  const list = JSON.parse(JSON.stringify(originalList))
  if (Array.isArray(list)) {
    if (count > 1) {
      return `Choose ${digitToString(count)} from ${arrayToChoices(list, count)}`
    } else {
      return arrayToChoices(list, count)
    }
  } else if (typeof list === 'object') {
    if (list.required && list.optional) {
      return `${list.required.join(', ')} and choose ${digitToString(count)} from ${arrayToChoices(list.optional, count)}`
    } else if (list.optional) {
      return `Choose ${digitToString(count)} from ${arrayToChoices(list.optional, count)}`
    } else {
      return list.required.join(', ')
    }
  } else {
    return list
  }
}

export default listOfChoices
