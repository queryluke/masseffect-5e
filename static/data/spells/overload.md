---
id: overload
name: Overload
level: x
type: tech
attackType:
- DEX Save
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
detonates: 
primes: lightning
availableClasses:
- engineer
- infiltrator
- sentinel
advancementOptions:
- name: Extended Leap
  description: Overload can leap to targets within 10m.
- name: Heavy Overload
  description: Increase the damage die type to d6
---
You spend tech points to unleash an electrostatic discharge at a creature or object within range. Three bolts then leap from that target to as many as three other targets, each of which must be within 6m of the first target. A target can be a creature or an object and can be targeted by only one of the bolts.
A target becomes {primed-lightning} until the end of its next turn and must make a Dexterity saving throw. The target takes Xd4 lightning damage on a failed save, or half as much on a successful one where X is the number of tech points you spent.