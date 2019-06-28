---
length: 6186
title: 'Shields'
new: true
---

>Kinetic barriers, colloquially called "shields", provide protection against most mass accelerator weapons. Whether on
a starship or a soldier's suit of armor, the basic principle remains the same. Kinetic barriers are repulsive mass effect
fields projected from tiny emitters. These shields safely deflect small objects traveling at rapid velocities. This
affords protection from bullets and other dangerous projectiles but still allows the user to sit down without knocking
away their chair. The shielding afforded by kinetic barriers does not protect against extremes of temperature, toxins,
or radiation.

### Shield Points
Shield points are a special type of regenerating hit points that protect your from fast-moving projectiles and provide
advantage in certain situations against some tech and biotic powers.



### Shield devices
All armor chest pieces come standard with _5 shield points_ and a _regen of 5_. However, more advanced mods and armor
sets can provide additional shields. Additionally, personal shield generators are available which can provide shields
without the operative equipping armor.



### Damage
When you have shield points and take damage, the shield points are lost first, and any leftover damage carries over to 
your normal hit points. For example, if you have 5 shield points and take 7 damage, you lose the shield points and then 
take 2 damage. Some abilities "bypass" your shield points. In these instances, you subtract damage from your
hit points leaving your shield points unchanged.

#### Melee Weapons
All damage resulting from a melee weapon attacks bypass shield points.



### Shield Regeneration
Your armor's shield points are managed by the onboard VI, which is taxed during combat as it manages other systems: your
omni-tool or biotic implant, HUD, etc. Thus, once a threat is properly neutralized, or you are able to temporarily remove
yourself from the fray, your VI can route power back into your shields for immediate regeneration.

#### Out of combat
Your shield points regenerate completely on a short or long rest or when combat has ended for at least 1 minute.

#### In combat
To attempt to regenerate your shields during combat, you must attempt to remove yourself from the chaos, meeting one of
the following conditions on your turn:

- Take the Hide action
- Take the Dodge action
- Take the Disengage action
- Have full cover at the end of your turn

Then, if you take no damage until the start of your next turn, your shields begin to regenerate and you gain shield
points equal to your armor's regen stat. You continue to gain shield points equal to your regen stat at the start of each
of your turns. If you take damage or you reach your maximum shield point capacity, the regeneration ends.

<v-alert :value="true" type="info">
<p><strong>SHIELD REGENERATION EXAMPLE</strong></p>
Todd is playing human vanguard name Todd who has invested heavily in his armor's shields, giving him 20 shield points
with a regen of 10. Todd rushes into a Reaper hoard of marauders who unleash a volley of bullets at him, bringing his
shields to 4. On his turn, Todd thinks better of his actions and decides to take the Dodge action, ducking behind a crate.

Some marauders lose sight of Todd, others attempt to hit him again, but are unsuccessful. At the start of Todd's turn,
he has taken no damage since the end of his last turn and his shields begin to regenerate, immediately gaining 10 shield points.
Todd now has 14 shield points total. Todd takes his turn as he normally would.

An adept spots Todd and hits him with a Warp spell. This bypasses Todd's shields and deals 13 necrotic damage. But it
does not end his shield regeneration. If this damage had been from an Assault Rifle or an Incinerate spell, Todd's shield
regeneration would have ended.

On Todd's next turn, he gains another 10 shield points, putting him back to his maximum capacity of 20 and the regeneration
ends.
</v-alert>

<br>

### Lightning Damage
All shields are vulnerable to lightning damage. In the event that a lighting attack removes all shield points, the
following steps outline how to divvy up the damage:

1. Double the lightning damage done to the target.
2. Subtract the shield points from the total damage.
3. Reduce the remaining damage by half
4. Apply the new amount to the target's hit points.

