import {AbilityScoreBonus} from '../abilityScoreBonus';
import {AbilityScores} from './AbilityScores';
import {Ac} from './Ac';
import {Actions} from './Actions';
import {AverageFromDie} from '../averageFromDie';
import {DieFromAverage} from '../dieFromAverage';
import {Helpers} from './Helpers';
import {Hp} from './Hp';
import {Features} from './Features';
import {Name} from './Name';
import {NumberRange} from '../numberRange';
import {RandomValue} from '../randomValue';
import {SavingThrows} from './SavingThrows';
import {Skills} from './Skills';
import {Speed} from './Speed';
import {Type} from './Type';
import {WeaponActions} from './WeaponActions';

export const GruntGenerator = {
  mixins: [
    AbilityScoreBonus,
    AbilityScores,
    Ac,
    Actions,
    AverageFromDie,
    DieFromAverage,
    Helpers,
    Hp,
    Features,
    Name,
    NumberRange,
    RandomValue,
    SavingThrows,
    Skills,
    Speed,
    Type,
    WeaponActions
  ],
  methods: {
    generateGrunt(cr, race, sc) {
      const config = {
        cr,
        effective: {
          ac: 0,
          hp: 0,
          atk: 0,
          dc: 0,
          dmg: 0
        },
        resistances: false,
        quarianCybEn: false,
        targetDamage: {dmgMin: 0, dmgMax: 5},
        allowHeavyWeapons: true,
        allowMeleeWeapons: true
      };
      const grunt = {
        race,
        sc,
        size: 'Medium',
        alignment: 'any alignment',
        savingThrows: [],
        skills: [],
        conditionImmunities: [],
        damageResistances: [],
        features: [],
        reactions: [],
        actions: [],
        profBonus: cr.profBonus
      };

      this.setGruntName(grunt);
      this.setGruntType(grunt);
      this.setGruntAbilityScores(config, grunt);
      this.setGruntFeatures(config, grunt);
      this.setGruntSkills(config, grunt);
      this.setGruntSavingThrows(config, grunt);
      this.setGruntAc(config, grunt);
      this.setGruntHp(config, grunt);
      this.setGruntSpeed(config, grunt);
      this.setGruntActions(config, grunt);
      console.log([config, grunt]);
      return grunt;
    }
  }
};
