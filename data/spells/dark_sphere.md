---
id: dark_sphere
name: Dark Sphere
level: '3'
type: biotic
attackType:
- DEX save
- " CON save"
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
  description: At the start of your turn, before the sphere moves, you can change
    its direction.
- name: Amplify
  description: Every 4m, the sphere's potential damage increases. Add 1d8 to the
    detonation damage for each 4m the sphere travels.
---
Launch a slow-moving, 4m wide sphere of dark energy in a straight line in front of you. It moves 4m this turn and at the start of each subsequent turn. Each creature caught in the path becomes {primed-necrotic} until the end of its next turn and must make a Dexterity saving throw. On a failed save, a creature takes necrotic damage equal to 6d8 + your spellcasting ability modifier, or half as much on a successful one. When the sphere reaches 20m, it detonates and each creature within 10m becomes {primed-necrotic} for 1 minute and must make a Constitution saving throw. On a failed save a creature takes necrotic damage equal to 6d8 + your spellcasting ability modifier or half as much damage on a successful one.
You can use an action to detonate the sphere early.
If you lose concentration while casting the spell, it does not detonate.
At higher levels: When you cast this spell using a spell slot of level 3 or higher, the damage increases by 2d8 for each slot level above the 2nd.