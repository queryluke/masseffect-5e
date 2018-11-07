---
id: warp
name: Warp
level: 2
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
  range: 40m
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
  description: The shifting causes internal bleeding. At the start of each of your turns, the target suffers 1d6 damage
    from blood loss, bypassing its shields. This effect ends if the creature uses medi-gel or if it or another creature
    passes a DC 10 Wisdom (Medicine) check to stabilize the bleeding.
- name: Disorient
  description: A target hit by warp must pass a Constitution saving throw. On a failed save, the force of warp is so
    intense the target is stunned until the end of its next turn.
---
Make a ranged spell attack on an organic creature you can see within range. On a hit, you generate a rapidly shifting mass
effect field inside the target dealing necrotic damage equal to 3d10 + your spellcasting ability modifier. In addition,
the target is <condition id="primed" sub="necrotic"/> until the end of your next turn. This damage bypasses shields.

__At Higher Levels__: When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 2d10 for
each slot level above the 2nd.
