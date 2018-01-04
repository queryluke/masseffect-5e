export const WeaponActions = {
  methods: {
    setWeaponActions(config, grunt) {
      const weapons = this.getWeapons(grunt);
      const dmgOptions = this.getDamageOptions(config, weapons);
      const availableAttacks = dmgOptions.filter(dmgOption => {
        return dmgOption.dmg >= config.targetDamage.dmgMin && dmgOption.dmg <= config.targetDamage.dmgMax;
      });
      console.log(config.targetDamage);
      console.log(availableAttacks);
    },
    getDamageOptions(config, weapons) {
      const dmgOptions = [];

      for (const weapon of weapons) {
        // filter heavy weapons
        if (!config.allowHeavyWeapons && weapon.type === 'Heavy Weapon') {
          continue;
        }
        // filter melee weapons
        if (!config.allowMeleeWeapons && weapon.type === 'Melee') {
          continue;
        }

        // single attack
        dmgOptions.push({
          dmg: weapon.dpr,
          numAttacks: 1,
          weapons: [weapon]
        });

        // multiattack
        if (weapon.type !== 'Heavy Weapon') {
          dmgOptions.push({
            dmg: weapon.dpr * 2,
            numAttacks: 2,
            weapons: [weapon]
          });
        }

        // triple attack, assault rifles
        if (weapon.type === 'Assault Rifle') {
          dmgOptions.push({
            dmg: weapon.dpr * 3,
            numAttacks: 3,
            weapons: [weapon]
          });
        }
      }

      // dual wielding
      const dualOpts = weapons.filter(weapon => {
        return (weapon.type === 'Heavy Pistol' || weapon.type === 'SMG' || weapon.type === 'Melee') && !/two/gi.test(weapon.tags);
      });
      const combinations = [];

      for (const main of dualOpts) {
        // filter melee weapons
        if (!config.allowMeleeWeapons && main.type === 'Melee') {
          continue;
        }

        for (const off of dualOpts) {
          if (!config.allowMeleeWeapons && main.type === 'Melee') {
            continue;
          }

          if (combinations.includes(`${main.id}-${off.id}`) || combinations.includes(`${off.id}-${main.id}`)) {
            continue;
          }

          // single attack with each
          dmgOptions.push({
            dmg: main.dpr + off.dpr,
            numAttacks: 2,
            weapons: [main, off]
          });

          // two attacks with each
          dmgOptions.push({
            dmg: (main.dpr * 2) + (off.dpr * 2),
            numAttacks: 4,
            weapons: [main, off]
          });

          combinations.push(`${main.id}-${off.id}`);
        }
      }
      return dmgOptions;
    },
    getWeapons(grunt) {
      const strBonus = this.abilityScoreBonus(grunt.abilityScores.str);
      const dexBonus = this.abilityScoreBonus(grunt.abilityScores.dex);
      const weapons = this.weapons.map(weapon => {
        weapon.dpr = parseInt(weapon.rof, 10) * (((parseInt(weapon.damage, 10) * 2) + 1) / 2);
        // add str or dex to melee dpr
        if (weapon.type === 'Melee') {
          let finalBonus = 0;
          if (/finesse/gi.test(weapon.tags)) {
            finalBonus = strBonus >= dexBonus ? strBonus : dexBonus;
          } else {
            finalBonus = strBonus;
          }
          weapon.dpr += finalBonus;
        } else if (weapon.type !== 'Heavy Weapon') {
          weapon.dpr += dexBonus;
        }
        return weapon;
      });
      return weapons;
    }
  },
  data() {
    return {
      weapons: []
    };
  },
  created() {
    return this.$http
    .get('../data/weapons.json')
    .then(response => response.json())
    .then(response => {
      this.weapons = response.data;
    });
  }
};
