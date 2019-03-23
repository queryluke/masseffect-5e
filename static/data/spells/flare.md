---
id: flare
name: Flare
level: 4
type: biotic
attackType:
- DEX Save
effect:
- damage
damageType:
- radiant
castingTime: Action
duration: Instant
concentration: false
distance:
  range: 50m
  aoeType: 
  aoeDistance: 
detonates: x
primes: 
availableClasses:
- adept
advancementOptions:
- name: Improved Blind
  description: Each creature is blinded no matter the result of its saving throw.
- name: Heat seeking flare
  description: Instead of choosing 4 targets, you may instead choose 1. If you do
    so, the target has disadvantage on the saving throw. Increase the damage by 4d12.
---
Rapidly altering the mass of air particles creates radioactive projectiles that seek out the targets and explode. Choose
up to 4 creatures that you can see within range. Each creature must make a Constitution saving throw. On a failed save,
a creature is <condition id="blinded"/> until the end of your next turn and takes radiant damage equal to 6d12. On a
successful save, a creature takes half damage but suffers no other negative effect.

__At Higher Levels__: When you cast this spell using a spell slot of 5th level, increase the damage by 2d12.
