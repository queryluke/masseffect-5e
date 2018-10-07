---
id: snap_freeze
name: Snap Freeze
level: '5'
type: tech
attackType:
- STR Save
effect:
- control
- damage
damageType:
- cold
castingTime: Action
duration: Instant
concentration: true
distance:
  range: 20m
  aoeType: sphere
  aoeDistance: 10m
detonates: 
primes: cold
availableClasses:
- engineer
- infiltrator
advancementOptions:
- name: Lasting Freeze
  description: A creature frozen by Snap Freeze continues to take 1d6 cold damage
    at the start of its turn for 1 minute.
- name: Brittle Freeze
  description: Successful attacks against a creature that is frozen by Snap Freeze
    deal an additional 1d4 cold damage.
---
Spend 5 tech points to launch a globe of super cooled helium to a target location within range, where it explodes in a 10m-radius sphere. Each creature within the area becomes {primed-cold} until the end of its next turn and must make a Strength saving throw. On a failed save, a creature if {frozen} until the end of your next turn. On a successful save, its movement is halved until the end of your next turn. The DC of the saving throw is increase by each tech point you spend above 5.
The ground within the 10m sphere becomes icy and is considered difficult terrain.
If the globe strikes a body of water or a liquid that is principally water (not including water-based creatures), it freezes the liquid to a depth of 15 centimeters over an area 10m. This ice lasts for 1 minute. Creatures that were swimming on the surface of frozen water are trapped in the ice. A trapped creature can use an action to make a Strength check against your spell save DC to break free.