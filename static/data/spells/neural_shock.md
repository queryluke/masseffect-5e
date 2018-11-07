---
id: neural_shock
name: Neural Shock
level: 1
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
  range: 50m
  aoeType: 
  aoeDistance: 
detonates: 
primes: 
availableClasses:
- engineer
- infiltrator
advancementOptions:
- name: Damage
  description: The target takes 2d6 psychic damage when hit by the ion laser. This damage increases by 2d6 for each slot level above the 1st.
- name: Paralyze
  description: If a creature fails the saving throw, it is paralyzed until the end of its next turn.
---
Flash an ion laser at an organic creature within range. The creature makes a Charisma saving throw. On a failed save,
the creature has disadvantage on melee and ranged attack attack rolls and can't take reactions until the end of its
next turn.
