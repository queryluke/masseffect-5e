---
id: lash
name: Lash
level: '2'
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
  range: 10m
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
Target a creature you can see within range. The target takes 4d8 force damage and becomes {grappled} and {primed-force} until it escapes the grapple. A detonating attack immediately ends the grapple or, to escape the grapple, the creature must succeed on a contested Strength (Athletics) check against your Constitution.
At higher levels: When you cast this spell using a spell slot of level 3 or higher, the damage increases by 2d8 for each slot level above the 2nd.