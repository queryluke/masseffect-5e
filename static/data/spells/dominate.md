---
id: dominate
name: Dominate
level: 3
type: biotic
attackType:
- WIS Save
effect:
- control
damageType: []
castingTime: Action
duration: 1 minute
concentration: true
distance:
  range: 30m
  aoeType: 
  aoeDistance: 
detonates: 
primes: 
availableClasses:
- adept
advancementOptions:
- name: Total Control
  description: You take the dominated creature's action. You may use its spells and
    abilities.
- name: Damage
  description: While the creature is dominated, it takes 4d6 psychic damage at the end of its turn. This damage
    bypasses shields and does not proc an opportunity to end Dominate.
---
Target an organic creature within 30m. It must succeed on a Wisdom saving throw or it becomes Dominated (it is considered
<condition id="charmed"/> and can't use spells or abilities). If you or creatures that are friendly to you are fighting it, it has advantage
on the saving throw.

On its turn, the dominated creature attacks the closest creature hostile to the spell caster, making a ranged weapon
attack or melee attack if it does not have a weapon. If there are no hostile creatures within range, the dominated
creature uses its turn to dash towards the closest hostile creature.

Each time the dominated creature takes damage, it makes a new Wisdom saving throw against the spell. If the saving throw
succeeds, the spell ends.

__At Higher Levels__. When you cast this spell using a 4th-level spell slot, the duration is concentration, up to 10
minutes. When you use a 5th-level spell slot, the duration is concentration, up to 1 hour.
