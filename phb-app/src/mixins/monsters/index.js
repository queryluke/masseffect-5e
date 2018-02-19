import {Biotics} from './Biotics';
import {AbilityScoreBonus} from '../abilityScoreBonus';
import {Features} from './Features';
import {Tech} from './Tech';
import {Skills} from './Skills';

export const ConfigureMonster = {
  mixins: [
    AbilityScoreBonus,
    Biotics,
    Features,
    Skills,
    Tech
  ],
  methods: {
    configureMonsters(monsters, features, spells, skills) {
      return monsters.map(monster => {
        if (monster.spellcasting) {
          this.setMonsterBiotics(monster, spells);
        }
        if (monster.techcasting) {
          this.setMonsterTech(monster, spells);
        }
        if (monster.skills.length > 0) {
          this.setMonsterSkills(monster, skills);
        }
        this.setMonsterFeatures(monster, features);
        return monster;
      });
    }
  }
};
