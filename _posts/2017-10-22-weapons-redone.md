---
layout: post
title: "Version 0.3.0"
excerpt: Time for a weapon refactor.
---

In a pre-version 1 iteration that was never published, the weapons stats were mapped from the [ME3 weapon stats](http://masseffect.wikia.com/wiki/Weapons#Mass_Effect_3).
Then I did a lot of tinkering to add some variety to the weapons, but in doing so, I screwed everything up and made many weapons way to powerful.

This refactor attempts to bring the weapons back in line to their stats, as well as add any additional effect the weapon had in-game.
For example, the [M-37 Falcon](http://masseffect.wikia.com/wiki/M-37_Falcon) is essentially a grenade launcher, but there was nothing in
this system that mirrored that mechanic. Now it has:

```
Instead of making a ranged weapon attack, the target makes a Dexterity saving throw (DC 8 + DEX modifier). If you are
proficient with Assault Rifles, add your proficiency bonus to the DC. On a failed save, the target takes 1d8 thunder damage, or half as much on a successful one.
```

Damage was also scaled back, but not too much. Originally, the conversion was that all "automatic" weapons had a 5-6 Rate of Fire(RoF), but 5-6 damage die is A LOT.
Shotguns also had a high RoF accounting for the amount of bullets in a single blase, which created ambiguity between fire rate and bullet count.
Three-round burst weapons has 3, Semi-auto has 2, and there were a few single shot, like sniper rifles. This also created a very large
spread on the damage tables.

In the refactor, there is a new weapon type: "Semi-automatic". By default these only have an RoF of 1, but you can use your bonus
action to fire another shot. This makes the standard D&D 5e dual wielding mechanic more accessible, i.e., if you've got a
semi-automatic weapon, you can make a second attack as a bonus action.

Three-round burst weapons have an RoF of 3, and automatic and RoF of 4, with a few minor exceptions for weapons that had
ridiculously higher RoFs in the game like the Tempest SMG and a few Heavy Weapons.

The end result is more generalized weapons by type that have enough variety in range, heat, and mechanic to make your choice fun:

* Assault Rifles: Vary more than any other weapon type but are generally automatic with lower heat and a medium range
* Heavy Pistols: Semi-automatic, light, with high heat and medium range
* Shotguns: Short range power houses with low heat but a variety of punch.
* SMGs: Short range, high RoF, low damage.
* Sniper rifles: Long range & high damage with limited RoF and Heat.

Rare weapons have an increased cost (20k credits). This should make them unattainable to low level players and
gives them a monetary cost to their awesomeness. Obviously, GMs can adjust cost to their needs.

And finally, this version includes new melee weapons!

Melee weapon attributes work exactly like their D&D 5e counterparts (finesse, light, thrown, versatile, reach, etc). Most weapons have a special
ability as well. However, to replace the "proficiency" aspect of melee weapons (since there are so few), there is a STR requirement.
Anyone can wield a melee weapon, but if you don't have the required STR mod (matching or above) your melee attacks with the weapon are
made at a disadvantage.



