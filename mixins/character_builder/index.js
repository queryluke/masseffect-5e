import { Profs } from '../labels/Profs'
import { AbilityScoreBonus } from '../abilityScoreBonus'
import { Character } from './character'

export const CharacterBuilderHelpers = {
  mixins: [
    AbilityScoreBonus,
    Character,
    Profs
  ],
  computed: {
    species () {
      return this.$store.getters.getData('species')
    },
    classes () {
      return this.$store.getters.getData('classes')
    },
    subclasses () {
      return this.$store.getters.getData('subclasses')
    },
    features () {
      return this.$store.getters.getData('class-features')
    },
    backgrounds () {
      return this.$store.getters.getData('backgrounds')
    },
    progression () {
      return [...this.$store.getters.getData('character-progression')].sort((a, b) => a.level - b.level)
    },
    feats () {
      return this.$store.getters.getData('feats')
    }
  },
  methods: {
    classData (id) {
      return this.$store.getters.getItem('classes', id)
    }
  }
}
