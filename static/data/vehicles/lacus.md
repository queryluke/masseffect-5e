---
name: Lacus-class Frigate
vehicle:
  type: starship
size: frigate
ac: 15
hp: 1500
sp: 500
speed: 2
range: 10 ftlu
crew:
  min: 4
  max: 10
cargo: 30
systems:
  - type: Helm
    crew: 1
  - type: combined
    crew: 1
    systems:
      - Navigation
      - SCC
  - type: Weapons
    crew: 1
  - type: Drive
    crew: 1
weapons:
  - name: Anti-Fighter Machine Cannons
    damage: 250 (1d4[x100]) piercing damage.
  - name: Disruptor Torpedoes (10 charges)
    damage: 350 (1d6[x100]) thunder damage and 350 (1d6[x100]) force damage. This damage bypasses shields.
cr: 14+
cost: 800000
---

The Lacus-class is a transport frigate with high cargo capacity and range. In recent years, savvy engineers have
learned to install additional systems in its cargo space, making it highly modifiable.

__Additional Systems__: The Lacus-class frigate has 10 open additional system slots. When installing a slot,
reduce the cargo capacity by 2.
