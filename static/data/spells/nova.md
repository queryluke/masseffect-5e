---
id: nova
name: Nova
level: 0
type: biotic
attackType:
- DEX Save
effect:
- damage
damageType:
- force
castingTime: Action
duration: Instant
concentration: false
distance:
  range: Self
  aoeType: sphere
  aoeDistance: 2m
detonates: x
primes: 
availableClasses:
- vanguard
advancementOptions:
- name: Improved Damage
  description: Increase the damage die to d12.
- name: Half blast
  description: When you cast nova, it consumes half of your remaining barrier
    ticks (rounded up) but deals damage as if you had used all of your remaining
    barrier ticks.
---
Transfer the energy of your barrier into a biotic explosion, consuming your remaining barrier ticks. Creatures within a
2m sphere centered on you must make a Dexterity saving throw. On a failed save, a creature is knocked prone and takes
force damage equal to Xd8, where X is the number of barrier ticks. On a successful save, a creature takes half as much
damage.

This spell's damage increases by 1d8 when you reach 5th level (X + 1d8), 11th level (X + 2d8), 17th level (X + 3d8)
