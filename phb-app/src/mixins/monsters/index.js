import {Biotics} from './Biotics';
import {AbilityScoreBonus} from '../abilityScoreBonus';
import {Features} from './Features';

export const ConfigureMonster = {
  mixins: [
    AbilityScoreBonus,
    Biotics,
    Features
  ],
  methods: {
    configureMonsters(monsters, features, spells) {
      return monsters.map(monster => {
        if (monster.spellcasting) {
          this.setMonsterBiotics(monster, spells);
        }
        this.setMonsterFeatures(monster, features);
        return monster;
      });
    }
  }
};
