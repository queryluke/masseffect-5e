---
id: nightshade_blades
name: Nightshade Blades
level: 0
type: combat
attackType:
- Ranged Attack
- CON Save
effect:
- damage
damageType:
- poison
castingTime: Attack
duration: Instant
concentration: false
distance:
  range: 10m
  aoeType: 
  aoeDistance: 
detonates: 
primes: 
availableClasses:
- infiltrator
- soldier
- vanguard
advancementOptions:
- name: Paralyze
  description: A creature that fails the Constitution saving throw becomes paralyzed
    until the end of your next turn.
- name: Powerful Poison
  description: The creature has disadvantage on its Constitution saving throw.
---
Your omni-tool is equipped with three microscopic, poison-tipped blades that are able to pierce through shields and armor.
Make a ranged weapon attack on a creature you can see within range, expending one blade. You add your proficiency bonus
to this roll. On a hit, the target takes 1d12 poison damage and must succeed on a Constitution saving throw (DC 8 + proficiency bonus)
or becomes <condition id="poisoned"/> until it finishes a short rest. All damage caused by nightshade blades bypasses shields.

You must be within melee range and use an action to recover a blade, at which point you can reapply your poison and reload
it into your omni-tool during a short rest. If you fail to recover your blades, you can create 3 new ones for 1 hour of work
during a long rest.

This feature's damage increases by 1d12 when you reach 5th level (2d12), 11th level (3d12), 17th level (4d12).
