---
id: shocking_grasp
name: Shocking Grasp
level: 1
type: tech
attackType:
- melee spell
- CON save
effect:
- damage
damageType: []
castingTime: Action
duration: Instant
concentration: false
distance:
  range: Touch
  aoeType: 
  aoeDistance: 
detonates: 
primes: lightning
availableClasses:
- engineer
- infiltrator
advancementOptions:
- name: Restoring Shock
  description: Gain shield points equal to half the damage dealt. This cannot increase your shield points beyond their maximum capacity.
- name: Improved Shock
  description: Increase the range to 4m and damage to d8.
---
Send an electric shock from your omni-tool to a creature you try to touch. Make a melee spell attack against the target.
You have advantage on the attack roll if the target is wearing armor. On a hit, the target becomes
<condition id="primed" sub="lightning"/> until the end of your next turn and takes 1d6 lightning damage.
Then the target must succeed on a Constitution saving throw or become stunned until the end of your next turn. A target
with at least 1 shield point has advantage on this saving throw.

__At Higher Levels__: When you cast this spell using a spell slot of 2nd level or higher, the damage increases
by 2d6 for each slot level above 1st.
