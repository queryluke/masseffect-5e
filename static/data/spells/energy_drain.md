---
id: energy_drain
name: Energy Drain
level: 1
type: tech
attackType:
- Ranged Attack
effect:
- damage
damageType:
- lightning
castingTime: Action
duration: Instant
concentration: false
distance:
  range: 20m
  aoeType: 
  aoeDistance: 
detonates: x
primes: 
availableClasses:
- engineer
- sentinel
advancementOptions:
- name: Improved Damage
  description: Increase the damage die type to d6.
- name: Improved Regen
  description: If you are wearing armor, gain shield points equal to your damage roll.
---
You spend tech points to cycle your Omni-tool, sapping electromagnetic energy from a creature you can see within range. Make a ranged spell attack against the target. On a hit, the target takes Xd4 lightning damage, where X is the amount of tech points you spent. Additionally, if you are wearing armor, gain shield points equal to half of the damage done.