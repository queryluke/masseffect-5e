---
id: stasis
name: Stasis
level: '2'
type: biotic
attackType:
- STR Save
effect:
- control
- debuff
damageType: []
castingTime: Action
duration: 10 minutes
concentration: true
distance:
  range: 20m
  aoeType: 
  aoeDistance: 
detonates: 
primes: force
availableClasses:
- adept
- sentinel
- vanguard
advancementOptions:
- name: Vulnerable
  description: A creature in Stasis takes +2 damage from all damage rolls.
- name: Heavy Stasis
  description: The creature has disadvantage on its saving throws to escape Stasis.
---
Lock a target in a high-gravity mass effect field. Choose a creature you can see within range. The creature must make a Strength saving throw. On a failed save, the creature is {restrained} and {primed-force} for the duration of the spell. At the beginning of the creature's turn, it can use its action to make the saving throw again. A detonating attack immediately ends the spell.