---
id: snap_freeze
name: Snap Freeze
level: 3
type: tech
attackType:
- Ranged Spell Attack
effect:
- control
damageType:
- cold
castingTime: Action
duration: Instant
concentration: true
distance:
  range: 30m
  aoeType:
  aoeDistance:
detonates: 
primes: cold
availableClasses:
- engineer
- sentinel
- infiltrator
advancementOptions:
- name: Solid Freeze
  description: The ice solid like a rock. Creatures have disadvantage on their Strength checks to break it.
- name: Brittle Freeze
  description: A critical success on the Strength check completely shatters the affected creature's appendage. If legs,
    it falls prone and looses half its remaining hit points. If head, it immediately dies.
---
Launch a globe of super cooled helium at a target within range. When you cast snap freeze on a target, you call out
the location on its body. The location can be body, legs, or head.

__Legs__. +2 bonus to hit. On a hit, the target is frozen to the ground, becoming <condition id="restrained"/> for the next minute.
Any creature, including the affected creature, can use its action to make a Strength check against your spell save DC to try and break
the ice. On a success, the affected creature is freed but suffers 6d4 bludgeoning damage.

__Body__. On a hit, the target takes 6d8 cold damage.

__Head (available only on Large or smaller creatures)__. -5 penalty to hit. On a hit, the creatures head becomes encased
in ice and it becomes <condition id="blinded"/> and <condition id="deafened"/> for the next minute. Any creature,
including the affected creature, can use an action to make a Strength check against your spell save DC to try and break the ice.
On a success, the affected creature is freed but suffers 6d12 bludgeoning damage.

__At Higher Levels__: When you cast this spell using a spell slot of 4th level or higher, the damage increases
by 2d4 (for legs), 2d8 (for body), or 2d12 (for head) for each slot level above 3rd.
