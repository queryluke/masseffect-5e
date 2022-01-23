import { ProfLabels } from '../labels/ProfLabels'
import { AbilityScoreBonus } from '../abilityScoreBonus'
import { Klasses } from './klasses'
import { Level } from './Level'
import { Proficiencies } from './Proficiencies'
import { Species } from './Species'
import { AbilityScores } from './AbilityScores'
import { Background } from './Background'
import { Selections } from './Selections'
import { Hp } from './Hp'
import { Barrier } from './Barrier'
import { Ac } from './Ac'
import { Speed } from './Speed'
import { Skills } from './Skills'
import { Equipment } from './Equipment'
import { Powers } from './Powers'
import { MechanicBag } from '~/mixins/character_builder/MechanicBag'
import { Feats } from '~/mixins/character_builder/Feats'
import { Defenses } from '~/mixins/character_builder/Defenses'

/*
 * Aspect Schema
 * species-batarian
 * species-batarian-shrewd-negotiator
 * species-batarian-shrewd-negotiator-profs-skill
 * background-criminal-specialty
 */

export const CharacterBuilderHelpers = {
  mixins: [Klasses, Proficiencies, Level, Species, ProfLabels, AbilityScoreBonus, AbilityScores, Background, Selections,
    Hp, Barrier, Ac, Speed, Skills, Equipment, Powers, MechanicBag, Feats, Defenses],
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
    cid () {
      return this.$route.query.id || false
    },
    character () {
      return this.$store.getters['cb/characters'][this.cid]
    },
    characterImage: {
      get () {
        return this.character.image || (this.speciesId ? this.speciesData.bodyImg : false) || require('~/assets/images/me5e_logo_450w.png')
      },
      set (value) {
        this.$store.dispatch('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'image', value })
      }
    },
    characterName: {
      get () {
        return this.character.name || 'Unnamed Character'
      },
      set (value) {
        this.$store.dispatch('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'name', value })
      }
    },
    identString () {
      const species = this.speciesFullName
      const classes = this.classes.length > 0 ? this.classesString : ''
      return `${species} ${classes}`
    },
    classesString () {
      const classStrings = this.character.classes.map(i => this.classString(i))
      return this.$t(`lists.comma_list[${classStrings.length}]`, classStrings)
    },
    // Data fetchers
    species () {
      const official = this.$store.getters.getData('species')
      const homebrew = [this.customSpecies]
      return [...official, ...homebrew]
    },
    subspecies () {
      return this.$store.getters.getData('subspecies')
    },
    subspeciesOptions () {
      return this.$store.getters.getData('subspecies-options')
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
      const official = this.$store.getters.getData('backgrounds')
      const homebrew = [this.customBackground]
      return [...official, ...homebrew]
    },
    progression () {
      return [...this.$store.getters.getData('character-progression')].sort((a, b) => a.level - b.level)
    },
    feats () {
      return this.$store.getters.getData('feats')
    },
    toolProfs () {
      return this.$store.getters.getData('tool-profs')
    },
    skills () {
      return this.$store.getters.getData('skills')
    },
    weapons () {
      return this.$store.getters.getData('weapons')
    },
    armor () {
      return this.$store.getters.getData('armor')
    },
    gear () {
      return this.$store.getters.getData('gear')
    },
    mods () {
      return this.$store.getters.getData('mods')
    },
    powers () {
      return this.$store.getters.getData('powers')
    },
    conditions () {
      return this.$store.getters.getData('conditions')
    },
    weaponProperties () {
      return this.$store.getters.getData('weapon-properties')
    },
    damageTypes () {
      const items = []
      for (const key in this.$i18n.messages.en.damage_types) {
        if (key.endsWith('_damage') || key.endsWith('_title')) {
          continue
        }
        items.push({
          text: this.$t(`damage_types.${key}_title`),
          value: key
        })
      }
      return items
    },
    armorPlacements () {
      const items = []
      for (const key in this.$i18n.messages.en.armor_placements) {
        if (key.endsWith('_title')) {
          continue
        }
        items.push({
          text: this.$t(`armor_placements.${key}_title`),
          value: key
        })
      }
      return items
    },
    armorTypes () {
      const items = []
      for (const key in this.$i18n.messages.en.armor_types) {
        if (key.endsWith('_title') || key.endsWith('_armor')) {
          continue
        }
        items.push({
          text: this.$t(`armor_types.${key}`),
          value: key
        })
      }
      return items
    },
    weaponTypes () {
      const items = []
      for (const key in this.$i18n.messages.en.weapon_types) {
        items.push({
          text: this.$tc(`weapon_types.${key}`, 2),
          value: key
        })
      }
      return items
    },
    senses () {
      const items = []
      for (const key in this.$i18n.messages.en.senses) {
        if (key.endsWith('_title')) {
          continue
        }
        items.push(key)
      }
      return items
    },
    dark () {
      return this.$store.getters['user/darkMode']
    },
    characterReady () {
      return this.speciesId && this.characterClasses.length > 0 && this.allAbilityScoresSet
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
      return `${name.join(' ')} ${klass.levels}`
    },
    csBgColor (key) {
      const modeKey = this.$store.getters['user/darkMode'] ? 'dark' : 'light'
      return this.csColors[key][modeKey].bg
    },
    csTextColor (key) {
      const modeKey = this.$store.getters['user/darkMode'] ? 'dark' : 'light'
      return this.csColors[key][modeKey].text
    },
    async deleteSelections (path) {
      await this.$store.dispatch('cb/DELETE_SELECTED', {
        cid: this.cid,
        path
      })
    },
    async updateCharacter (attr, value) {
      await this.$store.dispatch('cb/UPDATE_CHARACTER', { cid: this.cid, attr, value })
    }
  }
}
