---
layout: post
title: "v0.5.0 - Finally a few monsters"
description: "Bestiary drops with Reaper and collector forces. Shield mechanics refactored and some site enhancements"
image: https://vignette.wikia.nocookie.net/masseffect/images/8/89/Derelict_reaper_-_altar_huskathon.png/revision/latest/scale-to-width-down/640?cb=20140712153831
---

## Shields

Something that's been nagging me for some time is the shield mechanic. The idea was this: shields make up half of a
player's health and slowly regenerate if they don't take damage. Sounds great, right? But a simple, great sounding idea
can get complicated quickly. The first major hurdle was divvying up player health. Trying to 'split dice' resulted in
a total health pool about 10% higher than in 5th edition. When I factored in the average rate of shield
regen the increase jumped to more than 25% higher.

More importantly, rolling each turn to get shields back wasn't very exciting and took up a lot of time. Each round of
combat, players had to think: _did I take damage? I didn't..._ [rolls dice] _...oh, goody, 2 sp I need track_. I found
that players actively choose _not_ to roll because they didn't really care for the benefit.

The final problem was the mechanic didn't fit the fiction. What happens when a player removes their armor? Do they still have shields?
What is the underlying effect that causes you to gain more shields when you level up?

Through discussions with Swampson, we cam up with an alternative that we believe fixes all of these problems:

1. Shields no longer level up with the character.
2. Shields are a small regenerating pool of temporary hp.
2. Shields come standard in all chest armor pieces, with a base of 5 shield points and a regen of 5. Both can be increased with mods.
3. Shields only recharge an amount equal to their regen when the character takes the Hide or Dodge action and then takes no damage until the start of their next turn.

#1 & #2 fix the health and fiction issues. But I'm especially excited about #3. The idea of hiding or dodging to recharge
your shields is a great reflection of Mass Effect combat. Plus, the reward has more potential for the player. Although, 5 additional
hit points doesn't sound like a lot, it is for a level 1 character wearing standard armor, and as players level up they can
get upwards of 30-40 shield points via upgrading their armor. What I really enjoy is that players now have an
active choice in regaining shields, but there is still some luck involved.

Mechanically, I'm also a fan of how well this mechanic blends with the existing 5th edition rules. Instead of a more
complex set of hp, shields are akin to a cantrip that provides temporary hp. The increase in health isn't too much to break
the system, but enough to help mitigate the lack of healing spells.

If you've got any thoughts on this change, feel free to use the [feedback form](https://goo.gl/forms/3wZj8QhlsLv3XOJw1).

## Bestiary

As mentioned in my previous post, I've still be working on the bestiary. My goal is 100 unique monsters and npcs by the end
of April (no promises!). For now, I am happy to be able to give you the Reaper and Collector forces. Before you get too excited,
no, this does not include a Reaper. That's a task that will take extensive play testing. But, with the random grunt generator,
I hope this is enough to get you started on a fun campaign. From here on out, instead of a huge drop in April, I'll add
factions as I complete them. Cerberus is next, followed by the Geth, then the mercenary factions (Blue Suns, Eclipse, and Blood Pack).
Finishing out the bestiary with some aliens, re-skined 5th edition monsters that I think fit well into the universe, and some
named NPCS. When I finally do drop a Reaper stat block into the mix, I'm sure I'll have a very long post explaining my choices,
math, and play testing notes.

## Site improvements

Probably least exciting to the average user (but exciting for me) are the minor site enhancements I've added.
Spells, weapons, monsters, and grunts can now be bookmarked for quick reference. Conditions and some rule references
now have tooltips. And we've added spell cards to the [Printables]({{ site.github.url }}/printables) section. Special
thanks to Swampson for banging those out. We're not 100% on the layout and style, but when we are, we'll release a
printing guide to go along with them.

As always, the [changelog](/changelog) is available for all the
nitty gritty details.
