---
id: havoc_strike
name: Havoc Strike
level: 0
type: combat
attackType:
- DEX Save
effect:
- damage
damageType:
- thunder
castingTime: Attack
duration: Instant
concentration: false
distance:
  range: 8m
  aoeType: sphere
  aoeDistance: 2m
detonates: 
primes: 
availableClasses:
- soldier
- vanguard
advancementOptions:
- name: Improved Distance
  description: You can jump up to 12m.
- name: Improved Radius
  description: Increase the radius of the impact to 4m
---
Use a propulsion jet built into your leg armor to spring to a location within 8m and strike the ground with violent force.
Each creature within a 2m radius of where you land must make a Dexterity saving throw (DC 8 + proficiency bonus + STR modifier).
On a failed save, a creature takes 2d8 thunder damage or half as much on a successful one.

You can use this feature twice between short or long rests.

This feature's damage increases by 2d8 when you reach 5th level (4d8), 11th level (6d8), 17th level (8d8).
