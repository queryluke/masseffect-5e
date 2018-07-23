---
id: charge
name: Charge
level: '0'
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
- name: Stunning blow
  description: On a failed save, the target becomes {stunned} until the end of your
    next turn
---
Alter your mass and choose a creature or object you can see within range. Use the target's mass to pull yourself to its location with incredible force. Any creature or object within a 2m sphere must make a Dexterity saving throw. On a failed save, a creature takes 1d6 force damage and becomes {prone}. On a successful save, a creature takes half as much damage.
The damage increases by 1d6 when you reach the 5th level (2d6), 11th level(3d6) and 17th level(4d6).