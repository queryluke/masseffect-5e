---
id: storm
name: Storm
level: 4
type: biotic
attackType:
- STR Save
effect:
- damage
- control
damageType:
- force
- necrotic
castingTime: Action
duration: 1 minute
concentration: true
distance:
  range: 20m
  aoeType: sphere
  aoeDistance: 8m
detonates: 
primes: 
availableClasses:
- adept
advancementOptions:
- name: Necrotic Bolts
  description: Until the spell ends, you can use a bonus action on each of your turns
    to cause a bolt of necrotic energy to leap from the center of the sphere toward
    one creature you choose within 20m of the center. Make a ranged spell attack.
    You have advantage on the attack roll if the target is in the sphere. On a hit,
    the target takes 4d10 necrotic damage. Necrotic bolts can detonate primed targets.
- name: Growing Storm
  description: While the spell is maintained, the storm's radius grows by 2m at the
    start of your turn.
---
An 8m-radius sphere of rapid shifting mass effect fields springs into existence centered on a point you choose within
range, creating a dangerous whirlwind of debris and energy. The sphere remains for the spell’s duration. Each creature
in the sphere when it appears or that ends its turn there must succeed on a Strength saving throw. On a failed save, a
creature takes 8d10 force damage or half as much on a successful one. The sphere’s space is difficult terrain.

__At Higher Levels__: When you cast this spell using a spell slot of 5th level, the damage increases for each of its effects by 2d10.
