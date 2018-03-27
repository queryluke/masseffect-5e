---
layout: post
title: "Grunt Generator"
description: "Explanation of new site feature: the Grunt Generator"
excerpt: A quick and easy way to create NPCs.
---

For the past month, I've been quietly working on the bestiary. For people who've read the DMG or used it to create monsters,
you'll know it can be a complicated process. That's not a complaint. I love the details and thoroughness provided by WoC.
But it means that creating really good monsters takes time.

My initial tentative list included a lot of archetypes. Not simply an archetype for each class, but archetypes that could span Challenge Rating (CR),
races, classes, etc. But while working on the archetypes, I was repeating a ton of work. The silver lining was that I
realized many of these archetypes could be 1) programmatically created and 2) randomized.

This led me to designing a utility that could generate archetypes with random stats, features, and actions. I call it
the "Grunt Generator." No, this isn't a _Home Improvement_ reference. A "grunt" is a throwaway NPC. It's not as specific
or unique as a monster, but it doesn't have the time and effort of a reoccurring or important NPC (like a boss or rival team).
Using the monster creation logic in the DMG, I created a very complex, programmatic "flowchart." It adjusts
attack bonus, defensive bonuses, and damage per round based on the chosen CR level. This ensures that the generated grunts aren't too powerful or too weak.

Another benefit this utility brings is variety. With Wizard's Monster Manual, Volo's Guide, and the plethora of other books in existence,
there are hundreds if not thousands of monsters to choose from. I could spend years working on Mass Effect monsters and not come close
to the amount provided in D&D. So I took a short cut. The randomized stats, class, race, features, spells, tech
and weapons means the number of unique grunts totals in the tens of thousands!

Finally, a hidden benefit I hadn't planned for was loot. Because the weapons that a grunt has equipped are
randomized, when players take out a grunt, they can loot the body. This makes it really easy to pass out new weapon options
to your players. Armor isn't a part of the grunt generator (yet?), so you'll still need to decided if there is any armor to
loot. But at least the weapons are easy!

In the Player's Handbook, you'll find a new section, "GM Tools". In the future, I hope to fill this with other utilities,
but for now you can use the Grunt Generator. Pick you target CR, class, and race get generating! You can save the generated
grunt and make a list for your encounters. I'm eventually going to turn the list into a true encounter
utility, which will let you pull in monsters from the bestiary. I've also got plans to improve the Grunt Generator,
like advanced options to let you tailor you grunts a bit more.

Please note, I'm still working on the bestiary. Hopefully this new feature will keep your campaigns active and fun until
I can get an official bestiary up. And don't be afraid to use monsters available in D&D, this is a large universe!