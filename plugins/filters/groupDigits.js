function groupDigits (value, separator) {
  if (value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
  }
  return ''
}

export default groupDigits
