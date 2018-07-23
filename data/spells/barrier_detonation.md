---
id: barrier_detonation
name: Barrier Detonation
level: '0'
type: biotic
attackType: []
effect:
- control
damageType: []
castingTime: Bonus
duration: Instant
concentration: false
distance:
  range: Self
  aoeType: sphere
  aoeDistance: 2m
detonates: 
primes: 
availableClasses:
- adept
- sentinel
- vanguard
advancementOptions:
- name: Shaped Lift
  description: You may choose the shape of the detonation
- name: Heavy Lift
  description: Large and smaller creatures and objects are affected.
---
Expend all of your remaining barrier ticks to create a negative mass effect field in a 2m sphere originating from you. Each Medium or smaller creature or object within the sphere must succeed on Dexterity saving throw or becomes {lifted}. If you expend at least 4 barrier ticks, Large targets must make the saving throw.
Increase the range of the sphere by 2m at 5th level (4m), 11th level (6m), and 17th level (8m).