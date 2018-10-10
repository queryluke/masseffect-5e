---
id: cryo_blast
name: Cryo Blast
level: 1
type: tech
attackType:
- Ranged Attack
- " STR save"
effect:
- damage
- debuff
damageType:
- cold
castingTime: Action
duration: Instant
concentration: false
distance:
  range: 20m
  aoeType: 
  aoeDistance: 
detonates: 
primes: cold
availableClasses:
- engineer
- infiltrator
- sentinel
advancementOptions:
- name: Ice Lance
  description: Transform the attack into a deadly lance. The attack can no longer
    freeze or slow the target, but you add 1d6 piercing damage for each tech point
    spent.
- name: Frigid Air
  description: The blast snap freezes the air around the target in a 2m radius. Each
    creature that enters the frozen space for the first time on a turn or ends its
    turn there must pass a Constitution saving throw or take 2d4 cold damage.
---
You spend tech points to fire a mass of super cooled, subatomic particles at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target becomes {primed-cold} until the end of its next turn and takes Xd8 cold damage, where X is the number of tech points spent, and the target's movement is reduced by half. If the target is {unprotected}, it must pass a Strength saving throw or becomes {frozen} until the end of its next turn.