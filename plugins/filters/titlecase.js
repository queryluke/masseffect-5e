function titlecase (value) {
  return value.split(' ').map(v => v.charAt(0).toUpperCase() + v.slice(1)).join(' ')
}

export default titlecase
