---
id: stasis
name: Stasis
level: 2
type: biotic
attackType:
- STR Save
effect:
- control
- debuff
damageType: []
castingTime: Action
duration: 1 minute
concentration: true
distance:
  range: 30m
  aoeType: 
  aoeDistance: 
detonates: 
primes: force
availableClasses:
- adept
- sentinel
- vanguard
advancementOptions:
- name: Shatter
  description: When stasis ends via a successful saving throw or detonating attack, the target takes 2d8 force damage for
    each round of combat it was in stasis.
- name: Deep Stasis
  description: The creature has disadvantage on its saving throws to escape Stasis.
---
Lock a target in a high-gravity mass effect field. Choose a creature you can see within range. The creature must make a
Strength saving throw. On a failed save, the creature is paralyzed, primed (force), and has resistance to all damage for
the duration of the spell. At the end of each of its turns, the target can make another Strength saving throw. On a success,
the spell ends. A detonating attack immediately ends the spell.
