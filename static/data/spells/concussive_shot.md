---
id: concussive_shot
name: Concussive Shot
level: 0
type: combat
attackType:
- Ranged Attack
effect:
- damage
- buff
damageType:
- bludgeoning
castingTime: Bonus
duration: Instant
concentration: false
distance:
  range: Self
  aoeType: 
  aoeDistance: 
detonates: x
primes: 
availableClasses:
- soldier
advancementOptions:
- name: Stunning Shot
  description: A creature hit by Concussive Shot must make a Constitution saving throw
    (DC 8 + proficiency bonus + DEX modifier). On a failed save, the creature is {stunned}
    until the end of your next turn.
- name: Improved shot
  description: Increase the bonus damage of Concussive shot to d12.
---
As a bonus action, load a specialized thermal clip into the weapon you are currently wielding. Until you reload, any successful ranged attacks deal an additional 1d8 bludgeoning damage and medium-sized or smaller creatures must pass a Strength saving throw (DC 8 + proficiency bonus + DEX modifier) or are knocked {prone}.
You have 3 charges of Concussive Shot. You regain all of your charges on a long rest.