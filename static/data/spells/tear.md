---
id: tear
name: Tear
createdBy: Chris Alley
level: 4
type: biotic
attackType:
- DEX save
effect:
- damage
damageType:
- necrotic
castingTime: Action
duration: Instant
concentration: false
distance:
  range: 30m
detonates: true
primes: 
availableClasses:
- adept
advancementOptions:
- name: Anti-Biotics
  description: A creature with an active barrier that is hit by this spell must expend all remaining barrier ticks to reduce the damage.
    The total damage reduction from the remaining barrier ticks is reduced by half. 
- name: Anti-Synthetic    
  description: Non-organic creatures or objects take an extra 40 force damage. This spell disintegrates up to a 6m cube of synthetic materials.
---
A concentrated ray of warp energy erupts from your outstretched hand toward a target that you can see within range.
The target can be a creature, an object, or a biotic creation, such as a biotic wall.

A creature targeted by this spell must make a Dexterity saving throw. On a failed save, the target takes 
10d6 + 40 necrotic damage. If this damage leaves it with 0 hit points, the target and everything
it is wearing and carrying is ripped apart at the atomic level, reducing it to a mist of radiated atoms.

This spell automatically disintegrates a Large or smaller unshielded object or a biotic creation. If the target is a 
Huge or larger object or creation of force, this spell disintegrates a 4m cube portion of it.

__At Higher Levels__. When you cast this spell using a spell slot of 5th level or higher, the damage increases by 5d6 
for each slot level above 4th.
