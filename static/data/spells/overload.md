---
id: overload
name: Overload
level: 1
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
  range: 40m
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
  description: Overload can leap to as many as five other targets within 10m.
- name: Heavy Overload
  description: Increase the damage die type to d8.
---
Unleash an electrostatic discharge at a creature or object within range. Three bolts then leap from that target to as
many as three other targets, each of which must be within 6m of the first target. A target can be a creature or an
object and can be targeted by only one of the bolts.

A target becomes <condition id="primed" sub="lightning"/> until the start of your next turn and must make a Dexterity
saving throw. The target takes 3d6 lightning damage on a failed save, or half as much on a successful one.

__At Higher Levels__: When you cast this spell using a spell slot of 2nd level or higher, the damage increases
by 2d6 for each slot level above 1st.
