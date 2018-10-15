---
id: cryo_blast
name: Cryo Blast
level: 1
type: tech
attackType:
- Ranged Attack
- STR save
effect:
- damage
- debuff
damageType:
- cold
castingTime: Action
duration: Instant
concentration: false
distance:
  range: 50m
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
  description: Transform the attack into a deadly lance. Make a ranged spell attack on a target within range. On a hit,
    the target takes 1d8 cold and 2d4 piercing damage for each tech point spent.
- name: Frigid Air
  description: The blast creates a pocket of frigid air that lasts until the end of your next turn. Each creature that
    enters the frozen space for the first time on a turn or ends its turn there becomes primed cold until the end of
    its next turn and must succeed a Constitution saving throw or take 2d6 cold damage.
---
Fire a mass of super cooled, subatomic particles. The particles explode in a 2m-radius sphere centered on a point within
range. Each creature within the sphere has its movement reduced by 4m until the start of your next turn and must make a
Strength saving throw. On a failed saved, a creature becomes <condition id="frozen"/> until the start of your next turn.
A target with at least 1 shield point has advantage on this saving throw.

__At Higher Levels__: When you cast this spell using a spell slot of 2nd level or higher, the radius of the blast increases
by 2m for each slot level above 1st.