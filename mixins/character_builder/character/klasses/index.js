import { Multiclass } from './Multiclass'
import { Klass } from './Klass'

export const Klasses = {
  mixins: [Multiclass, Klass],
  computed: {
    characterClasses: {
      get () {
        return this.character.classes
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', {
          cid: this.$route.query.cid,
          attr: 'classes',
          value
        })
      }
    },
    startingClass () {
      return this.characterClasses[0]
    },
    multiclasses () {
      return this.characterClasses.slice(1).map((i, index) => {
        return { ...i, index: index + 1 }
      })
    }
  }
}
