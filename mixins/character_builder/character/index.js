import { Klasses } from './klasses'
import { Level } from './Level'
import { Proficiencies } from './Proficiencies'

export const Character = {
  mixins: [Klasses, Proficiencies, Level],
  computed: {
    cid () {
      return this.$route.query.cid || false
    },
    character () {
      if (!this.cid) {
        return false
      }
      const char = this.$store.getters['cb/characters'][this.cid]
      if (!char) {
        return false
      }
      return char.character
    }
  }
}
