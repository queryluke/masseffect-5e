---
length: 3555
change: true
title: '5. Choose Equipment'
---

Your class and background determine your character’s starting equipment, including weapons, armor, and other adventuring
gear. Record this equipment on your character sheet. All such items are detailed in the Equipment section.


__Starting Credits__ <v-chip color="orange accent-2" text-color="black" class="v-chip--x-small">change</v-chip>
Instead of taking the gear given to you by your class and background, you can purchase your starting equipment. You
have a number of credits to spend based on your _race_ (not your class as in D&D 5th). The range of average starting credits
is roughly equivalent across races, but the variability changes based on race. Long-lived races (asari and krogan) have lower
variability, whereas short-lived races (salarians and vorcha) have a high variability.

Your Strength score limits the amount of gear you can carry and armor you can wear. Try not to purchase equipment with
a total weight exceeding your Strength score times 2. <nuxt-link to="/phb/rules/using-ability-scores#strength">Using Ability Scores</nuxt-link>
has more information on carrying capacity.

### Armor Class

Your Armor Class (AC) represents how well your character avoids being wounded in combat. Things that contribute to your
AC include the armor you wear and your Dexterity modifier. Not all characters wear armor, however.

Without armor, your character’s AC equals 10 + his or her Dexterity modifier. If your character wears armor,
calculate your AC using the rules in the <nuxt-link to="/phb/rules/equipment#armor">Armor</nuxt-link> section. Record
your AC on your character sheet.

Your character needs to be proficient with armor to wear and use it effectively, and your armor proficiencies are
determined by your class. There are drawbacks to wearing armor if you lack the required proficiency, as explained in
the Equipment section.

Some spells and class features give you a different way to calculate your AC. If you have multiple features that give
you different ways to calculate your AC, you choose which one to use.

### Weapons
For each weapon your character wields, calculate the modifier you use when you attack with the weapon and the damage
you deal when you hit.

When you make an attack with a weapon, you roll a d20 and add your proficiency bonus (but only if you are proficient
with the weapon) and the appropriate ability modifier.

For attacks with __melee weapons__, use your Strength modifier for attack and damage rolls. A weapon that has the
_finesse_ property, such as a monomolecular blade, can use your Dexterity modifier instead.

For attacks with __ranged weapons__, use your Dexterity modifier for attack and damage rolls. A weapon that has the
_recoil_ property, such as the M-300 Claymore, can use your Strength modifier instead.

<v-alert type="info" :value="true">
<strong>BUILDING KALEEM, STEP 5</strong><br>
Sam writes down the starting equipment from the engineer class and the scrapper background. Her starting equipment
includes Stock Medium Armor which (after adding her Dexterity modifier) gives Kaleem an Armor Class of 16.

For Kaleem’s weapons, Sam chooses an M-8 Avenger (because she took the Assault Rifle proficiency) and an Omni-torch.
Her M-8 Avenger is a ranged weapon, so Kaleem uses her Dexterity modifier for her attacks and damage. Her attack bonus is
her Dexterity modifier (+2) plus her proficiency bonus (+2), for a total of +4. The M-8 Avenger deals 1d8 piercing damage,
and Kaleem adds her Dexterity modifier to the damage when she hits, for a total of 1d8 + 2 piercing damage. Notice, 
she does not add her proficiency bonus to the damage roll, only the attack roll. When using the
Omni-torch, a melee weapon, Kaleem adds her Strength modifier (+1) to the attack roll and the damage roll. But, because 
she is not proficient with melee weapons, she does not add her proficiency bonus to the attack roll.
</v-alert>

<source-reference pages="9" source="basic"></source-reference>
