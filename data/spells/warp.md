---
id: warp
name: Warp
level: '2'
type: biotic
attackType:
- Ranged Attack
effect:
- damage
damageType:
- necrotic
castingTime: Action
duration: Instant
concentration: false
distance:
  range: 20m
  aoeType: 
  aoeDistance: 
detonates: 
primes: necrotic
availableClasses:
- adept
- sentinel
- vanguard
advancementOptions:
- name: Internal Bleeding
  description: The shifting causes internal bleeding. At the start of your turn, the
    target takes 1d10 necrotic damage bypassing its shields until it uses medi-gel
    or is stabilized.
- name: Keel over
  description: A target hit by warp must pass a Constitution saving throw. On a failed
    save, the force of warp is so intense the target is knocked {prone} and {stunned}
    until the start of your next turn.
---
Make a ranged spell attack on an organic creature you can see within range. On a hit, you generate a rapidly shifting mass effect field inside the target dealing necrotic damage equal to 3d10 + your spellcasting ability modifier. In addition, the target is {primed-necrotic} until the end of its next turn. This damage bypasses shields.
At higher levels: When you cast this spell using a spell slot of level 3 or higher, the damage increases by 2d10 for each slot level above the 2nd.