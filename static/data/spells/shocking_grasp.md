---
id: shocking_grasp
name: Shocking Grasp
level: x
type: tech
attackType: []
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
- name: Reach
  description: Increase the range to 4m.
- name: Improved Shock
  description: Increase the damage die to d8.
---
Spend tech points to send an electric shock from your omni-tool to a creature you try to touch. Make a melee attack against the target. You have advantage on the attack roll if the target is wearing armor. On a hit, the target becomes {primed-lightning} until the end of its next turn and takes Xd6 lightning damage where X is the number of tech points spent, and it can't take reactions until the start of its next turn.