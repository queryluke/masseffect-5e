import {AbilityScoreBonus} from '../mixins/abilityScoreBonus';

function npcSavingThrows(npc) {
  const abilityMap = {
    str: 'Strength',
    dex: 'Dexterity',
    con: 'Constitution',
    int: 'Intelligence',
    wis: 'Wisdom',
    cha: 'Charisma'
  };
  return npc.savingThrows.map(st => {
    const name = abilityMap[st];
    let bonus = AbilityScoreBonus.methods.abilityScoreBonus(npc.abilityScores[st]) + parseInt(npc.profBonus, 10);
    bonus = bonus > 0 ? bonus : 0;
    return `${name} +${bonus}`;
  }).join(', ');
}

export default npcSavingThrows;
