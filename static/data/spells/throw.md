---
id: throw
name: Throw
level: 0
type: biotic
attackType:
- Ranged Attack
effect:
- damage
damageType:
- force
castingTime: Action
duration: Instant
concentration: false
distance:
  range: 40m
  aoeType: 
  aoeDistance: 
detonates: x
primes: 
availableClasses:
- adept
- sentinel
- vanguard
advancementOptions:
- name: Radial Blast
  description: On a hit, the damage is dealt to each creature within a 2m radius of
    the target.
- name: Improved Damage
  description: Increase the damage die type to d12
---
Make a ranged spell attack on a target you can see within range. On a hit, the target takes force damage equal to 1d8
force damage. If the target is Medium or smaller, it is pushed backward 10m.

This spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), 17th level (4d8).
