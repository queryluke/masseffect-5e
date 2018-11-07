---
id: tactical_scan
name: Tactical Scan
level: 0
type: combat
attackType: []
effect:
- debuff
damageType: []
castingTime: Action
duration: 1 minute
concentration: false
distance:
  range: 30m
  aoeType: 
  aoeDistance: 
detonates: 
primes: 
availableClasses:
- infiltrator
- soldier
advancementOptions:
- name: Area Scan
  description: Scan a 6m cube. Each creature within the cube must make the Charisma (Deception) check against your Wisdom (Insight).
    This feature only effects a single target, but you can choose one creature from the ones that failed the contested check.
- name: Telegraphed Attacks
  description: Your HUD alerts you when the creature is about to attack. It has
    disadvantage on ranged and melee attacks and you have advantage on any saving
    throws caused by spells and abilities of the creature.
---
Spend your action scanning a creature you can see, studying its movement and revealing weaknesses.
Make a Wisdom (Insight) check, contested by the target's Charisma (Deception) check. On a success, you have advantage on
attack rolls against the target and natural 19 and 20's are considered critical hits.

This benefit lasts 1 minute or until you successfully use this feature against a different target.
