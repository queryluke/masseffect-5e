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
  range: 40m
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
  description: When you hit a creature or object with incinerate, if the target is primed cold, you deal a critical hit.
- name: Radial Blast
  description: On a miss, the target makes a Dexterity saving throw. On a failed save, the target takes half damage.
---
Hurl a high-explosive, plasma round at a creature or object within range. Make a ranged spell attack against the target.
On a hit, the target is <condition id="primed" sub="fire"/> until the end of your next turn and takes 2d10 fire damage.
A flammable object hit by this spell ignites if it isn't being worn or carried.

__At Higher Levels__: When you cast this spell using a spell slot of 2nd level or higher, the damage increases
by 2d10 for each slot level above 1st.
