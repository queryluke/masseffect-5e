---
layout: post
title: "v0.6.0 - A faster way to upgrade"
description: "A major back-end overhaul will make it easier to iterate on Mass Effect 5e"
image: https://vignette.wikia.nocookie.net/masseffect/images/0/04/ME3MP_Ops_Survival_Pack.png/revision/latest?cb=20180207021358
---

### The Bad News
Unfortunately, I wasn't able to get to everything I wanted to in this release. There aren't any new monsters,
a planned Drone Jockey overhaul was left to the wayside, and some spell changes didn't make it in. The reason is that
I've spent the majority of my time working on a major overhaul of the back-end of the site.

Prior to this release there were some major hurdles I was battling with. For one, the Player's Handbook (PHB) and the information pages (index, about, news), were split
between 2 systems (Vue and Jekyll). I'd also been 'hacking' my development setup which often caused errors which led to hours debugging.
Additionally, the setup had a fatal flaw in that permalinked urls to the player's handbook would render blank pages, which
meant site crawlers weren't able to parse any information in the PHB pages. I'm not too concerned about Search Engine Optimization (SEO), but felt that
crawlers should at least be able to scan the bulk of the content.

Finally, I wanted a bit more pizazz and clarification on the homepage to explain what this system was and how to get started. My
analytics were showing a pretty high bounce rate (lower is better) on the homepage, but a high acquisition rate for users that
managed to make it to the Player's Handbook. I.e., users would land on the site, see only news and the logo and think, "We'll this looks
pretty lame, bye!"

What was initially a piecemeal approach to fixing these issues turned into a complete overhaul, which took much longer than I originally anticipated.

### The Good News

#### 1. Fancy new site pages
I probably enjoy this more than most. But the homepage, about section, and news section all have new styles.

#### 2. Increased interest in the system
Over the past 2 weeks, I've received a swarm of feedback. At least 7 people have mentioned they're getting ready to start a campaign.
This has me floored. Before, I knew of only a few groups who were actively using the system. Not it seems like we're up to about a dozen.
The more users we have the more feedback and play testing we'll get, which will really help the system evolve.

On this note, I need to give some shoutouts to Ben McPherson, Noel Moriarty, Adam (TheMarmotKing), and Alex Needleman who've been working really hard on pointing out
site bugs, over/underpowered mechanics, and creating new content. Keep up the good work everyone!

#### 3. Still get some new changes
Even though my time was limited, I was still able to push a host of new changes, but this is mainly thanks to the aforementioned people.

The major addition is that Weapon Mods were added. These will give players a new way to get bonuses on weapons which helps alleviate the lack of
+N magical items that 5th edition has. Another big change was the increase opportunities for classes to learn Tech and Biotic powers, which should
help make the classes feel less stale between levels. There are a host of other changes, all of which can be read about in the [changelog](/changelog).







