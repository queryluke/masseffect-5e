---
length: 3730
title: '3. Determine Ability Scores'
---

Much of what your character does in the game depends on his or her six abilities: __Strength__, __Dexterity__, __Constitution__,
__Intelligence__, __Wisdom__, and __Charisma__. Each ability has a score, which is a number you record on your character sheet.

The six abilities and their use in the game are described in the <nuxt-link to="/phb/rules/using-ability-scores">Using Ability Scores</nuxt-link>
section. The Ability Score Summary provides a quick reference for what qualities are measured by each ability, what races
increases which abilities, and what classes consider each ability particularly important.

<ai-dialog title="Ability Score summary" component="ability-score-summary"></ai-dialog>

You generate your character’s six ability scores randomly. Roll four 6-sided dice and record the total of the highest
three dice on a piece of scratch paper. Do this five more times, so that you have six numbers. If you want to save time
or don’t like the idea of randomly determining ability scores, you can use the following scores instead: 15, 14, 13, 12, 10, 8.

Now take your six numbers and write each number beside one of your character’s six abilities to assign scores to
Strength, Dexterity, Constitution, Intelligence, Wisdom, and Charisma. Afterward, make any changes to your ability scores
as a result of your race choice.

After assigning your ability scores, determine your ability modifiers using the Ability Scores and Modifiers table.
To determine an ability modifier without consulting the table, subtract 10 from the ability score and then divide the result
by 2 (round down). Write the modifier next to each of your scores.


<ai-dialog title="Ability Scores and Modifiers" component="ability-score-modifiers"></ai-dialog>

<v-alert type="info" :value="true">
<strong>BUILDING KALEEM, STEP 3</strong><br>
Sam decides to use the standard set of scores (15, 14, 13, 12, 10, 8) for Kaleem’s abilities. Since she’s an engineer,
she puts her highest score, 15, in Intelligence. Her next-highest, 14, goes in Dexterity. Kaleem might be a charismatic,
good leader, but Sam decides she wants the salarian to be tougher and stronger than most of her kind, so she puts decent
scores in Strength and Constitution. After applying her racial benefits (increasing Kaleems’s Intelligence by 2 and her
Dexterity by 1), Kaleem’s ability scores and modifiers look like this: Strength 12 (+1), Dexterity 15 (+2),
Constitution 13 (+1), Intelligence 17 (+3), Wisdom 10 (0), Charisma 8 (-1).

Sam fills in Kaleem’s final hit points: 8 + her Constitution modifier of +1, for a total of 9 hit points.
</v-alert>

### Variant: Customizing Ability Scores
At your Galaxy Master’s option, you can use this variant for determining your ability scores. The method described here
allows you to build a character with a set of ability scores you choose individually.

You have 27 points to spend on your ability scores. The cost of each score is shown on the Ability Score Point Cost
table. For example, a score of 14 costs 7 points. Using this method, 15 is the highest ability score you can end up with,
before applying racial increases. You can’t have a score lower than 8.

This method of determining ability scores enables you to create a set of three high numbers and three low ones (15, 15,
15, 8, 8, 8), a set of numbers that are above average and nearly equal (13, 13, 13, 12, 12, 12), or any set of numbers
between those extremes.

<ai-dialog title="Ability Score Point Cost" component="ability-score-point-cost"></ai-dialog>

<source-reference pages="7-8" source="basic"></source-reference>