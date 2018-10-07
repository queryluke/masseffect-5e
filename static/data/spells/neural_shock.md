---
id: neural_shock
name: Neural Shock
level: x
type: tech
attackType:
- CON Save
effect:
- debuff
damageType: []
castingTime: Action
duration: Instant
concentration: false
distance:
  range: 20m
  aoeType: 
  aoeDistance: 
detonates: 
primes: 
availableClasses:
- engineer
- infiltrator
advancementOptions:
- name: Damage
  description: A creature takes Xd6 psychic damage on a failed save or half as much
    damage on a successful one where X is the number of tech points spent.
- name: Paralyze
  description: If a creature fails the saving throw, it is paralyzed for 1 turn.
---
You spend tech points to flash an ion laser at an organic creature within range. The creature makes a Constitution saving throw. The DC of this throw is increased by 1 for each tech point spent. On a failed save, the creature has disadvantage on the next melee or ranged attack it makes and can't take reactions until the start of its next turn.