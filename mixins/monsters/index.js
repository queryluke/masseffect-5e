import {Biotics} from './Biotics'
import {AbilityScoreBonus} from '../abilityScoreBonus'
import {Features} from './Features'
import {Tech} from './Tech'
import {Skills} from './Skills'
import {BestiaryHelpers} from '../bestiaryHelpers'
import {mapGetters} from 'vuex'

export const ConfigureMonsters = {
  computed: {
    ...mapGetters(['getData', 'getMutableData'])
  },
  mixins: [
    AbilityScoreBonus,
    BestiaryHelpers,
    Biotics,
    Features,
    Skills,
    Tech
  ],
  methods: {
    getMonsters() {
      const monsters = this.getMutableData('bestiary')
      return monsters.map(monster => {
        if (monster.spellcasting) {
          this.setMonsterBiotics(monster)
        }
        if (monster.techcasting) {
          this.setMonsterTech(monster)
        }
        if (monster.skills.length > 0) {
          this.setMonsterSkills(monster)
        }
        this.setMonsterFeatures(monster)
        return monster
      })
    }
  }
}
