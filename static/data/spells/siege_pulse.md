---
id: siege_pulse
name: Siege Pulse
level: 0
type: combat
attackType:
- CON Save
effect:
- damage
- control
damageType:
- psychic
castingTime: Action
duration: Instant
concentration: false
distance:
  range: Self
  aoeType: sphere
  aoeDistance: 4m
detonates: 
primes: 
availableClasses:
- soldier
- vanguard
advancementOptions:
- name: Improved Pulse
  description: Add your Constitution modifier to the DC of the saving throw as you increase the frequency of the pulse to a level you can barely withstand.
- name: Lingering Pulse
  description: Each creature that takes psychic damage from siege pulse has disadvantage on its melee or ranged
    attack rolls until the start of your next turn.
---
Spend 5 shield points as you overload your shield capacitors causing a loud, kinetic wave to erupt in a 4m-radius 
sphere centered on you. Each creature within the sphere becomes <condition id="deafened"/> and must
make a Constitution saving throw (DC 8 + proficiency bonus). On a failed save, a creature takes
2d8 psychic damage and is <condition id="stunned"/> until the end of your next turn. On a successful save, a creature 
takes half as much damage. Synthetic creatures have advantage on this saving throw.

The first time you use siege pulse, your armor suffers no adverse effect. If you use this spell again before you
finish a short rest, roll a d20. On a 5 or lower you shields overload. You lose 
all shield points, take 2d12 lightning damage, and cannot gain shield points unless you repair your armor. Each time you 
use this feature again before finishing a short rest, you suffer a -5 penalty to the roll.

This feature's psychic damage increases by 1d8 when you reach 5th level (3d8), 11th level (4d8), 17th level (5d8).
