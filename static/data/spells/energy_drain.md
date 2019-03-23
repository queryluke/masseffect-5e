---
id: energy_drain
name: Energy Drain
level: 1
type: tech
attackType:
- Ranged Attack
effect:
- damage
damageType:
- lightning
castingTime: Action
duration: Instant
concentration: false
distance:
  range: 50m
  aoeType: 
  aoeDistance: 
detonates: x
primes: 
availableClasses:
- engineer
- sentinel
advancementOptions:
- name: Linked Current
  description:  On a successful hit, you can designate yourself or an ally within range of the ability to direct a
    positive current. Instead of gaining shield points, this current doubles a creature's waking speed for 1d4 rounds.
    Using this advanced tech skill more than once does not stack the speed boost.
- name: Improved Regen
  description: On a successful hit, you regain shield points equal to the amount of lightning damage dealt.
---
Cycle your omni-tool, sapping electromagnetic energy from a creature you can see within range. Make a ranged spell attack
against the target. On a hit, the target takes 3d6 lightning damage, and you regain shield points equal to half the
amount of lightning damage dealt.

__At Higher Levels__: When you cast this spell using a spell slot of 2nd level or higher, the damage increases
by 1d6 for each slot level above 1st.
