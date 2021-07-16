import { get as getCharacterValue } from 'lodash'
import { ProfLabels } from '../labels/ProfLabels'
import { AbilityScoreBonus } from '../abilityScoreBonus'
import { Klasses } from './klasses'
import { Level } from './Level'
import { Proficiencies } from './Proficiencies'
import { Species } from './species'
import { Info } from './Info'
export const CharacterBuilderHelpers = {
  mixins: [Klasses, Proficiencies, Level, Species, ProfLabels, AbilityScoreBonus, Info],
  computed: {
    cid () {
      return this.$route.params.id || false
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
    },
    characterImage: {
      get () {
        return this.character.image || this.speciesData.bodyImg || require('~/assets/images/me5e_logo_450w.png')
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'image', value })
      }
    },
    characterName: {
      get () {
        return this.character.name || 'Unnamed Character'
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'name', value })
      }
    },
    // Data fetchers
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
    traits () {
      return this.$store.getters.getData('traits')
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
    },
    checkAspectSelections (mechanic, path) {
      const value = getCharacterValue(this.character, path)
      if (!value) {
        return true
      }
      if (mechanic.choices) {
        return value.length < mechanic.choices.count
      }
      return false
    }
  }
}
