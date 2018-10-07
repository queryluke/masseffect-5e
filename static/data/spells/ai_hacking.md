---
id: ai_hacking
name: AI Hacking
level: '3'
type: tech
attackType:
- INT Save
effect:
- control
damageType: []
castingTime: Action
duration: Instant
concentration: false
distance:
  range: 20m
  aoeType: 
  aoeDistance: 
detonates: 
primes: 
availableClasses:
- engineer
- infiltrator
advancementOptions:
- name: Total Control
  description: You take the hacked synthetic's action. You may use its spells and
    abilities.
- name: Damage
  description: While the synthetic is hacked, it takes 2d6 shock damage at the end
    of its turn. This damage does not proc an opportunity to end the spell.
---
Spend 3 tech points per creature size and choose a synthetic within 20m (e.g. 3 tech points for small, 6 tech points for medium, 9 tech points for large). The synthetic must succeed on an Intelligence saving throw or becomes hacked (considered {charmed}). A hacked synthetic won't attack friendly creatures and can't use spells or abilities.
On its turn, the hacked synthetic attacks the closest hostile creature, making a ranged weapon attack or melee attack if it does not have a weapon. If it doesn't have a weapon and there are no hostile creatures within melee range, the hacked synthetic uses its turn to dash towards the closest hostile creature.
Each time the synthetic takes damage, it makes a new Intelligence saving throw against the spell. If the saving throw succeeds, the spell ends.