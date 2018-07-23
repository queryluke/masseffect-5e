---
id: siege_pulse
name: Siege Pulse
level: 
type: combat
attackType:
- CON Save
effect:
- damage
- control
damageType:
- psychic
castingTime: Attack
duration: Instant
concentration: false
distance:
  range: Self
  aoeType: sphere
  aoeDistance: 4m
detonates: 
primes: 
availableClasses:
- soldier
advancementOptions:
- name: Improved Pulse
  description: Add your STR or DEX modifier to the DC of the saving throw. You choose
    which one.
- name: Lingering Pulse
  description: Creatures hit by siege pulse have disadvantage on melee and ranged
    attacks until the end of your next turn.
---
As an Attack action, overload your shield capacitors causing a loud, painfully intense kinetic wave to erupt from your location. Reduce your shield points by 5. Each creature within a 4m sphere becomes {deafened} and must make Constitution saving throw (DC 8 + proficiency bonus). On a failed save, a creature is {incapacitated} until the start of your next turn. On a successful save, a creature takes 2d4 psychic damage.
You may use Siege Pulse as long as you have at least 5 shield points.