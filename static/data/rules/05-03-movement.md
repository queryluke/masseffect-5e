---
length: 1043
title: 'Movement'
change: true
---

Spacewalking along the surface of an asteroid, sneaking down a space station corridor, scaling a treacherous mountain
slope - all sorts of movement play a key role in fantasy gaming adventures.

The GM can summarize the operatives' movement without calculating exact distances or travel times: "You travel through
the dusty desert of Turchanka and find a small outpost late in the evening of the third day." Even in a space station,
particularly a large station or an asteroid colony, the GM can summarize movement between encounters: "After subduing the
guards at the entrance to the underground research facility, you consult your omni-tool, which leads you through
miles of echoing corridors to a large arena with caged varren."

Sometimes it's important, though, to know how long it takes to get from one spot to another, whether the answer is in
days, hours, or minutes. The rules for determining travel time depend on two factors: the speed and travel pace of the
creatures moving and the terrain they're moving over.

### Speed <v-chip color="orange accent-2" text-color="black" class="v-chip--x-small">change</v-chip>
Every character and monster has a speed, which is the distance in meters that the character or monster can walk in 1 round.
This number assumes short bursts of energetic movement in the midst of a life-threatening situation. The following rules
determine how far a character or monster can move in a minute, an hour, or a day.

Mass Effect 5e uses meters instead of feet.
<p class="headline">5ft = 2m</p>
<p class="headline">On a playmat: 2m = 1 square</p>

### Travel Pace

While traveling, a group of operatives can move at a normal, fast, or slow pace, as shown on the Travel Pace table. The
table states how far the party can move in a period of time and whether the pace has any effect. A fast pace makes
characters less perceptive, while a slow pace makes it possible to sneak around and to search an area more carefully.

#### Forced March
The Travel Pace table assumes that characters travel for 8 hours in a day. They can push on beyond that limit, at the risk of exhaustion.

For each additional hour of travel beyond 8 hours, the characters cover the distance shown in the Hour column for their pace,
and each character must make a Constitution saving throw at the end of the hour. The DC is 10 + 1 for each hour past 8 hours.
On a failed saving throw, a character suffers one level of exhaustion.

#### Mounts and Vehicles
For short spans of time (up to an hour), many animals move much faster than humanoids. A mounted
character can ride at a gallop for about an hour, covering twice the usual distance for a fast pace. If fresh mounts are
available every 12 to 15 kilometers (8-10 miles), characters can cover larger distances at this pace, but this is very
rare except in densely populated areas.

Characters in transports choose a pace as normal. The __range__ statistic on transports indicates how far the transport can
travel in a 24 hour period for a _normal_ pace. If you're moving at a fast pace, you can double the range and half it for a
slow pace. Transports do not suffer exhaustion as a living mount would, but characters still need to pilot the vehicle.
In general, characters can only pilot vehicle for 16 hours at a time before needing to rest.

More details about traveling in transports and starships are provided in the <nuxt-link to="/phb/rules/vehicles">vehicles</nuxt-link> section.

<ai-dialog title="Travel Pace table" component="travel-pace"></ai-dialog>

### Difficult Terrain
The travel speeds given in the Travel Pace table assume relatively simple terrain: roads, open plains, or clear corridors.
But operatives can face dense forests, deep swamps, rubble-filled craters, steep mountains, and ice-covered ground -
all considered difficult terrain.

You move at half speed in difficult terrain - moving 1 meter in difficult terrain costs 2 meters of speed - so you can
cover only half the normal distance in a minute, an hour, or a day.

### Special Types of Movement
Movement through underground tunnels, skyscrapers, or wilderness areas often involves more than simply walking. Operatives
might have to climb, crawl, swim, or jump to get where they need to go.

#### Climbing, Swimming, and Crawling
While climbing or swimming, each meter of movement costs 1 extra meter (2 extra meters in difficult terrain), unless a
creature has a climbing or swimming speed. At the GM’s option, climbing a slippery vertical surface or one with few
handholds requires a successful Strength (Athletics) check. Similarly, gaining any distance in rough water might require
a successful Strength (Athletics) check.

#### Jumping <v-chip color="orange accent-2" text-color="black" class="v-chip--x-small">change</v-chip>
Your Strength determines how far you can jump.

__Long Jump__. When you make a long jump, you cover a number of meters up to your Strength score divided by three (rounded up)
if you move at least 4 meters on foot immediately before the jump. When you make a standing long jump, you can leap only half that distance.
Either way, each meter you clear on the jump costs a meter of movement.

This rule assumes that the height of your jump doesn't matter, such as a jump across a stream or chasm. At your GM's option,
you must succeed on a DC 10 Strength (Athletics) check to clear a low obstacle (no taller than a quarter of the jump's distance),
such as a hedge or low wall. Otherwise, you hit it.

When you land in difficult terrain, you must succeed on a DC 10 Dexterity (Acrobatics) check to land on your feet. Otherwise, you land prone.

__High Jump__. When you make a high jump, you leap into the air a number of meters equal to 1 + your Strength modifier divided by three
(rounded up) if you move at least 4m on foot immediately before the jump. When you make a standing high jump, you can
jump only half that distance. Either way, each meter you clear on the jump costs a meter of movement. In some circumstances,
your GM might allow you to make a Strength (Athletics) check to jump higher than you normally can.

You can extend your arms half your height above yourself during the jump. Thus, you can reach above you a distance equal
to the height of the jump plus 1 1/2 times your height.

#### +/- Gravity <v-chip color="secondary" text-color="white" class="v-chip--x-small">new</v-chip>
Operatives may find themselves in an environment with little, no, or increased gravity. For any increase (or decrease) that
is twice as more (or less) than your operatives normal working gravity, use the difficult terrain rules. I.e., if your
operative normally works in a 1g environment, and enters a .5g or 2g environment, they are considered to be in difficult terrain.

If you're in a low gravity environment, your long and high jump distances are doubled. Jump distances are halved in higher
gravity.

When in a 0g environment, your speed becomes 0, unless you have a means of propelling yourself. Additional rules, such as
disadvantage on Dexterity saving throws or melee attacks, are decided by the GM based on the context of your environment.

<source-reference pages="84-85"></source-reference>
