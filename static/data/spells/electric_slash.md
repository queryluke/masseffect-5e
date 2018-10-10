---
id: electric_slash
name: Electric Slash
level: 1
type: tech
attackType:
- CON Save
effect:
- damage
damageType:
- lightning
castingTime: Action
duration: Instant
concentration: false
distance:
  range: Self
  aoeType: cone
  aoeDistance: 8m
detonates: x
primes: 
availableClasses:
- engineer
- infiltrator
advancementOptions:
- name: Shield Restore
  description: If you are wearing armor, gain shield points equal to half of your
    damage roll.
- name: Paralyze
  description: Creatures that fail the saving throw are paralyzed until the end of
    their next turn.
---
Spend X tech points to unleash a wave of electric energy in an 8m cone originating from you. Each creature must make a Constitution saving throw. On a failed save, a creature takes Xd8 lightning damage or half as much damage on a successful one.