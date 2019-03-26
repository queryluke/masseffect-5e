---
id: sabotage
name: Sabotage
level: 1
type: tech
attackType: []
effect:
- debuff
- control
damageType: []
castingTime: Action
duration: Infinite
concentration: false
distance:
  range: 30m
  aoeType: 
  aoeDistance: 
detonates: 
primes: 
availableClasses:
- engineer
- infiltrator
advancementOptions:
- name: Primed
  description: After the weapon fires, it vents its heat and the attacking creature becomes primed (fire) until
    the start of its next turn.
- name: Backfire
  description: After the weapon fires, it deals 2d6 thunder damage to the attacking
    creature.
---
Target a ranged weapon you can see within range and sabotage its internal systems. The next attack made with the target
weapon has disadvantage.

Casting sabotage does not break tactical cloak, and creatures are unaware of the casting of this spell.

If the weapon is integrated into a synthetic creature, such as an atlas mech's mass accelerator cannon or a drone's particle rifle,
this spell has no effect unless the creature fails an Intelligence saving throw. Whether or not the synthetic creature
succeeds on this saving throw, it becomes aware that it has been targeted by a spell.

__At Higher Levels__: When you cast this spell using a spell slot of 2nd level or higher, you can target 2 additional
weapons for each spell slot above the 1st.
