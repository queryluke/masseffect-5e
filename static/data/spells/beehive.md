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
  description: The Beehive deals double damage to organic targets that have 0 shield points.
- name: Remote Deploy
  description: As an action, you can set up your Beehive in a separate location. Once
    it is deployed you can use an Attack action to fire it.
---
As an Attack action, you equip and fire your antipersonnel cannon, colloquially called "the beehive". It ejects superheated shrapnel in a 6m cone, originating from you. Each creature caught in the blast must make Dexterity saving throw. On a failed save, a creature takes 2d6 piercing damage or half as much damage on a successful one.
The DC is (8 + proficiency bonus + DEX modifier).
You must spend a short or long rest reconfiguring the cannon to use it again.
This feature's damage increases by 2d6 when you reach 5th level (4d6), 11th level (6d6), 17th level (8d6)
Infiltrators may learn or advance this feature instead of gaining a tech power.