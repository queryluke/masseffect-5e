import {AbilityScoreBonus} from '~/mixins/abilityScoreBonus'

function abilityBonus (score) {
  const abilityScoreBonus = AbilityScoreBonus.methods.abilityScoreBonus(score)
  return abilityScoreBonus >= 0 ? `+${abilityScoreBonus}` : abilityScoreBonus
}

export default abilityBonus
