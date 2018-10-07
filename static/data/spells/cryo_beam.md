---
id: cryo_beam
name: Cryo Beam
level: x
type: tech
attackType:
- DEX save
- " STR save"
effect:
- damage
damageType:
- cold
castingTime: Action
duration: Instant
concentration: false
distance:
  range: Self
  aoeType: cube
  aoeDistance: 6m
detonates: 
primes: cold
availableClasses:
- engineer
- infiltrator
- sentinel
advancementOptions:
- name: Brittle Freeze
  description: Creatures that fail the Constitution saving throw suffer a -1 AC penalty
- name: Frozen Ground
  description: Cryo beam leaves a patch of ice on the ground that lasts for 1 min.
    Each creature that moves into or out of the patch must pass a Dexterity saving
    throw. On a failed save, slips and falls [Prone], ending its movement.
---
You spend tech points to blast a stream of liquid hydrogen from your omni-tool. Each creature in a 6m cube becomes {primed-cold} until the end of its next turn and must make a Constitution saving throw. A creature takes Xd8 cold damage on a failed save, or half as much damage on a successful one where X is the number of tech points spent. If the target is {unprotected}, it must pass a Strength saving throw or becomes {frozen} until the end of its next turn.