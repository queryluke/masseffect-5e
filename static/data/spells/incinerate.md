---
id: incinerate
name: Incinerate
level: 1
type: tech
attackType:
- Ranged Attack
effect:
- damage
damageType:
- fire
castingTime: Acton
duration: Instant
concentration: false
distance:
  range: 20m
  aoeType: 
  aoeDistance: 
detonates: x
primes: fire
availableClasses:
- engineer
- infiltrator
- sentinel
advancementOptions:
- name: Frozen Combo
  description: Deal double damage to frozen targets.
- name: Radial Blast
  description: On a miss, the target creature takes half the damage.
---
You spend tech points to hurl a high-explosive, plasma round at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target is {primed-fire} and takes Xd10 fire damage, where X is the number of tech points you spent. A flammable object hit by this spell ignites if it isn't being worn or carried.