---
id: pull
name: Pull
level: 1
type: biotic
attackType:
- Ranged Attack
effect:
- control
damageType: []
castingTime: Action
duration: 1 round
concentration: true
distance:
  range: 30m
  aoeType: 
  aoeDistance: 
detonates: 
primes: force
availableClasses:
- adept
- sentinel
- vanguard
advancementOptions:
- name: Heavy Pull
  description: You may target a Large or smaller creature or object.
- name: Grip
  description: While maintaining this spell, you may use your bonus action to increase
    pressure around the target, dealing 2d6 bludgeoning damage.
---
Make a ranged spell attack on a Medium or smaller creature or object within range. On a success, you create a mass
effect field around the target and it becomes <condition id="lifted"/> 2m in the air until the end of your next turn. 
While you maintain this spell, as a bonus action, you can move the target up to 4m in any direction. If you move the 
target further than 30m away from you, the spell ends and the target falls to the ground.

__At Higher Levels__: When you cast this spell using a spell slot of 2nd level or higher, increase the duration.
1 minute at 2nd level, 10 minutes at 3rd level, and 1 hour at 4th level.
