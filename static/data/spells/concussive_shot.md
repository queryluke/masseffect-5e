---
id: concussive_shot
name: Concussive Shot
level: 0
type: combat
attackType:
- Ranged Attack
- CON Save
effect:
- damage
damageType:
- thunder
castingTime: Bonus Action
duration: Instant
concentration: false
distance:
  range: Self
  aoeType: sphere
  aoeDistance: 4m
detonates: x
primes: 
availableClasses:
- soldier
advancementOptions:
- name: Stunning Shot
  description: If the ranged attack hits and the target fails its Constitution saving throw, it becomes stunned until 
    the end of its next turn.
- name: Force Shot
  description: On a hit, a medium or smaller target is pushed 6m away from you. Each other medium or smaller creature 
    within the sphere is pushed 2m away from the center. If a creature can't occupy the next space it would be pushed 
    into, it is instead knock prone in the space it currently occupies.
---
Load and fire a specialized thermal clip into the weapon you are currently wielding. Make a ranged weapon attack on a 
target within the weapon's range. On a hit, the target takes damage equal to your weapon's base damage and any primed
conditions are detonated. Hit or miss, each creature or object within 4m radius sphere centered on the target must make 
a Constitution saving throw. The DC of this saving throw is 8 + your proficiency bonus + your Dexterity modifier. 

The thermal clip is then exhausted and you must reload your weapon. You have two concussive shot thermal clips, which 
recharge on a short or long rest.
