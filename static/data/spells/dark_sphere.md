---
id: dark_sphere
name: Dark Sphere
level: 3
type: biotic
attackType:
- DEX save
- CON save
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
- name: Control
  description: Before the sphere moves, you may change its direction and speed. Its speed becomes 4m, 6m, or 8m.
- name: Amplify
  description: Add 1d8 to the detonation damage for each 4m the sphere travels.
---
Launch a slow-moving, 4m wide sphere of dark energy in a straight line. It moves 4m at the end of each of your turns.
A creature caught in the sphere's path becomes <condition id="primed" sub="necrotic"/> until the end of its next turn and 
must make a Constitution saving throw. On a failed save, a creature takes necrotic damage equal to 6d8 +
your spellcasting ability modifier, or half as much on a successful one.

At the start of your turn, if the sphere has traveled 20m, it detonates and the spell ends. Each creature within
a 6m radius must make a Constitution saving throw. On a failed save a creature takes necrotic damage equal to 6d8 +
your spellcasting ability modifier or half as much damage on a successful one. This damage detonates any primed targets.

You can use an action to detonate the sphere before it travels 20m. If you lose concentration while casting the spell,
it does not detonate.

__At Higher Levels__: When you cast this spell using a spell slot of 4th level or higher, the damage increases by 2d8
for each slot level above 3rd.
