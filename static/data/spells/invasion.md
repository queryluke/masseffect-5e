---
id: invasion
name: Invasion
createdBy: Ben McPherson
level: 1
type: tech
attackType:
- CON Save
effect:
- damage
- debuff
damageType:
- psychic
castingTime: Action
duration: 1 minute
concentration: true
distance:
  range: 20m
  aoeType: 
  aoeDistance: 
detonates: 
primes: 
availableClasses:
- engineer
- infiltrator
- sentinel
advancementOptions:
- name: Exploding Swarm
  description: As a bonus action, you can target a creature affected by one of your swarms and detonate it. The target 
    takes 3d8 thunder damage.
- name: Plague
  description: Three swarms spread from the initial target to as many as three other targets. When you cast this spell 
    using a spell slot of 2nd level or higher, the number of swarms increases by 1 for each spell slot above the 1st.
---
Unleash a VI-controlled machine swarm at a creature or object within range. Two swarms then spread from that target 
to as many as two other targets, each of which must be within 6m of the first target. A target can be a creature or an 
object and can be targeted by only one of the swarms.

A target must make a Constitution saving throw. On a failed save, the target takes 1d8 psychic and has disadvantage on 
attack rolls until the spell ends. A creature affected by the swarm can use its action to make a Constitution check 
against your spell save DC. On a success, it breaks free of the swarm.

__At Higher Levels__: When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 
and the range the swarms can spread increases by 2m for each slot level above 1st.
