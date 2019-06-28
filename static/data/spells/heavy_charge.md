---
id: heavy_charge
name: Heavy Charge
createdBy: Chris Alley
level: 2
type: biotic
attackType:
- DEX Save
effect:
- damage
- movement
damageType:
- force
castingTime: Action
duration: Instant
concentration: false
distance:
  range: 30m
  aoeType: sphere
  aoeDistance: 4m
detonates: x
primes: 
availableClasses:
- vanguard
advancementOptions:
- name: Stutter Step  
  description: This spell's range is decreased to 12m, but you may cast this spell twice as part of the same action, 
    choosing a different target for each cast. Each cast consumes spell slots as normal.
- name: Heavy Step  
  description: You can transport Large or smaller creatures and objects as long as the total weight does not exceed four times your carrying capacity.
---
Choose a creature or object within range and use the target's mass to pull yourself to its location 
(this movement does not provoke opportunity attacks). Each creature within 4m of the target must make Dexterity saving 
throw, taking 4d10 force damage on a failed save, or half as much on a successful one. 

You may transport any number of creatures or objects with you to the target location. To 
do so, each creature or object must be within 2m of you when you cast this spell and the total weight of all creatures and 
objects cannot exceed twice your carrying capacity. A creature transported this way must be willing and of your
size or smaller and the target location must have an unoccupied space for the creature to be transported to. A creature or 
object brought with you automatically passes the Dexterity saving throw and takes no damage.  

__At Higher Levels__. When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 2d10 
for each slot level above 2nd.
