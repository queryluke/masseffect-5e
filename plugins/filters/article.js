function article (value) {
  if ([8, 11, 18, '8', '11', '18'].includes(value)) {
    return 'an'
  }
  return 'a'
}

export default article
