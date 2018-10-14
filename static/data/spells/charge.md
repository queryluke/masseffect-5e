---
id: charge
name: Charge
level: 0
type: biotic
attackType:
- DEX Save
effect:
- damage
- movement
damageType:
- force
castingTime: Action
duration: Instant
concentration: false
distance:
  range: 10m
  aoeType: sphere
  aoeDistance: 2m
detonates: x
primes: 
availableClasses:
- vanguard
advancementOptions:
- name: Barrier Regen
  description: After you cast Charge, if you have an active barrier, regain half of
    your barrier ticks and reset the duration of your barrier to 1 minute.
- name: Area Charge
  description: On a hit, each creature within 2m of the target must make a Dexterity saving throw. On a failed save, a
    creature takes damage equal to the initial target and becomes prone, or half as much damage on a successful one.
---
Make a ranged spell attack on a creature or object you can see within range. On a hit, alter your mass and use
the target's mass to pull yourself to its location with incredible force (this movement does not provoke opportunity attacks).
The target takes 1d6 force damage and becomes <condition id="prone">.

The damage increases by 1d6 when you reach the 5th level (2d6), 11th level (3d6) and 17th level (4d6).