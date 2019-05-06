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
  range: 14m
detonates: x
primes: 
availableClasses:
- vanguard
advancementOptions:
- name: Barrier Regen
  description: After you cast Charge, if you have an active barrier, regain 2 barrier ticks and reset the 
    duration of your barrier to 1 minute.
- name: Area Charge
  description: Each creature within 4m of the target must make the Dexterity saving throw.
---
Choose a creature or object within range and use the target's mass to pull yourself to its location with incredible force 
(this movement does not provoke opportunity attacks). The target must make a Dexterity saving throw.
On a failed save the target takes 1d10 force damage and becomes <condition id="prone">. Charge ignores half cover.

The damage increases by 1d10 when you reach the 5th level (2d10), 11th level (3d10) and 17th level (4d10).
