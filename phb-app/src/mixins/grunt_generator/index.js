import {AbilityScoreBonus} from '../abilityScoreBonus';
import {AbilityScores} from './AbilityScores';
import {Ac} from './Ac';
import {AverageFromDie} from '../averageFromDie';
import {DieFromAverage} from '../dieFromAverage';
import {Hp} from './Hp';
import {Features} from './Features';
import {Name} from './Name';
import {NumberRange} from '../numberRange';
import {RandomValue} from '../randomValue';
import {SavingThrows} from './SavingThrows';
import {Skills} from './Skills';
import {Speed} from './Speed';
import {Type} from './Type';

export const GruntGenerator = {
  mixins: [
    AbilityScoreBonus,
    AbilityScores,
    Ac,
    AverageFromDie,
    DieFromAverage,
    Hp,
    Features,
    Name,
    NumberRange,
    RandomValue,
    SavingThrows,
    Skills,
    Speed,
    Type
  ],
  methods: {
    generateGrunt(config) {
      const grunt = {
        size: 'Medium',
        savingThrows: [],
        skills: [],
        conditionImmunities: [],
        damageResistances: [],
        features: [],
        reactions: [],
        profBonus: config.cr.profBonus
      };
      this.setGruntName(config, grunt);
      this.setGruntType(config, grunt);
      grunt.alignment = 'any alignment';
      this.setGruntAbilityScores(config, grunt);
      this.setGruntFeatures(config, grunt);
      this.setGruntSkills(config, grunt);
      this.setGruntSavingThrows(config, grunt);
      this.setGruntAc(config, grunt);
      this.setGruntHp(config, grunt);
      this.setGruntSpeed(config, grunt);
      console.log(grunt);
      console.log(config);
      return grunt;
    }
  }
};
