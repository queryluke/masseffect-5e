---
id: target_painting
name: Target Painting
level: 1
type: tech
attackType:
- DEX Save
effect:
- debuff
damageType: []
castingTime: Action
duration: 1 turn
concentration: false
distance:
  range: 30m
  aoeType: cube
  aoeDistance: 8m
detonates: 
primes: 
availableClasses:
- engineer
- infiltrator
- sentinel
advancementOptions:
- name: Heavy Weapon Sync
  description: Information about the painted targets sync with heavy weapon systems.
    Any creature that would make a saving throw to avoid heavy weapon damage has disadvantage
    on the saving throw.
- name: Lasting Scan
  description: Becomes a concentration spell wit a duration of 1 minute.
---
Scan an 8m cube within range. Until the end of your next turn, any creature in the area when the spell is cast is
highlighted on all friendly creatures HUDs if it fails a Dexterity saving throw.

Any attack roll against an affected creature or object has advantage if the attacker can see it, and the affected
creature or object can't benefit from being invisible.
