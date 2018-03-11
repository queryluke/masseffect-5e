export const Weapons = {
  methods: {
    setWeaponActions(config, grunt) {
      const weapons = this.getWeaponsWithDamage(grunt);
      const attacks = this.getAttackOptions(config, weapons);
      let availableAttacks = attacks.filter(attack => {
        return attack.dpr >= config.targetDamage.dmgMin && attack.dpr <= config.targetDamage.dmgMax;
      });
      if (availableAttacks.length < 1) {
        availableAttacks = [attacks[0]];
      }
      const attack = this.randomValue(availableAttacks);
      for (const weapon of attack.weapons) {
        grunt.actions.unshift(this.generateWeaponAttack(config, weapon));
      }
      if (attack.numAttacks > 1) {
        grunt.actions.unshift({
          type: 'common',
          name: 'Multiattack',
          description: this.generateMultiattackDescription(grunt, attack)
        });
      }
    },
    getAttackOptions(config, weapons) {
      const attacks = [];

      for (const weapon of weapons) {
        // filter heavy weapons
        if (!config.allowHeavyWeapons && weapon.type === 'Heavy Weapon') {
          continue;
        }
        // filter melee weapons
        if (!config.allowMeleeWeapons && weapon.type === 'Melee') {
          continue;
        }

        for (let i = 1; i <= 3; i++) {
          if ((i > 1 && weapon.type === 'Heavy Weapon') ||
            (i > 2 && ((weapon.type === 'Heavy Weapon' || weapon.type === 'Sniper Rifle') || weapon.heat < 3))) {
            continue;
          }
          attacks.push({
            dpr: (weapon.attack.dpr + weapon.attack.bonus + weapon.attack.extraDmg) * i,
            numAttacks: i,
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
        const mainDpr = main.attack.dpr + main.attack.bonus + main.attack.extraDmg;

        // each possible off-hand
        for (const off of dualOpts) {
          // filter out melee off-hands if melee turned off
          if (!config.allowMeleeWeapons && main.type === 'Melee') {
            continue;
          }
          // Only allow melee/weapon combos if melee has hip fire
          if ((main.type === 'Melee' && (off.type !== 'Melee' && !/hip/gi.test(off.tags))) ||
            (off.type === 'Melee' && (main.type !== 'Melee' && !/hip/gi.test(off.tags)))) {
            continue;
          }
          // filter out existing combos
          if (combinations.includes(`${main.id}-${off.id}`) || combinations.includes(`${off.id}-${main.id}`)) {
            continue;
          }
          const offDpr = off.attack.dpr + off.attack.bonus + off.attack.extraDmg;
          // single attack with each
          attacks.push({
            dpr: mainDpr + offDpr,
            numAttacks: 2,
            weapons: [main, off]
          });
          // two attacks with each
          attacks.push({
            dpr: (mainDpr * 2) + (offDpr * 2),
            numAttacks: 4,
            weapons: [main, off]
          });

          combinations.push(`${main.id}-${off.id}`);
        }
      }
      attacks.sort((a, b) => a.dpr - b.dpr);
      return attacks;
    },
    getWeaponsWithDamage(grunt) {
      const strBonus = this.abilityScoreBonus(grunt.abilityScores.str);
      const dexBonus = this.abilityScoreBonus(grunt.abilityScores.dex);
      const bruteMod = grunt.features.find(feature => feature.id === 'brute');
      const weapons = this.getMutableData('weapons').filter(weapon => weapon.dmg !== null);
      return weapons.map(weapon => {
        weapon.attack = {};
        if (weapon.type === 'Melee' && bruteMod) {
          weapon.rof += 1;
        }
        weapon.attack.dpr = parseInt(weapon.rof, 10) * (((parseInt(weapon.damage, 10) * 2) + 1) / 2);
        weapon.attack.extraDmg = weapon.addDmg ? parseInt(weapon.addDmg, 10) : 0;
        // add str or dex to melee dpr
        if (weapon.type === 'Melee') {
          let finalBonus = 0;
          if (/finesse/gi.test(weapon.tags)) {
            finalBonus = strBonus >= dexBonus ? strBonus : dexBonus;
          } else {
            finalBonus = strBonus;
          }
          weapon.attack.bonus = finalBonus;
        } else if (weapon.type === 'Heavy Weapon') {
          weapon.attack.bonus = 0;
        } else {
          weapon.attack.bonus = dexBonus;
        }
        return weapon;
      });
    },
    generateMultiattackDescription(grunt, attack) {
      const name = grunt.sc.id === 'none' ? 'grunt' : grunt.sc.id;
      const words = ['', 'one', 'two', 'three', 'four'];
      const plural = attack.numAttacks > 1 ? 's' : '';
      let text = `The ${name} makes`;
      if (attack.weapons.length > 1) {
        if (attack.weapons[0].type === 'Melee' && attack.weapons[1].type === 'Melee') {
          text += ` ${words[attack.numAttacks]} melee attack${plural}`;
        } else if (attack.weapons[0].id === attack.weapons[1].id) {
          text += ` ${words[attack.numAttacks]} ${attack.weapons[0].name} attack${plural}, one in each hand.`;
        } else {
          const halfWord = words[attack.numAttacks / 2];
          text += ` ${words[attack.numAttacks]} attacks: ${halfWord} with its ${attack.weapons[0].name} and ${halfWord} with its ${attack.weapons[1].name}`;
        }
      } else {
        text += ` ${words[attack.numAttacks]} ${attack.weapons[0].name} attack${plural}`;
      }
      return text;
    },
    generateWeaponAttack(config, weapon) {
      // Heavy weapons
      if (weapon.type === 'Heavy Weapon') {
        return {
          type: 'common',
          name: weapon.name,
          recharge: `Charges ${weapon.heat}`,
          description: weapon.notes
        };
      }
      // Other special weapons
      if (weapon.id === 'm-37_falcon') {
        return {
          type: 'common',
          name: weapon.name,
          description: `Target a creature within  ${weapon.range}. It makes a DC ${8 + weapon.bonus + config.cr.profBonus} Dexterity saving throw, taking ${weapon.dpr} (${weapon.rof}d${weapon.damage}) thunder damage on a failed save, or have as much damage on a successful one.`
        };
      }
      if (weapon.id === 'venom_shotgun') {
        return {
          type: 'common',
          name: weapon.name,
          description: `Target a creature within  ${weapon.range}. It makes a DC 13 Dexterity saving throw, taking ${weapon.dpr} (${weapon.rof}d${weapon.damage}) thunder damage on a failed save, or have as much damage on a successful one.`
        };
      }

      let bonusText = '';
      if (weapon.attack.bonus > 0) {
        bonusText = ` + ${weapon.attack.bonus}`;
      } else if (weapon.attack.bonus < 0) {
        bonusText = ` - ${weapon.attack.bonus * -1}`;
      }
      const reachOrRange = weapon.type === 'Melee' ? 'reach' : 'range';
      const hipFire = /hip/gi.test(weapon.tags) ? ' & hip fire' : '';
      const target = weapon.id === 'n7_piranha' ? 'all creatures in 4m cone' : 'one target';
      const additionalHitMechanics = weapon.npcHit ? `, and ${weapon.npcHit}` : '.';
      const toHit = config.cr.profBonus + weapon.attack.bonus >= 0 ? `+${config.cr.profBonus + weapon.attack.bonus}` : config.cr.profBonus + weapon.attack.bonus;

      const description = {
        attack: `${toHit} to hit, ${reachOrRange} ${weapon.range}${hipFire}, ${target}.`,
        hit: `${Math.floor(weapon.attack.dpr)} (${weapon.rof}d${weapon.damage}${bonusText}) ${weapon.dmgType} damage${additionalHitMechanics}`,
        miss: null
      };

      // Miss mechanics
      if (weapon.id === 'scorpion') {
        description.miss = '2 (1d4) thunder damage';
      }

      let attackType = weapon.type === 'Melee' ? 'Melee' : 'Ranged';
      attackType += ' Weapon Attack';
      return {
        type: 'attack',
        name: weapon.name,
        attackType,
        description
      };
    }
  }
};
