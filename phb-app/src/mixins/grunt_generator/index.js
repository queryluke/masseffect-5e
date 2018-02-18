import {AbilityScoreBonus} from '../abilityScoreBonus';
import {AbilityScores} from './AbilityScores';
import {Ac} from './Ac';
import {Actions} from './Actions';
import {AverageFromDie} from '../averageFromDie';
import {Biotics} from './Biotics';
import {DieFromAverage} from '../dieFromAverage';
import {Helpers} from './Helpers';
import {Hp} from './Hp';
import {Features} from './Features';
import {Name} from './Name';
import {NumberRange} from '../numberRange';
import {RandomValue} from '../randomValue';
import {SavingThrows} from './SavingThrows';
import {Senses} from './Senses';
import {Skills} from './Skills';
import {Speed} from './Speed';
import {Tech} from './Tech';
import {Type} from './Type';
import {Weapons} from './Weapons';

export const GruntGenerator = {
  mixins: [
    AbilityScoreBonus,
    AbilityScores,
    Ac,
    Actions,
    AverageFromDie,
    Biotics,
    DieFromAverage,
    Helpers,
    Hp,
    Features,
    Name,
    NumberRange,
    RandomValue,
    SavingThrows,
    Senses,
    Skills,
    Speed,
    Tech,
    Type,
    Weapons
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
        actions: [],
        alignment: 'any alignment',
        conditionImmunities: [],
        damageVulnerabilities: [],
        damageImmunities: [],
        cr: cr.cr,
        xp: cr.xp,
        damageResistances: [],
        features: [],
        profBonus: cr.profBonus,
        race,
        reactions: [],
        savingThrows: [],
        sc,
        senses: [],
        size: 'Medium',
        skills: [],
        spellcasting: false,
        techcasting: false
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
      this.setGruntSenses(config, grunt);
      this.setGruntActions(config, grunt);
      return grunt;
    }
  }
};
