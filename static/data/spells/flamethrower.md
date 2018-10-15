---
id: flamethrower
name: Flamethrower
level: 3
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
  description: Increase the damage to d12 and the distance to 12m, but the area-of-effect is now a line instead of a cone.
- name: Exhaust
  description: The flames create a thick smoke in an 8m cube that must encompass the cone. The area is considered heavily
    obscured until the end of your next turn.
---
Overload your omni-tool's acetylene torch, spewing flames in front of you. Each creature within an 8m cone is
<condition id="primed" sub="fire"/> until the start of your next turn and must make a Dexterity saving throw. A creature
takes 6d10 fire damage on a failed save or half as much damage on a successful one.

At the start of your turn, you may spend your action and 1 additional tech point to continue casting this power. Your
movement speed is 2m while casting it in this manner. The spell ends if you become incapacitated.

__At Higher Levels__: When you cast this spell using a spell slot of 4th level or higher, the damage increases by 2d10
for each slot level above 3rd.
