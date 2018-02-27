function article(value) {
  if ([8, 18, '8', '18'].includes(value)) {
    return 'an';
  }
  return 'a';
}

export default article;
