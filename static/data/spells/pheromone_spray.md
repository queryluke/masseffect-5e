---
id: pheromone_spray
name: Pheromone Spray
createdBy: Chris Alley
level: 1
type: tech
attackType:
- WIS save
effect:
- control
damageType: []
castingTime: Action
duration: 24 hours
concentration: false
distance:
  range: 10m
detonates: 
primes: 
availableClasses:
- engineer
- sentinel
- infiltrator
advancementOptions:
- name: Loyalty       
  description: If you successfully use this ability on a creature for 30 days in a row, the creature develops a 
    fierce, chemically-induced sense of loyalty to you and remains charmed by you indefinitely.
- name: Aggression  
  description: You are able to modify the pheromone cocktail to send creatures into a frenzy. When you use this ability, 
    you may choose to frenzy creatures instead of charming them. A creature that becomes frenzied must use its movement 
    to move towards the nearest creature and attack them if able. A frenzied creature may repeat its save at the end 
    of each of its turns.
---

A spray of chemical pheromones lets you convince a beast that you mean it no harm. Choose an organic creature that you can see 
within range. It must see you and be capable of smelling. If the creature's Intelligence is 4 or higher, the spell fails. 
Otherwise, the beast must succeed on a Wisdom saving throw or be <condition id="charmed"/> by you for the ability's duration. 
If you or one of your companions harms the creature, the effect ends.

__At Higher Levels__. When you cast this spell using a spell slot of 2nd level or higher, you can affect one additional 
creature for each slot level above 1st.
