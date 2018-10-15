---
id: beehive
name: Beehive
level: 0
type: combat
attackType:
- DEX save
effect:
- damage
damageType:
- piercing
castingTime: Attack
duration: Instant
concentration: false
distance:
  range: Self
  aoeType: cone
  aoeDistance: 6m
detonates: 
primes: 
availableClasses:
- infiltrator
- soldier
advancementOptions:
- name: Anti-Flesh
  description: Deals twice as much damage to organic creatures with no shield points.
- name: Remote Deploy
  description: As an action, you can set up your Beehive in a separate location. Once
    it is deployed you can use an Attack action to fire it. You can also fire it as a reaction whenever a creature enters
    its 6m cone.
---
Draw and fire your antipersonnel cannon, colloquially called "the beehive". It ejects superheated shrapnel in a 6m cone,
originating from you. Each creature caught in the blast must make Dexterity saving throw. The DC of this saving throw is
8 + your proficiency bonus + your Dexterity modifier. On a failed save, a creature takes 3d6 piercing damage or half as
much damage on a successful one.

You must spend a short or long rest reconfiguring the cannon to use it again.

This feature's damage increases by 2d6 when you reach 5th level (5d6), 11th level (7d6), 17th level (9d6)
