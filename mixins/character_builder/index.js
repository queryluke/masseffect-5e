import { ProfLabels } from '../labels/ProfLabels'
import { AbilityScoreBonus } from '../abilityScoreBonus'
import { Klasses } from './klasses'
import { Level } from './Level'
import { Proficiencies } from './Proficiencies'
import { Species } from './Species'
import { AbilityScores } from './AbilityScores'
import { Background } from './Background'
import { Selections } from './Selections'

/*
 * Aspect Schema
 * species-batarian
 * species-batarian-shrewd-negotiator
 * species-batarian-shrewd-negotiator-profs-skill
 */

export const CharacterBuilderHelpers = {
  mixins: [Klasses, Proficiencies, Level, Species, ProfLabels, AbilityScoreBonus, AbilityScores, Background, Selections],
  computed: {
    cid () {
      return this.$route.params.id || false
    },
    character () {
      return this.$store.getters['cb/characters'][this.cid]
    },
    characterImage: {
      get () {
        return this.character.image || (this.speciesId ? this.speciesData.bodyImg : false) || require('~/assets/images/me5e_logo_450w.png')
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
    identString () {
      const species = this.speciesId ? this.speciesData.name : ''
      const classes = this.classes.length > 0 ? this.classesString : ''
      return `${species} ${classes}`
    },
    classesString () {
      const classStrings = this.character.classes.map(i => this.classString(i))
      return this.$t(`lists.comma_list[${classStrings.length}]`, classStrings)
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
    },
    toolProfs () {
      return this.$store.getters.getData('tool-profs')
    }
  },
  methods: {
    classData (id) {
      return this.$store.getters.getItem('classes', id)
    },
    classString (klass) {
      const name = []
      if (klass.subclass) {
        const subclassData = this.subclasses.find(i => i.id === klass.subclass)
        if (subclassData) {
          name.push(subclassData.name)
        }
      }
      name.push(this.classData(klass.id).name)
      const level = this.$t('level_nth', { nth: this.$t(`ordinal_numbers[${klass.levels}]`) })
      return `${level} ${name.join(' ')}`
    }
  }
}
