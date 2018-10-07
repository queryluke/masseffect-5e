---
id: poison_spray
name: Poison Spray
level: '1'
type: tech
attackType:
- CON Save
effect:
- damage
damageType:
- poison
castingTime: Action
duration: Instant
concentration: false
distance:
  range: 2m
  aoeType: 
  aoeDistance: 
detonates: 
primes: 
availableClasses:
- engineer
- infiltrator
advancementOptions:
- name: Pepper spray
  description: Creatures that fail the Constitution saving throw are also blinded
    for 1 minute.
- name: Poison Cloud
  description: Create a 2m-radius cloud of poison that persists for 1 minute. Each
    creature that enters the sphere for the first time on a turn or ends its turn
    there must make the Constitution saving throw.
---
Spend 1 tech point to shoot an aerosol spray of noxious chemicals from your omni-tool at a creature within melee range. The creature must succeed on a Constitution saving throw or take 1d12 poison damage and becomes poisoned until the end of your next turn. The DC of the saving throw is increased by 2 for each additional tech point you spend.