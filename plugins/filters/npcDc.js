import {AbilityScoreBonus} from '~/mixins/abilityScoreBonus'

function npcDc (input, npc) {
  return input.replace(/\[dc(.*)]/g, match => {
    let dcType = match.split('-')[1]
    if (dcType) {
      dcType = dcType.slice(0, -1)
      return 8 + AbilityScoreBonus.methods.abilityScoreBonus(npc.abilityScores[dcType]) + parseInt(npc.profBonus, 0)
    }
    return npc.dc
  })
}

export default npcDc
