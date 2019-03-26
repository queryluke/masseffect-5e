---
id: shockwave
name: Shockwave
level: 1
type: biotic
attackType:
- DEX Save
effect:
- damage
damageType:
- force
castingTime: Action
duration: Instant
concentration: false
distance:
  range: Self
  aoeType: line
  aoeDistance: 10m
detonates: x
primes: 
availableClasses:
- adept
- sentinel
- vanguard
advancementOptions:
- name: Controlled Shockwave
  description: The shockwave travels 16m. You may change the direction of the line every
    4m.
- name: Improved Damage
  description: Increase damage die type to d10
---
Create a cascading shockwave in a 2m wide by 10m long line originating from you. Each creature caught in the line must
make a Dexterity saving throw. On a failed save, a creature takes 3d6 force damage and is knocked <condition id="prone"/>.
On a successful save, a creature takes half as much damage.

__At Higher Levels__: When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 2d6 for
each slot level above the 1st.
