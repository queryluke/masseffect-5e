function weaponRange (weapon) {
  if (!weapon.type || !weapon.range) {
    return ''
  }

  switch (weapon.type) {
    case 'Melee':
    case 'Heavy Weapon':
      return `${weapon.range}m`
    case 'Shotgun':
      return `(${weapon.range}/${Number.parseInt(weapon.range, 10) * 2}m)`
    default:
      return `(${weapon.range}/${Number.parseInt(weapon.range, 10) * 3}m)`
  }
}

export default weaponRange
