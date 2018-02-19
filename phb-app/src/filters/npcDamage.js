import {AbilityScoreBonus} from '../mixins/abilityScoreBonus';
import {AverageFromDie} from '../mixins/averageFromDie';

function monsterDamage(input, npc) {
  return input.replace(/\[dmg(.*)]/g, match => {
    let dmgBonusType = match.split('+')[1];
    let dmgBonus = 0;
    let bonusText = '';
    if (dmgBonusType) {
      dmgBonusType = dmgBonusType.slice(0, -1).trim();
      dmgBonus = AbilityScoreBonus.methods.abilityScoreBonus(npc.abilityScores[dmgBonusType]);
      if (dmgBonus > 0) {
        bonusText = ` + ${dmgBonus}`;
      }
      if (dmgBonus < 0) {
        bonusText = ` - ${dmgBonus}`;
      }
    }
    const dmg = match.substr(match.indexOf(':') + 1, match.length - match.indexOf('+') - 1).trim();
    const avgDmg = AverageFromDie.methods.averageFromDie(dmg) + dmgBonus;
    return `${avgDmg} (${dmg}${bonusText})`;
  });
}

export default monsterDamage;
