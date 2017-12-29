import {Name} from './Name';
import {Type} from './Type';
import {AbilityScores} from './AbilityScores';
import {RandomValue} from '../randomValue';
import {Ac} from './Ac';
import {AbilityScoreBonus} from '../abilityScoreBonus';
import {Hp} from './Hp';
import {DieFromAverage} from '../dieFromAverage';
import {NumberRange} from '../numberRange';
import {Traits} from './Traits';

export const GruntGenerator = {
  mixins: [
    Name,
    Type,
    AbilityScores,
    Ac,
    Hp,
    Traits,
    DieFromAverage,
    RandomValue,
    AbilityScoreBonus,
    NumberRange
  ],
  methods: {
    generateGrunt(config) {
      const grunt = {
        size: 'Medium'
      };
      this.setGruntName(config, grunt);
      this.setGruntType(config, grunt);
      grunt.alignment = 'any alignment';
      this.setGruntAbilityScores(config, grunt);
      this.setGruntTraits(config, grunt);
      this.setGruntAc(config, grunt);
      this.setGruntHp(config, grunt);
      console.log(grunt);
      return grunt;
    }
  }
};
