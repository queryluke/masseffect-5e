function featureTitle (feature) {
  let featureTitle = feature.name
  if (feature.recharge) {
    featureTitle += ` (${feature.recharge})`
  }
  return featureTitle
}

export default featureTitle
