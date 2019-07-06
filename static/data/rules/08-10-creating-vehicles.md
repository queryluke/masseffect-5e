---
length: 794
title: 'Creating New Vehicles'
---

The Vehicle List above provides a short list of vehicle examples for you to use in your campaign. However, it is
encouraged that you and/or your GM create vehicles of their own to use in your campaign. Use the following guidelines
when creating your vehicle.

### Create a concept
First, you'll want to create a concept for your vehicle. What is its main purpose (defense, offense, transport, smuggling, etc)?
What race(s) are associated with the vehicle? Is it unique or mass produced? What does it look like? What size is it?

If you're looking for inspiration, check out <a href="https://www.deviantart.com/euderion/gallery/40849119/MASS-EFFECT" target="_blank">Euderion's vehicle creations on DeviantArt</a>.

### Name
Next, you'll need a good name for your vehicle. Mass produced vehicles typically have some sort of manufacturing number
combined with a codename or nickname. If your vehicle is a unique creation, it might have a symbolic name.

### Vehicle Type
The vehicle type should be either __transport__ or __starship__. If you've selected transport, designate which
transport type it is: __land__, __sea__, __air__, or __space__. Some transports can have multiple types.

### Size
If you're creating a transport, choose the size from standard sizes: Medium, Large, Huge, Gargantuan. For starships,
choose one of Frigate, Cruiser, Carrier, or Dreadnought.

### Speed
A vehicles speed is somewhat abstract. Mechanically, it represents the number of playmat spaces it can move in one turn.
This assumes the vehicle is moving an average pace and slow enough to turn and maneuver. Speed should range from 1 to 15.

### Range
For transports, range is the number of kilometers the vehicle can travel within 24 hours. This calculation should also
take its battery or fuel capacity into account.

For starships, the range is calculated as ftlu (faster than light units). Essentially how many Mass Effect Relay jumps
or system to system travel it can complete in 24 hours.

### Cargo
How many tonnes can the ship carry? Try thinking about how many mid-size cars can fit into the vehicle or the vehicle tow,
this is its Cargo capacity.

### Cost
What is the market rate of the vehicle? It might be that the vehicle is military and not sold on the open market.

### AC
How durable is your vehicle's armor? Or how difficult is it to hit? ACs for vehicles generally range from 10 - 25.

### HP & SP
Use the following table to find the average hull points and shield points. You should adjust the average based on the
concept of your vehicle. Was it made for defense? Add more HP. Does it has a state-of-the-art drive, add more SP.

<div class="markdown-content">

Type | HP | SP
--- | --- | ---
Transport | 150 | 50
Frigate | 1200 | 250
Cruiser | 2000 | 500
Carrier | 3500 | 750
Dreadnought | 6000 | 1500

</div>

<br>

### Systems
Next, you'll want to decide how many systems your vehicle has. You can either make combined systems (for smaller vehicles)
or have individual systems (for large starships). A system might be so advanced that it requires multiple crew member to
maintain.

### Crew

#### Minimum
To find the minimum crew, add the number of crew needed for each of the systems.

#### Maximum
The maximum crew is generally based on the size of the vehicle

<div class="markdown-content">

Type | Max Crew
--- | ---
Medium | 1
Large | 2-3
Huge | 6-8
Gargantuan | 10-20
Frigate | 20-30
Cruiser | 30-100
Carrier | 100-1000
Dreadnought | 1000+

</div>

<br>

### Weapons

Decide what weapons are equipped on the vehicle. For transports, damage rolls are multiplied by 10 and by 100 for
starships. It's also ok for the vehicle to have no weapons.

### CR

To calculate the CR, you'll need access to the Monster Statistics by Challenge Rating table in the Dungeon Master's
Guide, pg. 274.

#### Offensive CR
First, find the offensive CR by calculating the average of all the damaging attacks. If this is a starship, additionally
divide the average by 10. Then find the CR associated with that damage on the Monster Stats table.

#### Defensive CR
Next, find the defensive CR by adding the hull point and shield points together. If this is a starship, additionally,
divide the sum by 10. Then find the CR associated with that hit point value on the Monster Stats table. If the AC
is greater than the AC on the Monster Stats table, increase the defensive CR by 1 for every 2 points above the target AC.

#### Final CR
The final CR is the average of the offensive and defensive CR, rounded up. If this is for a starship, notate a __+__ symbol
beside the CR.

#### Transport example:
- AC: 20
- HP: 250
- SP: 0
- Attacks: 35 & 55

__Offensive CR = (35 + 55) / 2 = 45__, corresponds with a CR of 7

__Defensive CR = 250 + 0 = 250__, corresponds with a CR of 12. However, the target AC for CR 12 is only 17. So the final Defensive
CR becomes 13 (+1 because the AC is 20).

__Final CR = (13 + 7) / 2 = 10__

#### Starship example:
- AC: 25
- HP: 2500
- SP: 600
- Attack: 1100 & 900

__Offensive CR = ((1100 + 900) / 2) / 10 = 100__, corresponds with a CR of 16

__Defensive CR = (2500 + 600) / 10 = 310__, corresponds with a CR of 16. However, the target AC for CR 16 is only 18. So the final Defensive
CR becomes 19 (+3 because the AC is 25).

__Final CR = (16 + 19) / 2 = 17.5 = 18+__

### Additional Details
Finally, write a short description about your vehicle and notate if it has any special abilities, additional systems,
or available system slots.

### Share with Us!

If you'd like to have your creation added, feel free to share it with us! Check out the
<nuxt-link to="/contributing">contributing section</nuxt-link> for more details.
