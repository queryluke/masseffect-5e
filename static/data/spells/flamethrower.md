---
id: flamethrower
name: Flamethrower
level: 1
type: tech
attackType:
- DEX Save
effect:
- damage
damageType:
- fire
castingTime: Action
duration: Instant
concentration: false
distance:
  range: Self
  aoeType: cone
  aoeDistance: 8m
detonates: 
primes: fire
availableClasses:
- engineer
- infiltrator
- sentinel
advancementOptions:
- name: Concentrated Burn
  description: Increase the damage to d12 and the distance to 12m, but the area-of-effect
    is now a line instead of a cone.
- name: Exhaust
  description: The flames leave behind a thick smoke for 1 turn. Creatures have disadvantage
    while making ranged weapon attacks against you until the start of your next turn.
---
You spend tech points to overload your omni-tool's acetylene torch, spewing flames in front of you. Each creature within an 8m cone is {primed-fire} until the end of its next turn and must make a Dexterity saving throw. A creature takes Xd10 fire damage on a failed save or half as much damage on a successful one where X is the number of tech points spent.