---
id: concussive_shot
name: Concussive Shot
level: 0
type: combat
attackType:
- Ranged Attack
effect:
- damage
- buff
damageType:
- bludgeoning
castingTime: Bonus Action
duration: Instant
concentration: false
distance:
  range: Self
  aoeType: 
  aoeDistance: 
detonates: x
primes: 
availableClasses:
- soldier
advancementOptions:
- name: Stunning Shot
  description: A creature hit by concussive shot must make a Constitution saving throw instead of a Strength saving throw.
    On a failed save, the creature is stunned until the end of its next turn.
- name: Improved shot
  description: Increase the bonus damage of concussive shot to d12.
---
Load a specialized thermal clip into the weapon you are currently holding. Until you reload, any successful ranged
attacks deal an additional 1d8 bludgeoning damage and medium-sized or smaller creatures must pass a Strength saving
throw (DC 8 + proficiency bonus + DEX modifier) or are knocked <condition id="prone"/>.

The damage increases by 1d8 when you reach the 5th level (2d8), 11th level (3d8) and 17th level (4d8).

You have 3 charges of Concussive Shot. You regain all of your charges on a long rest.
