---
id: lash
name: Lash
level: 2
type: biotic
attackType:
- Ranged Attack
effect:
- damage
- control
damageType:
- force
castingTime: Action
duration: 1 minute
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
- name: Improved Grapple
  description: The grappled creature has disadvantage when trying to escape.
- name: Improved Damage
  description: Increase the damage die type to d12.
---
Make a ranged spell attack on a target you can see within range. On a hit, the target takes 4d8 force damage and becomes
<condition id="grappled"/>. While grappled the creature is <condition id="primed" sub="force"/>. To escape the grapple,
the creature must succeed on a contested Strength (Athletics) check against your Constitution. This spell also ends if
the creature is hit with a detonating attack or if you move more than 20m away from the target.

__At Higher Levels__: When you cast this spell using a spell slot of 3rd or higher, the damage increases by 2d8 for each
slot level above the 2nd.
