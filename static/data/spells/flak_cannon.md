---
id: flak_cannon
name: Flak Cannon
createdBy: Ben McPherson
level: 0
type: combat
attackType:
- DEX Save
effect:
- damage
damageType:
- piercing
castingTime: Attack
duration: Instant
concentration: false
distance:
  range: 10m
  aoeType: sphere
  aoeDistance: 4m
detonates: 
primes: 
availableClasses:
- soldier
advancementOptions:
- name: Shredder
  description: If a creature with 0 shield points takes damage from Flak Cannon, it becomes wounded. A wounded creature
    takes 1d4 damage from blood loss at the start of each of its turns. A wounded creature can make a DC 15 Constitution saving 
    throw, ending the effect on a success. Alternatively, any creature (including the wounded creature), can make a DC 15 Wisdom
    (Medicine) check or use a charge of Medi-gel, ending the effect on a success. 
- name: Stunner
  description: When you attack with Flak Cannon, you can choose to fire concussive blasts dealing no damage. Creatures within the sphere 
    must instead make a Constitution saving throw. On a failed save, a creature becomes stunned until the start of your 
    next turn.
---

As an Attack action, you load and fire krogan-designed shells that burst into shrapnel upon impact. Choose a target location
within range. Each creature in a 4m-radius sphere centered on the point of impact of the shell must make a Dexterity 
saving throw (DC 8 + proficiency bonus + DEX modifier). A target takes 2d6 piercing damage on a failed save, 
or half as much damage on a successful one.

You have 3 charges of Flak Cannon. You regain all of your charges on a long rest.

This feature's damage increases by 2d6 when you reach 5th level (4d6), 11th level (6d6), 17th level (8d6)
