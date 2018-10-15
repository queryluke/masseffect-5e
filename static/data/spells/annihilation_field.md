---
id: annihilation_field
name: Annihilation Field
level: 4
type: biotic
attackType:
- CON Save
effect:
- damage
damageType:
- necrotic
castingTime: Action
duration: 1 minute
concentration: true
distance:
  range: Self
  aoeType: sphere
  aoeDistance: 4m
detonates: 
primes: necrotic
availableClasses:
- adept
advancementOptions:
- name: Disorient
  description: Creatures that fail the Constitution saving throw have disadvantage on their next attack roll.
- name: Phasic
  description: Annihilation Field's damage bypasses shields.
---
Spin a field of dark energy originating from you in a 4m radius sphere. The field moves with you and reduces your walking
speed by half.

Each creature within the sphere must make a Constitution saving throw. A creature takes 12d6 necrotic damage on a failed
save or half as much damage on a successful one. A creature must also make the saving throw when it enters the field's
space for the first time on a turn or ends its turn there.

Any creature within the sphere is <condition id="primed" sub="necrotic"/>. This condition ends immediately if the creature leaves the sphere.

__At Higher Levels__: When you cast this spell using a spell slot of 5th level, increase the radius by 4m.