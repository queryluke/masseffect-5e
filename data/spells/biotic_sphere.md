---
id: biotic_sphere
name: Biotic Sphere
level: '3'
type: biotic
attackType: []
effect:
- warding
damageType: []
castingTime: Action
duration: 1 minute
concentration: true
distance:
  range: Self
  aoeType: sphere
  aoeDistance: 6m
detonates: 
primes: 
availableClasses:
- adept
- sentinel
advancementOptions:
- name: Infuse Ammo
  description: Friendly creatures inside the sphere add 1d4 force damage to all ranged
    weapon attacks on creatures outside of the sphere and subtract that much from
    the sphere's HP. This damage can detonate abilities.
- name: Armored
  description: The sphere has resistance to piercing, slashing, and bludgeoning damage.
---
Channel a sphere with (5d12 + your level) hit points that extends out from you in a 6m radius and moves with you. Hostile creatures cannot enter or leave the sphere.
Hostile attacks made on friendly targets are absorbed by the sphere (the sphere automatically fails any saving throws).
Friendly attacks on hostile creatures within the sphere have advantage.
The sphere dissipates when it's hit points are gone. If an attack would deal more damage than the remaining hit points of the sphere, the sphere soaks all of the damage and then dissipates.
At higher levels: When you cast this spell using a spell slot of level 4 or higher, the sphere's health increases by 2d12 for each slot level above the 3rd.