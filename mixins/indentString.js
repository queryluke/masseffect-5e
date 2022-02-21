export default function identString (character, klasses, species, subclasses) {
  let speciesName, classString
  if (character.species) {
    const cSpecies = species.find(i => i.id === character.species)
    speciesName = cSpecies.name
    const variant = cSpecies.type === 'variant'
    const subspecies = cSpecies.type === 'subspecies'
    if (variant || subspecies) {
      const parentSpecies = species.find(i => i.id === cSpecies.species)
      speciesName = variant
        ? `Variant ${parentSpecies.name}: ${speciesName}`
        : `${speciesName} ${parentSpecies.name}`
    }
  }
  if (character.classes.length > 0) {
    const classStrings = []
    for (const klass of character.classes) {
      let subclassName
      const className = klasses.find(i => i.id === klass.id)?.name
      if (klass.subclass) {
        subclassName = subclasses.find(i => i.id === klass.subclass)?.name
      }
      const level = ` {{ ordinal_levels-${klass.levels} }} level`
      classStrings.push([level, subclassName, className].filter(i => i).join(' '))
    }
    classString = classStrings.join(', ')
  }
  return `${speciesName} • ${classString}`
}
