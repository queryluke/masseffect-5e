---
id: dark_channel
name: Dark Channel
level: 0
type: biotic
attackType:
- Ranged Attack
effect:
- damage
damageType:
- necrotic
castingTime: Action
duration: 1 minute
concentration: true
distance:
  range: 40m
  aoeType: 
  aoeDistance: 
detonates: 
primes: necrotic
availableClasses:
- adept
advancementOptions:
- name: Cripple
  description: If the affected creature would make a saving throw or attack roll,
    as a reaction you may increase the severity of Dark Channel. The affected creature
    must roll a d4 and subtract the number rolled from the attack roll or saving throw.
- name: Improved Damage
  description: Increase the damage die type to d10
---
Make a ranged spell attack on a creature you can see within range. On a hit, you plague the target with a persistent,
damaging biotic field. The creature is <condition id="primed" sub="necrotic"/> and takes 1d6 necrotic damage and 1d6
necrotic damage at the start of your turn while you maintain the spell. If the creature dies, dark channel transfers to
the nearest hostile creature within 10m of the target.

The damage increases by 1d6 when you reach the 5th level (2d6), 11th level (3d6) and 17th level (4d6).
