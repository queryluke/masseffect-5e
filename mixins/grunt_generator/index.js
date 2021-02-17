import { AbilityScoreBonus } from '../abilityScoreBonus'
import { AverageFromDie } from '../averageFromDie'
import { RandomValue } from '../randomValue'
import { CrToInt } from '../crToInt'
import { Ac } from './Ac'
import { AbilityScores } from './AbilityScores'
import { Actions } from './Actions'
import { Alignment } from './Alignmnet'
import { Features } from './Features'
import { Hp } from './Hp'
import { Id } from './Id'
import { Image } from './Image'
import { InnateSpellcasting } from './InnateSpellcasting'
import { Name } from './Name'
import { Rivs } from './Rivs'
import { SavingThrows } from './SavingThrows'
import { Skills } from './Skills'
import { Spellcasting } from './Spellcasting'
import { Speed } from './Speed'
import { Type } from './Type'

export const GruntGenerator = {
  data () {
    return {
      npc: {},
      crMetaLevel: 0,
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
      },
      generated: false
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
    Hp,
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
      this.reset()
      this.setGruntAbilityScores()
      this.setGruntName()
      this.setGruntId()
      this.setGruntImage()
      this.setGruntAlignment()
      this.setGruntRivs()
      this.setGruntSavingThrows()
      this.setGruntType()
      this.setGruntInnateSpellcasting()
      this.setGruntSpellcasting()
      this.setGruntActions()
      this.setGruntSpeed()
      this.setGruntSkills()
      this.setGruntFeatures()
      this.setGruntAc()
      this.setGruntHp()
      this.grunt.lairActions = []
      this.grunt.profBonus = this.options.cr.profBonus
      this.grunt.size = this.options.species.id === 'volus' ? 'Small' : 'Medium'
      this.grunt.cr = this.options.cr.cr
      this.grunt.unit = ''
      this.generated = true
      console.log(this.grunt)
      // console.log([this.dpr, this.adjustments])
    },
    reset () {
      this.generated = false
      this.grunt = {}
      this.crMetaLevel = 0
      if (this.options.cr) {
        this.crMetaLevel = parseFloat(this.options.cr.cr) <= 1 ? 0 : Math.ceil(parseFloat(this.options.cr.cr) / 4)
      }
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
