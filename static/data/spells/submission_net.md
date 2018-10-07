---
id: submission_net
name: Submission Net
level: '2'
type: tech
attackType:
- STR Save
- " DEX Save"
effect:
- control
damageType:
- lightning
castingTime: Action
duration: 1 minute
concentration: false
distance:
  range: 20m
  aoeType: cylinder
  aoeDistance: 4m
detonates: 
primes: 
availableClasses:
- engineer
- infiltrator
- sentinel
advancementOptions:
- name: Electrified Net
  description: If you have a submission net deployed, you can use your bonus action
    to spend XTP, sending electric currents through one net. Each creature within
    the net takes Xd6 lightning damage.
- name: Anti-Tech
  description: If a creature you can see begins to cast a Tech spell, you can use
    your reaction to cast submission net.
---
Spend 2 tech points to shoot a swarm of miniature pylons to a target location within 20m. Each creature within a 4m cylinder of the target location must make a Dexterity saving throw. Any creature that fails the saving throw is trapped in an electrified net, becomming {restrained} and cannot cast Tech spells.
Until the spell ends, the area is considered difficult terrain. A creature that enters the cylinder for the first time on its turn or end its turn there must also make the Dexterity saving throw.
A creature restrained by submission net may use its action to make a Strength (Athletics) check against your spell save DC to escape the net. On each attempt, the creature takes 1d6 lightning damage as it struggles against the net. On a success, the creature is no longer restrained.