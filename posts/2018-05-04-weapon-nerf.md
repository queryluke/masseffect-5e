---
layout: post
title: "v0.7.0"
description: "Geth forces, Race Audit, and a Weapon Balance"
image: https://vignette.wikia.nocookie.net/masseffect/images/a/a9/ArmatureLanding.png/revision/latest?cb=20090125024722
---

### Many hands
First, we want to give a thanks to following people. They've been providing a lot of great feedback and ideas
through Github and it's really spurned a lot of improvements.

* bpmcpherson
* nmmoriarty
* Duneday
* damuttley
* SrShadow
* BLUEmusta
* TheMarmotKing

Additionally,

* Alex Needleman has continued to playtest and provide a lot of great feedback.
* David Thompson has offered his help with design.

Thanks to everyone!!!

### Highlights

#### Weapon Balance
If you averaged the damage of all weapons before and after v0.7.0, you could argue that we're nerfed the weapons. But
we consider this version to bring a much better balance to the weapon system, despite the slightly reduced damage overall.

We noticed quite a few problems with the previous versions
1. Weapons dealt 15-20% more damage than in 5th Edition
2. The spread of damage was huge 1d4 => 4d10
3. The Rate of Fire mechanic didn't have any benefits other than being flavor about the weapon. And even the flavor was difficult to apply.
Take the M-4 Shuriken: in the game, this weapon specifically has a six-round burst, meaning 6 RoF. But since it's meant to be a starting weapon, we had to make it deal 6d1. There are other cases where RoF didn't directly correlate.
4. Weapon damage was unbalanced. We received a lot of feedback that Shotguns were too powerful, Sniper rifles underpowered, and melee weapons worthless.

Our solution was to create weapon profiles and build from those profiles. In doing so we also created distinct levels for
the weapons that mirror 5th edition's item rarity (Common, Uncommon, Rare, Very Rare). This provided a system in which we could
make objectively better weapons, whereas previous versions attempted to make all weapons unique (save for the starting weapons).

We're very pleased with the result and feel the weapons are more balanced than they've ever been. If you'd like to read the entire
discussion, please refer to the [github issue](https://github.com/queryluke/masseffect-5e/issues/249). Additionally, we prepared
[an analysis](https://docs.google.com/spreadsheets/d/e/2PACX-1vSq70x_GZuDKcELgX8k_7Hd6nLGu3DoIEdDwP-YEGjUU-ghGc7ot_Q7140FZwGbEalHgzPwVm4BN8y_/pubhtml?gid=332103674&single=true) of the new weapon balance.

#### Mods
In the last release, we introduced weapon mods, but this was rushed and not thoroughly tested. It became clear that the stacking of certain mods
(especially between weapons an armor) created very high bonuses. In 5th edition, +X items are limited to +4 for legendary type items, but our
mod combinations could result in as much as +7. In response, we've changed or removed any armor mods or sets that increased the effectiveness of
ranged weapons. Basically, let weapon mods buff weapons and let armor mods buff defenses. The only caveat is that armor can still provide boosts
to melee weapons, as they currently have no mods.

#### Drone Jockeys
As alluded to in our previous release, we've been working on an overhaul of the Drone Jockey (Engineer) subclass and it's finally here.
Now you can have a permanent drone companion, outfitted with its rudimentary AI (yeah, it's going have personality traits). This also changes the Drone
class feature as well. Drones now have their own stat block in the Bestiary, and when you summon one, you summon the bestiary version.

#### Race Changes
Primarily due to work of the contributors listed above, we audited each race. We focused on missing lore specific traits,
balancing the traits between races, and clarifying trait mechanics. Of particular note, Asari will use Charisma as their
spellcasting modifier for biotic spells, rather than Wisdom.

#### Other changes
There are a host of other changes in this release, but too many to highlight. The [changelog](/changelog) has all the details.

### What's next?

We've got a lot of things in the works!

#### Angara Race
Ben (bcmcpherson), our local Andromeda expert has been creating a lot of Andromeda content. Most notably is his [Angara concept](https://github.com/queryluke/masseffect-5e/issues/205).
We're not quite ready to include everything in the system because we need to do a bit of housekeeping on the backend. But, we encourage you to test
out the race and provide feedback!

#### Digital Character Sheet
Ben has also been working on a version of the Character Sheet in Google Sheets. Once the finishing touches are ready, we'll get it up on the site.

#### Loot Generator
As the dust settles on the cost of mods, weapons, and armor, we've been working on a Loot Generator and guidelines for awarding credits. That should be out in the very near future.





