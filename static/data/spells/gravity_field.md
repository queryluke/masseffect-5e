---
id: gravity_field
name: Gravity Field
createdBy: Chris Alley
level: 1
type: biotic
attackType:
- STR save
effect:
- control
damageType: []
castingTime: Action
duration: 1 minute
concentration: true
distance:
  range: 30m
  aoeType: cube
  aoeDistance: 6m
detonates: 
primes: force
availableClasses:
- adept
- vanguard
advancementOptions:
- name: Pulsing Field  
  description: As a bonus action, for the duration of the spell, you can force a number of creatures equal to twice the spell level
    that are within the gravity field to make a Strength saving throw or be restrained until the spell ends. 
- name: Warping Field  
  description: A creature takes 1d6 necrotic damage per spell level when it enters the gravity field for the first time 
    on a turn or ends its turn there.
---
You create an field of unstable gravity in a 6-meter cube starting from a point within range.  For the duration, this 
space becomes difficult terrain.  

A creature in the area when you cast the spell must succeed on a Strength saving throw or be <condition id="restrained"/> 
until the spell ends. A creature restrained by this spell can use its action to make a Strength check against your 
spell save DC. On a success, it frees itself.  

When the spell ends, the gravity field dissipates.
