---
length: 7139
title: 'Armor'
change: true
---

To survive in the galaxy, your character needs to wear armor. Not only does armor abate damage from extremely powerful,
futuristic weapons but armor also supplies __shield points__, also called shields (outlined below). Luckily, almost all
garments in the mass effect world provide some form of protection. Diaphanous night-gowns can even provide a modicum of
protection. Thus, in Mass Effect 5e, almost all operatives are wearing armor and are afforded shield points, unless the player
or GM explicitly states your character is not wearing armor.

__Armor Proficiency__. Just like 5th edition, anyone can put on armor. However, only those proficient in the armor type
know how to wear it effectively. Your class gives you proficiency with certain types of armor (light, medium, or heavy).
If you are wearing 2 or more pieces of armor that you lack proficiency with, you have disadvantage on any ability check,
saving throw, or Attack roll that involves Strength or Dexterity. If you are wearing 4 pieces of armor you lack
proficiency with, you cannot cast spells.

__Armor Class (AC)__. Armor protects its wearer from attacks. The armor you wear determines your base Armor Class.

__Shield Points__. <v-chip color="secondary" text-color="white" class="v-chip--x-small">new</v-chip> All armor chest pieces
provide some amount of shield points. See the <nuxt-link to="/phb/rules/combat#shields">Shields</nuxt-link> of the combat section for
more information.



### Mix & Match <v-chip color="secondary" text-color="white" class="v-chip--x-small">new</v-chip>
Unlike D&D 5th edition, armor in Mass Effect 5e can be mixed between armor placements on the body. There are 4 armor placements:
__Head__, __Chest__, __Arms__, and __Legs__.

Your base AC is 10 and each piece of armor provides an AC bonus depending on its type and placement as listed in
the Armor / AC table. Additionally, there are bonuses and limitations for the combination of armor types you are wearing,
explained in the Armor Bonuses and Limitations table.

__Heavier Armor__. Heavier armor interferes with the wearer’s ability to move quickly, stealthily, and freely. If the 
Armor Bonuses and Limitations table shows “Str 12” or “Str 16” in the Strength column for an armor type, the armor 
reduces the wearer’s speed by 4m unless the wearer has a Strength score equal to or higher than the listed score.

For simplicity's sake, you cannot mix armor *within* placements. I.e., you cannot have a heavy piece of on your right arm
and a light piece of armor on your left.

<ai-dialog title="Armor / AC" component="armor-ac"></ai-dialog>
<ai-dialog title="Armor Bonuses and Limitations" component="armor-bonuses-limitations"></ai-dialog>

<br>

#### Variant: Encumbrance
If you are using the <nuxt-link to="/phb/rules/using-ability-scores#strength">Variant: Encumbrance</nuxt-link> rules,
use the Armor Piece Weights table to determine the total weight of the armor you're wearing.

<ai-dialog title="Armor Piece Weights" component="armor-piece-weights"></ai-dialog>



### Armor Sets <v-chip color="secondary" text-color="white" class="v-chip--x-small">new</v-chip>
Most armor you buy in the galaxy has been mass-produced, these are called __armor sets__. A set is not required to be
multiple pieces of armor. For example, the Capacitor Helmet is a single piece of head armor. The unique aspect of armor
sets is that they have benefits and attributes that are pre-installed due to their mass-production. Thus, you cannot
customize armor sets with armor mods and you cannot salvage a beneficial aspect from an armor set.

Armor sets have an armor type (light, medium, or heavy) which you use for calculating your character's AC.

__Body Armor__ is a special type of armor piece that consists of 3 pieces of armor: Chest, Arms, and Legs. Body 
armor is completely integrated (all or none), therefore, you cannot swap out pieces from other sets. I.e., if you're 
wearing the Duelist body armor, you cannot replace the legs from it with the Lockdown Greaves. This rule is, of course, flexible,
as GMs might allow this type of tinkering in exchange for time, credits, and/or skill checks. 


__Set Bonuses__ are additional benefits you receive from wearing multiple pieces from the same set, signifying the armors
component pieces working together for a unified integration. Armor with the same base name is part of a set, e.g. __Colossus__ _[item]_. 

You only receive the benefit once per set and the benefit ends immediately if you fall below the threshold. For example, 
if a set provides:

##### Medium Armor
- __Set Bonus (2 of 4)__: +1 AC 
- __Set Bonus (4 of 4)__: +1 AC


If you are wearing the head and chest pieces, you gain +0 AC from the helmet and +2 AC from the chest piece (as calculated 
using the Armor / AC table). In addition you gain +1 AC from wearing 2 pieces of the set. Note, you _do not_ gain +1 AC 
for the head _and_ +1 AC for the chest. As soon as you remove either the helmet or the chest 
apiece, you loose the +1 AC bonus.


### Environmental Protection <v-chip color="secondary" text-color="white" class="v-chip--x-small">new</v-chip>
All armor provides basic environmental protection from the vacuum of space or hazardous atmospheres. Armor supplies enough
air and heat to the wearer for 8 hours of activity or 16 hours if the operative remains motionless. Your GM may require
that your character wear a helmet to gain this benefit, or they may use the __bubble rule__ and claim that all armor suits
can cast an energy "bubble" around your characters head to keep air in and the environment out.



### Getting Into and Out of Armor
The time it takes to don or doff armor depends on the armor's category.

__Don__. This is the time it takes to put on armor. You benefit from the armor's AC only if you take the full time to don the suit of armor.

__Doff__. This is the time it takes to take off armor. If you have help, reduce this time by half.

Category | Don | Doff
--- | --- | ---
Light Armor | 1 minute | 1 minute
Medium Armor | 5 minutes | 1 minute
Heavy Armor | 10 minutes | 5 minutes

<source-reference pages="62-63"></source-reference>
