---
id: barrier_detonation
name: Barrier Detonation
level: 0
type: biotic
attackType: []
effect:
- control
damageType: []
castingTime: Bonus Action
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
  description: You may choose the shape of the detonation into a cone, cube, or cylinder. You may also shape it into a line,
    if you do, the line is twice as long as the sphere's radius and 2m wide.
- name: Heavy Lift
  description: Large creatures are affected. If you spend at least 4 barrier ticks, Huge creatures must make the saving throw.
---
Expend all of your remaining barrier ticks to create a negative mass effect field in a 2m sphere originating from you.
Each Medium or smaller creature or object within the sphere must succeed on Strength saving throw or becomes
<condition id="lifted"/> until the end of your next turn. If you expend at least 4 barrier ticks, Large targets must make
the saving throw. Creatures with at least 1 shield point have advantage on this saving throw.

Increase the range of the sphere by 2m at 5th level (4m), 11th level (6m), and 17th level (8m).
