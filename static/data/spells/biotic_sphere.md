---
id: biotic_sphere
name: Biotic Sphere
level: 4
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
advancementOptions:
- name: Infuse Ammo
  description: Friendly creatures inside the sphere add 1d6 force damage to all ranged weapon attacks against creatures
    outside of the sphere. This damage can detonate primed targets.
- name: Armored
  description: The sphere has resistance to bludgeoning, piercing, slashing, and thunder damage, but only has 75 hit points.
---
A shimmering barrier with 100 hit points extends out from you in a 6m sphere and moves with you, remaining centered on
you and hedging out hostile creatures. If a hostile creature is within the sphere when you cast this spell, it is pushed
outside of the sphere's radius.

Any attack against a creature or targeted at a location within the sphere automatically hits the barrier instead. The barrier
automatically fails any saving throws.

The barrier dissipates when it has 0 hit points. If an attack would deal more damage than the remaining hit points of the
barrier, it soaks all of the damage and then dissipates.

__At Higher Levels__: When you cast this spell using a spell slot of 5th level, the barrier's health increases by 50 hit points.
