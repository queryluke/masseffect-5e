export const CharacterHelpers = {
  data () {
    return {
      csColors: {
        hp: {
          dark: {
            bg: 'green',
            text: 'green--text'
          },
          light: {
            bg: 'green darken-3',
            text: 'green--text text--darken-3'
          }
        },
        shields: {
          dark: {
            bg: 'blue',
            text: 'blue--text'
          },
          light: {
            bg: 'blue accent-4',
            text: 'blue--text text--accent-4'
          }
        },
        temp: {
          dark: {
            bg: 'blue-grey lighten-1',
            text: 'blue-grey--text text--lighten-1'
          },
          light: {
            bg: 'blue-grey darken-2',
            text: 'blue-grey--text text--darken-2'
          }
        },
        damage: {
          dark: {
            bg: 'red',
            text: 'red--text'
          },
          light: {
            bg: 'red accent-4',
            text: 'red--text text--accent-4'
          }
        },
        barrier: {
          dark: {
            bg: 'purple accent-2',
            text: 'purple--text text--accent-2'
          },
          light: {
            bg: 'purple darken-3',
            text: 'purple--text text--darken-3'
          }
        }
      }
    }
  },
  methods: {
    identString (character) {
      let subspeciesName, speciesName, variantName, classString
      if (character.species) {
        const species = this.$store.getters.getItem('subspecies', character.subspecies)
        speciesName = species.name
        if (species.type === 'variant') {
          variantName = `Variant ${this.$store.getters.getItem('species', species.species).name}`
        }
      }
      if (character.subspecies) {
        subspeciesName = this.$store.getters.getItem('subspecies', character.subspecies)?.name
      }
      const species = [(subspeciesName || variantName), speciesName].filter(i => i).join(' ')
      if (character.classes.length > 0) {
        const classStrings = []
        for (const klass of character.classes) {
          let subclassName
          const className = this.$store.getters.getItem('classes', klass.id)?.name
          if (klass.subclass) {
            subclassName = this.$store.getters.getItem('subclasses', klass.subclass)?.name
          }
          const level = this.$tc(`ordinal_numbers[${klass.levels}] level`)
          classStrings.push([level, subclassName, className].filter(i => i).join(' '))
        }
        classString = classStrings.join(', ')
      }
      console.log(species, classString)
      return `${species} ${classString}`
    }
  }
}
