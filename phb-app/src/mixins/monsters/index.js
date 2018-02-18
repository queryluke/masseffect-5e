import {Biotics} from './Biotics';
import {AbilityScoreBonus} from '../abilityScoreBonus';
import {Features} from './Features';
import {Tech} from './Tech';

export const ConfigureMonster = {
  mixins: [
    AbilityScoreBonus,
    Biotics,
    Features,
    Tech
  ],
  methods: {
    configureMonsters(monsters, features, spells) {
      return monsters.map(monster => {
        if (monster.spellcasting) {
          this.setMonsterBiotics(monster, spells);
        }
        if (monster.techcasting) {
          this.setMonsterTech(monster, spells);
        }
        this.setMonsterFeatures(monster, features);
        return monster;
      });
    }
  }
};
