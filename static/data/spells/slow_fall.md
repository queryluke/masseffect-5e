---
id: slow_fall
name: Slow Fall
level: 0
type: biotic
attackType: []
effect:
- movement
damageType: []
castingTime: Reaction, which you take when you or a creature within 10m of you falls
duration: 1 minute
concentration: true
distance:
  range: 10m
  aoeType: 
  aoeDistance: 
detonates: 
primes: 
availableClasses:
- adept
- vanguard
advancementOptions:
- name: Improved Duration
  description: Increase the duration to 5 minutes
- name: Navigate
  description: As you fall, you can direct your fall by 2m in any direction except
    up. You may do this once per round.
---
When you or a creature within 10m of you falls, choose up to five falling creatures within range. Create a negative mass
effect field around each creature, slowing the rate of descent to 20m per round. If the creature lands before the spell
ends, it takes no Falling damage and can land on its feet, and the spell ends for that creature.
