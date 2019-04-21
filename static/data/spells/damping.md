---
id: damping
name: Damping
createdBy: Ben McPherson
level: 1
type: tech
attackType:
- INT, WIS, or CHA save
effect:
- debuff
- control
damageType: []
castingTime: Action
duration: Instant
concentration: false
distance:
  range: 30m
detonates:
primes: 
availableClasses:
- engineer
- infiltrator
- sentinel
advancementOptions:
- name: Cooldown
  description: If creature that fails its saving throw casts a tech or biotic spell, it cannot cast another tech or biotic spell
    until the end of its next turn.
- name: Power Damping
  description: Creatures have disadvantage on the saving throw against this spell.
---
Target a create you can see within range and cause interference with their biotic implant and omni-tool, reducing their 
ability to use them effectively. The creature must make a saving throw using its spellcasting ability or it suffers a penalty
to its next biotic or tech spell. If the next spell it casts requires an attack roll, it has disadvantage on the attack.
If the next spell forces one or more creatures to make a saving throw, those creatures have advantage on the saving throw.

__At Higher Levels__. When you cast this spell using a spell slot of 2nd level or higher, you can affect one additional 
creature for each slot level above 1st.
