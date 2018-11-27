---
length: 794
title: 'Travel'
---

<galaxy-map :height="$vuetify.breakpoint.smAndDown ? '80vw' : '50vw'"/>

### The Milky Way
The Milky Way comprises a number of __Clusters__ (represented by the yellow, target icons <v-icon>filter_center_focus</v-icon> on the map).
Each Cluster is composed of __Systems__, and, in turn, each System contains a group of planetary objects (generally a
star and any number of planets and their moons, planetoids, asteroids, comets and other celestial bodies).

For example, Earth is a planet in the Sol System, which is the only system in the Local Cluster. Tuchanka (the homeworld 
of the Krogan) is part of the Aralakh System, which is one of 3 systems in the Krogan DMZ cluster.

__Note on names__: You may wonder why the names aren’t more “alien”. Our best guess is that the names are either part 
of a human-centered database (in which names were provided to the entries by humans), or that the names have been 
translated into similar human-cultured counterparts. For example, the Athena Nebula is home of the Asari, a race of 
androgynous beings that associate themselves to a female gender. Thus the nebula’s name (in Asari) might be a cultural 
figure, turn-of-phase, or mystical entity that is best represented as Athena in human culture.

### Traveling between clusters, systems, and planets

<br>

#### Space Transports
There four types of transports in the game: land, water, air, and space. To leave a planet or move between planets in a 
system requires a space transport. For simplicity's sake, travel within a system (from any celestial body to 
another) takes less than 24 hours. Using the Sol system as an example, a party could leave Earth and arrive at Io, 
Europa, Pluto, or Sol’s Mass Relay within 24 hours. The GM can adjust this time as they see fit. A rickety ship 
might move more slowly and require many stops at moons and planets along the way. A very fast ship might make the 
journey from Earth to Pluto within a few hours.

#### Leaving a planet
The time it takes to leave a planet varies widely based on how regulated space traffic is on that planet. On urban worlds
like Thessia or the Citadel, it can take as long as 2-4 hours to orbit and dock. On uninhabited worlds, your ship can 
land and leave as quickly as the pilot is capable. This can take as little as a few minutes. Finding a safe place to 
land might take a little longer.

#### Starships
To travel from system to system, or cluster to cluster, your party will need to use a starship. Every 
starship has a __range__ attribute which represents the number of system and cluster jumps it can make in a 24 
hour period. Traveling between systems in a cluster or jumping from one cluster to another takes 1 range.

Traveling between systems is the same as traveling between planets. You can move to any other system within a cluster
and it costs 1 range. A starship with 3 range that starts on Tuchanka can leave the planet an arrive in
Nith (another system in the Krogan DMZ cluster) within 24 hours. The same starship (with a range of 3) could also leave
Turchanka, fly to the Nith system, then to the Dranek system (also in the Krogan DMZ cluster), and back to the
Aralakh system within a 24 hour period. If the ship was making stops on planets in each system, it would likely take
longer as the ship enters and leaves orbit.

Traveling between clusters requires a __Mass Relay__. Mass Relays are mass transit devices scattered throughout the
Milky Way, forming an enormous network that allows interstellar travel. There is only one Mass Relay per cluster, located
in a single system which is marked with a * on the map. To travel from cluster to cluster, you must first travel to
the system that contains the mass effect relay. Then you can jump to another cluster.

Mass Relays are connected as a network, but travel between relays might require additional jumps. I.e., unlike travel
between planets and systems, you can only move between clusters following the lines on the map.

<v-alert type="info" :value="true">

__EXAMPLE TRAVEL__

The party has been searching for a Prothean device in the Carbonaceous Asteroid (_Phoenix system, Argos Rho cluster_).
To collect their reward, they must return the device to a fence on the Citadel.

In this example, the party has requisitioned a starship with a range of 2. It takes 1 range to move from the
Phoenix system to the Hydra system which contains the Mass Relay for the Argos Rho cluster. Then it requires 2 Mass
Relay jumps (Argos Rho > Horse Head Nebula > Serpent Nebula), arriving in the Widow system where the Citadel is located.
For our group, this would take as little as 24 but no more than 48 hours to complete the journey.

</v-alert>
