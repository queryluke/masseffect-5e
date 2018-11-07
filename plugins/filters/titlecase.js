function titlecase (value) {
  if (value) {
    return value.split(' ').map(v => v.charAt(0).toUpperCase() + v.slice(1)).join(' ')
  }
  return ''
}

export default titlecase
