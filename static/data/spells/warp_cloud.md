---
id: warp_cloud
name: Warp Cloud
createdBy: Chris Alley
level: 1
type: biotic
attackType: []
effect:
- damage
damageType:
- necrotic
castingTime: Action
duration: 1 minute
concentration: true
distance:
  range: 20m
  aoeType: cube
  aoeDistance: 2m
detonates: 
primes: necrotic
availableClasses:
- adept
- vanguard
advancementOptions:
- name: Burst    
  description: As a bonus action, you can end this spell and force each creature within 2 meters of the cloud to make a 
    Dexterity saving throw. A creature takes 4d4 force damage on a failed save or half as much on a successful one.
    This damage increases by 4d4 force damage per spell level. 
- name: Shift  
  description: As a bonus action, you can move this cube of warp energy up to 4 meters in any direction you choose. It 
    can pass through solid objects, but you can only control it's movement while you have line of sight.
---
You fill the air with a highly concentrated warp field 2 meters on each side at a point within range.  A creature takes
4d4 necrotic damage when it enters the spell area for the first time on a turn or starts its turn there. A creature
within the cloud is <condition id="primed" sub="necrotic"/>.

__At Higher Levels__. When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 4d4 
for each slot level above 1st.
