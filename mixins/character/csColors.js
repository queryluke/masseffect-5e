export const CsColors = {
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
  computed: {
    dark () {
      return this.$store.getters['user/darkMode']
    }
  },
  methods: {
    csBgColor (key) {
      const modeKey = this.dark ? 'dark' : 'light'
      return this.csColors[key][modeKey].bg
    },
    csTextColor (key) {
      const modeKey = this.dark ? 'dark' : 'light'
      return this.csColors[key][modeKey].text
    }
  }
}
