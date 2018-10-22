/*
import {BestiaryHelpers} from '../bestiaryHelpers'
import {DieFromAverage} from '../dieFromAverage'
import {Helpers} from './Helpers'
import {Hp} from './Hp'
import {Features} from './Features'
import {NumberRange} from '../numberRange'
import {Senses} from './Senses'
*/

import {AbilityScoreBonus} from '../abilityScoreBonus'
import {Ac} from './Ac'
import {AverageFromDie} from '../averageFromDie'
import {AbilityScores} from './AbilityScores'
import {Actions} from './Actions'
import {Alignment} from './Alignmnet'
import {Features} from './Features'
import {Id} from './Id'
import {Image} from './Image'
import {InnateSpellcasting} from './InnateSpellcasting'
import {Name} from './Name'
import {Rivs} from './Rivs'
import {SavingThrows} from './SavingThrows'
import {Skills} from './Skills'
import {Spellcasting} from './Spellcasting'
import {Speed} from './Speed'
import {Type} from './Type'
import {RandomValue} from '../randomValue'
import {CrToInt} from '../crToInt'

// data
import races from '~/static/data/races'
import classes from '~/static/data/classes'
import crs from '~/static/data/stats_by_cr'
import spells from '~/static/data/spells'
import weapons from '~/static/data/weapons'
import grenades from '~/static/data/grenades'

// options
import {createNamespacedHelpers} from 'vuex'
const {mapGetters} = createNamespacedHelpers('gruntGenerator')

export const GruntGenerator = {
  computed: {
    ...mapGetters({ selectedCr: 'cr' }),
    ...mapGetters({ selectedRace: 'race' }),
    ...mapGetters({ selectedClass: 'sc' }),
    crMetaLevel () {
      if (this.cr) {
        return parseFloat(this.cr.cr) <= 1 ? 0 : Math.ceil(parseFloat(this.cr.cr) / 4)
      }
      return 0
    }
  },
  data () {
    return {
      grunt: {},
      spells,
      weapons,
      grenades,
      dpr: {
        weapon: 0,
        spell: 0,
        grenade: 0,
        heavyWeapon: 0
      },
      adjustments: {
        dpr: 0,
        hit: 0,
        hp: 0,
        ac: 0
      }
    }
  },
  mixins: [
    AbilityScoreBonus,
    Ac,
    AbilityScores,
    Actions,
    Alignment,
    AverageFromDie,
    Features,
    Id,
    Image,
    InnateSpellcasting,
    Name,
    Rivs,
    SavingThrows,
    Skills,
    Spellcasting,
    Speed,
    Type,
    RandomValue,
    CrToInt
  ],
  methods: {
    generateGrunt () {
      this.cr = this.selectedCr && this.selectedCr.cr ? this.selectedCr : this.randomValue(crs)
      this.race = this.selectedRace && this.selectedRace.id ? this.selectedRace : this.randomValue(races)
      this.sc = this.selectedClass && this.selectedClass.id ? this.selectedClass : this.randomValue(classes)

      this.resetDpr()
      this.setGruntAbilityScores()
      this.setGruntName()
      this.setGruntId()
      this.setGruntImage()
      this.setGruntAlignment()
      this.setGruntRivs()
      this.setGruntSavingThrows()
      this.setGruntInnateSpellcasting()
      this.setGruntSpellcasting()
      this.setGruntActions()
      this.setGruntSpeed()
      this.setGruntSkills()
      this.setGruntFeatures()
      this.setGruntAc()

      this.grunt.lairActions = []
      this.grunt.profBonus = this.cr.profBonus
      this.grunt.size = 'Medium'
      this.grunt.cr = this.cr.cr
      this.grunt.unit = ''
      console.log(this.grunt)
    },
    resetDpr () {
      this.dpr = {
        weapon: 0,
        spell: 0,
        grenade: 0,
        heavyWeapon: 0
      }
      this.adjustments = {
        dpr: 0,
        hit: 0,
        hp: 0,
        ac: 0
      }
    }
  }
}
