---
layout: post
title: "v0.5.1 - Cerberus forces"
description: "Overview of Mass Effect 5e version 0.5.1 changes"
excerpt: Cerberus forces and a note about upcoming changes
---

## Cerberus Forces
12 unique monsters have been added to the Bestiary which encompass the list of Cerberus forces. It may seem like 3 weeks is
a long time to only have finished 12 monsters, but I need to refactor the underlying weapon code. Originally, I was creating
duplicate attacks for each weapon. I.e., there was an NPC weapon attack and the weapon itself. But this was creating a lot
of inconsistent data and needed to be remedied.

Sans the delay, I am happy with the diversity among this group of NPCs. Adjutants add a bit of 'vampire'-flare to the system.
Phantoms and Dragoons are a threat up close and hard to hit. Combat Engineers can be troublesome by spawning Turrets. Guardians
are walking tanks that can take a serious amount of damage. All the while, a Nemesis might be taking pot-shots at you from 80m out.

## Re-aligning with 5e

Re-aligning Mass Effect 5th Edition (ME5e) with 5th Edition (5e), where possible, is an on-going process.
The first few versions of ME5e were based on cool ideas and not thoroughly play tested. As ME5e evolves, we want to be sure
it has a balance and doesn't drift too far from the source. In some cases, the drift is necessary, a plethora of weapons and a nod towards
science over arcane. In other cases, the drift is intentional to add depth and variety: the expanded armor rules. But in a lot of cases,
the drift makes playing ME5e more complicated than intended. We want to fall back on existing 5e rules and only make changes
where the core rules don't have the necessary structures to support this setting. A few examples follow.

### Omni-tool attacks

In v0.5.0, we removed omni-tool attacks. This is a case where I'd simply pulled the idea straight out of ME3, in which each
class has its own attack. Though I've received feedback that it was a fun idea, the effect was that each class's default melee
action was set and not a choice the player can make. However, we still need to replace the ME idea of having an omni-tool attack.
Nothing feels better than picking off a few marauders at range while a group of husks close in on you and, at the last second,
spawning a blade and cutting those zombies to shreds.

I never intended to lose this feeling, but I hadn't created the structures to replace it. In v0.5.1, we're halfway there.
We've introduced multiple types of Omni-weapons which have the potential to work like the previous omni-tool attacks. First,
these weapons don't use a weapon slot (and have a weight 0 if using the Encumbrance rules). In addition, you can draw them with
a free action. So features that grant additional attacks can now be used for these omni-weapons without having to stow or draw
different weapons.

Currently there isn't a replacement for the biotic powers (Biotic Push and Punch). These should be available as cantrips
in the next update. We're also working on providing Engineers with a cantrip-like starting power which can also replace their omni-tool power.

### Medi-gel
Medi-gel should have always been a healing potion instead of the weird mechanics using hit die. Again, the hit die mechanics were neat,
but unnecessarily complex.

### Armor Proficiency
Another superfluous change was tying armor proficiency to race. This somewhat came from ME1 where certain armor types were only
available for certain races, but it didn't add enough to the game. Mechanically, all it did was force some races to take feats in order
to play their class effectively. It also simply added a 5,000 credit price tag for most armor. No we're back in-line with 5e
and all armor proficiency and starting equipment is on the class.

## Skill changes
Finally, the skill changes were made to accomodate the upcoming Backgrounds and a large vehicle/space travel addition Swampson is working on.

Details of all changes can be found in the [changelog](https://github.com/queryluke/masseffect-5e/blob/master/CHANGELOG.md).

[Feedback Welcome!](https://goo.gl/forms/3wZj8QhlsLv3XOJw1)
