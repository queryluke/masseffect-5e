---
id: dominate
name: Dominate
level: '4'
type: biotic
attackType:
- WIS Save
effect:
- control
damageType: []
castingTime: Action
duration: 10 minutes
concentration: true
distance:
  range: 20m
  aoeType: 
  aoeDistance: 
detonates: 
primes: 
availableClasses:
- adept
advancementOptions:
- name: Total Control
  description: You take the dominated creatures action. You may use its spells and
    abilities.
- name: Damage
  description: While the creature is dominated, it takes 2d6 psychic damage at the
    end of its turn. This damage does not proc an opportunity to end Dominate.
---
Target an organic creature within 20m. It must succeed on a Wisdom saving throw or it becomes Dominated (it is considered {charmed} and can't use spells or abilities).
On its turn, the dominated creature attacks the closest creature hostile to the spell caster, making a ranged weapon attack or melee attack if it does not have a weapon. If there are no hostile creatures within range, the dominated creature uses its turn to run towards the closest hostile creature.
Each time the dominated creature takes damage, it makes a new Wisdom saving throw against the spell. If the saving throw succeeds, the spell ends.