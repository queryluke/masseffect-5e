function groupDigits (value, separator) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
}

export default groupDigits
