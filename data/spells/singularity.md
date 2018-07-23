---
id: singularity
name: Singularity
level: '3'
type: biotic
attackType:
- DEX Save
- " STR Save"
effect:
- control
damageType: []
castingTime: Action
duration: 1 minute
concentration: true
distance:
  range: 20m
  aoeType: sphere
  aoeDistance: 4m
detonates: 
primes: force
availableClasses:
- adept
advancementOptions:
- name: Heavy Singularity
  description: When a creature affected by this power makes a DEX or STR save to avoid
    its pull, they make that save at disadvantage.
- name: Damage
  description: A hostile creature that enters the sphere for the first time on a turn
    or ends its turn there is takes 1d4 necrotic damage.
---
Create a negative mass effect field in a 4m sphere at a target location within range. Each creature or object within the sphere's radius must succeed on a Dexterity saving throw or becomes {lifted}. Only Medium or smaller creature and objects are affected. Any creature or object enters the sphere for the first time or ends its turn there must succeed on a Strength (Athletics) or Dexterity (Agility) check or they are drawn into the sphere and become lifted.
When you cast this spell using a spell slot of 4th level or higher, increase the size of the sphere by 4m per spell slot above the 3rd.