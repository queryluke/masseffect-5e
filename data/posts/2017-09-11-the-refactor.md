---
layout: post
title: "The refactor: So much change, it's basically new"
description: "We've overhauled the Mass Effect 5e, making it better than it was before. Better, stronger, faster."
image: https://vignette.wikia.nocookie.net/masseffect/images/9/9d/Mass_relay_montage.png/revision/latest/scale-to-width-down/640?cb=20141021134527
---

## Shoutout
Major thanks to [SleightxHope](https://github.com/SleightxHope) for jumping into Github and contributing a ton of ideas.
Backgrounds, skills, armor, weapon mods, class rewrites! Can't say thanks enough for the collaboration and playtesting!


## Where did the old one go?
For anyone that wants the old version, click on the
version number in the upper-right of the main nav and 
select "[v0.1.0-alpha]({site.github.url}/v1/)".


## Why so much change?
One major issue was that almost all classes peaked around lvl 9. I started using
[spreadsheets](https://docs.google.com/spreadsheets/d/e/2PACX-1vTyqV8mnMFzRexQ_pEMnX1-BFRqFt3Jb_uCBjjY3nUdPCMbNT0dXc7Nkd4tIlZlzjv4NuR6xB44Euqd/pubhtml) 
to track damage progression throughout levels. FYI - Those sheets are sorely
out of date, as I threw in a plethora of changes last minute. But that's the documentation
for how the new classes stack up damage wise. It's really just proof that
I put in _some_ amount of time trying to balance this system out.

The other major issue is that I wanted this conversion to reflect D&D 5th Edition
as much as it could. I'd spent too much time coming up with random abilities and class features
rather than leaning back on the amazing work WoC does. So, in this iteration, I focused
on taking subclass features from 5e and sticking them in at appropriate levels. There is
still plenty of homebrew content, but the classes should have a much more familiar feel than before.


## Player's Handbook
To keep things more sustainable, I've completely rewritten the [player's handbook]({{ site.github.url }}/phb/) into a single page webapp. This 
part of the site will now exist to keep people updated on news, play testing, and other miscellaneous items, like printable character sheets
and spell cards.

**NOTE:** If you see any spelling errors or come across any bugs, please [add an issue in the repo](https://github.com/queryluke/masseffect-5e/issues)


## Changes

### Rules
Mostly clarifications with a few minor updates.

#### Weapons

**Weapon Handling**

* Reloading takes an action
* Holstering and drawing a new weapon is a bonus action

**Weapon Stats**

* Made the **Rof & Heat** stat simpler. Instead of subtracting RoF from Heat, heat is now the number of times you 
  can fire the weapon before you need to reload.
* **Rare** Weapons. Basically a way of saying lvl 1 PCs shouldn't have access to these weapons.

**Weapon Attributes**
Weapons now have different types of attributes like "Arc" and "Hip Fire" which give the weapon additional combat perks.

**Removed Hip Fire**
The previous version gave all weapons advantage in melee range. Now only Hip Fire weapons have advantage in melee range.
The standard D&D rule applies that all other ranged weapons have disadvantage in melee range.


#### Armor
Expanded the Armor section. Currently working on pre-made armor sets and armor mods.


#### Consumables
It never felt "right" that grenades and ammo powers were "spells". So I've made them consumables. Consumables
are kind of like magic items. They have an associated rarity (how often you'll get access to them) and are gone
once you use them.

**Medi-gel**
...has been added. Lets you use a hit die in combat. See Rules > Consumables in the PHB.

#### Skills
New Skills: **Engineering**, **Xenology**

### Races
**Geth**
I took away a few of the Tech powers that came from geth classes in ME3 Multiplayer mode and made them geth only. 
Repair Matrix and Hunter Mode didn't really make sense for organic creatures. In addition, geth get some really nice
class-specific features at level 11. This is to make up for the fact that geth cannot take any feats.

**Quarians**
Removed Improvised Grenade and added Cybernetic Augmentation. Read about the latter in the codex and felt the Imp grenade was
lame.

**Salarains**
Made Photographic Memory much more powerful, cosidering this is one of the weakest races. Great for Skill Monkeys though!



### Classes
To be honest, so much has changed with the classes, the best I can do is give you an overview of each one. I'm also providing
a % done. By this, I mean how much the class __feels__ complete, which should also be an indication of how much it's likely to change
in the future.

#### General
**Damage!** 

A major issue in the previous iteration was that every class's damage output stopped scaling around level 10. This
has been fixed. It also meant implementing a new Max TP system for Engineers, Infiltrators, and Sentinels. Basically, as you
level, you can spend more TP on your Tech Powers.

**Combat Powers**

I added in Combat Powers, which are mechanically like class features (generally only use them once per short/long rest),
but give you the customizing feel of spells and tech powers, i.e., you can choose which ones you want. Soldiers choose
Combat powers as they progress, but Infiltrators can take a few as well instead of learning a tech power. I hope to expand
the crossover list further.

#### Adepts
**90%**
Brought adepts much more in line with Wizards, borrowing a lot of class and subclass features from D&D.

#### Engineers
**90%**
Primarily worked on the Support subclass, giving it more variety.

#### Infiltrators
**75%**
Redistributed and added more of the Rogue features from D&D. Still feels like it could use a little bit more work.

#### Sentinels
**60%**
I feel like tech armor changes every time I sit down to do edits. I need to do a lot more playtesting with Sentinels and
all subclasses before I can put a button in it.

#### Soldiers
**85%**
Probably the most drastic overhaul, getting rid of adrenaline dice, reworking the subclasses, adding combat powers,
and making them progress more like fighters. I'm mostly happy with the outcome.

#### Vanguards
**75%**
Updated subclasses and tried to make them more melee heavy. A mix of Paladins, Barbarians, and Fighters. Could still use
some work.

### Feats
Added a new Feat: Grenadier. Hoping to add a few more in the near future.

### Backgrounds
SleightxHope provided all of these. Will try to add more soon.

### Spells
Also major overhauls.

Well, I think that's everything. This has been a hell of sprint to get all the edits in, but I think it's at a much more stable
place where we can slow add new feature and adjust classes. Thanks to anyone out there who is playing!




