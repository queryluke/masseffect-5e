<template lang="pug">
  v-container
    h2.display-1.hidden-sm-and-down Random Loot Generator
    p.
      The Loot Generator uses random rolls on a set of loot tables to decide loot rewards. Our loot tables aren't as diverse as the ones
      found in the DMG. For example, individual loot tables currently supply only credits. Weapons, armor, and mods, can be acquired from the hoard
      loot tables.
    div.text-xs-center
      v-btn(color="primary" dark @click.stop="lootTableDialog = true") Raw Tables
    v-dialog(v-model="lootTableDialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable)
      v-card(tile)
        v-toolbar(card dark color="primary")
          v-btn(icon dark @click.native="lootTableDialog = false")
            v-icon close
          v-toolbar-title Raw Loot Tables
        v-card-text
          v-container(grid-list-lg fluid)
            v-layout(row wrap)
              v-flex(xs12 lg6)
                v-card
                  v-card-title(primaryTitle)
                    div.headline Individual rewards
                  v-card-text
                    table.table.alt-table.text-xs-left
                      thead
                        tr
                          th CR
                          th Reward
                      tbody
                        tr(v-for="cr in crOptions" v-bind:index="cr.value")
                          td {{ cr.text }}
                          td {{ individualRewards[cr.value][0] | groupDigits(',') }} - {{ individualRewards[cr.value][individualRewards[cr.value].length - 1] | groupDigits(',') }}
                v-card.mt-5
                  v-card-title(primaryTitle)
                    div.headline Hoard rewards
                  v-card-text
                    div(v-for="cr in crOptions" v-bind:index="cr.value").mt-3
                      p.title CR: {{ cr.text }}
                      ul.list
                        li #[strong Credits]: {{ hoardRewards[cr.value].credits }}
                        li #[strong Additional Credits]: {{ hoardRewards[cr.value].additionalCredits[0] | groupDigits(',') }} - {{ hoardRewards[cr.value].additionalCredits[hoardRewards[cr.value].additionalCredits.length - 1] | groupDigits(',') }}
                      table.table.alt-table.text-xs-left
                        thead
                          tr
                            th d100 roll
                            th Equipment Table Roll
                        tbody
                          tr(v-for="(reward, index) in hoardRewards[cr.value].itemRolls" v-bind:index="index")
                            td {{ reward.min }}-{{ reward.max }}
                            td {{ rollText(reward) }}
              v-flex(xs12 lg6)
                v-card
                  v-card-title(primaryTitle)
                    div.headline Equipment Tables
                  v-card-text
                    div(v-for="(table, id) in rewardTables" v-bind:index="id").mt-3
                      p.title Equipment Table {{ id.toUpperCase() }}
                      table.table.alt-table.text-xs-left
                        thead
                          tr
                            th d100 roll
                            th Equipment Table Roll
                        tbody
                          tr(v-for="(reward, index) in table" v-bind:index="index")
                            td {{ reward.min }}-{{ reward.max }}
                            td {{ reward.text }}
    v-card.mt-3
      v-card-text
        v-layout(row wrap)
          v-flex(xs12)
            p.display-1 Options
          v-flex(xs12).px-2.mb-2
            v-select(
              v-bind:items="crOptions"
              v-model="options.cr"
              label="Challenge Rating"
              single-line
              menu-props="bottom"
              hint="Challenge Rating"
              persistent-hint
            )
          v-flex(xs12).px-2
            v-checkbox(label="Hoard?" color="primary" v-model="options.hoard")
          v-flex(xs8 offset-xs2).mt-3
            v-btn(@click="getLoot()" block color="primary") Get Loot
    v-container(grid-list-md)
      v-layout(row wrap)
        v-flex(v-for="(loot, index) in loots" v-bind:key="index" xs12 sm6 md4 lg3)
          v-card
            v-card-title(primaryTitle)
              div.headline {{ loot.credits | groupDigits(',') }} credits
            v-card-text
              div(v-if="loot.thermalClips > 0 || loot.heavyWeapon > 0 || loot.omniGel > 0 || loot.grenades.length > 0 || loot.medigel.length > 0")
                div.subheading.grey--text.text--darken-1 Consumables
                span(v-if="loot.thermalClips > 0").pl-2 {{ loot.thermalClips }} thermal clips
                div(v-if="loot.heavyWeapon > 0").pl-2 {{ loot.heavyWeapon }} heavy weapon charges
                div(v-if="loot.omniGel > 0").pl-2 {{ loot.omniGel }} omni-gel
                div(v-if="loot.medigel.length > 0")
                  div.body-2 Medigel
                  span.pl-2 {{ loot.medigel.map((mg) => `${mg.count} ${mg.type}`).join(', ') }}
                div(v-if="loot.grenades.length > 0")
                  div.body-2 Grenades & Mines
                  span.pl-2 {{ loot.grenades.map((g) => `${g.count} ${g.grenade.name}`).join(', ') }}
              div(v-if="loot.weapons.length > 0").mt-2
                div.subheading.grey--text.text--darken-1 Weapons
                span.pl-2 {{ loot.weapons.map((weapon) => weapon.name).join(', ') }}
              div(v-if="loot.mods.filter((mod) => mod.hasOwnProperty('placement')).length > 0").mt-2
                div.subheading.grey--text.text--darken-1 Weapon Mods
                span.pl-2 {{ loot.mods.filter((mod) => mod.hasOwnProperty('placement')).map((mod) => mod.name).join(', ') }}
              div(v-if="loot.armor.length > 0").mt-2
                div.subheading.grey--text.text--darken-1 Armor Sets
                span.pl-2 {{ loot.armor.map((armor) => armor.name).join(', ') }}
              div(v-if="loot.mods.filter((mod) => !mod.hasOwnProperty('placement')).length > 0").mt-2
                div.subheading.grey--text.text--darken-1 Armor Mods
                span.pl-2 {{ loot.mods.filter((mod) => !mod.hasOwnProperty('placement')).map((mod) => mod.name).join(', ') }}
              div(v-if="loot.programs.length > 0").mt-2
                div.subheading.grey--text.text--darken-1 Omni-tool Programs
                span.pl-2 {{ loot.programs.map((program) => program.name).join(', ') }}
            v-card-actions
              v-btn(@click="removeLoot(index)" flat color="primary") #[v-icon(left) remove_circle] Remove
      v-layout(v-if="loots.length > 0")
        v-flex(xs8 offset-xs2).mt-3
          v-btn(@click="clearLoot()" block color="grey darken-3" dark) Clear All Loot
</template>

<script>
  import {RandomValue} from '~/mixins/randomValue'
  import grenades from '~/static/data/grenades'
  import weapons from '~/static/data/weapons'
  import armorSets from '~/static/data/armor_sets'
  import weaponMods from '~/static/data/weapon_mods'
  import armorMods from '~/static/data/armor_mods'
  import programs from '~/static/data/programs'

  export default {
    components: {},
    mixins: [RandomValue],
    data () {
      return {
        lootTableDialog: false,
        loots: [],
        workingLoot: {},
        cache: {},
        options: {
          hoard: false,
          individuals: 1,
          cr: 0
        },
        crOptions: [
          { text: '0-4', value: 0 },
          { text: '5-10', value: 1 },
          { text: '11-17', value: 2 },
          { text: '17+', value: 3 }
        ],
        individualRewards: [
          [10, 20, 30, 40, 50, 75, 100, 125, 150, 175, 200, 225, 275, 300, 325, 350, 375, 400, 450, 500],
          [500, 525, 550, 575, 600, 625, 650, 675, 700, 725, 750, 775, 800, 825, 850, 875, 900, 950, 1000, 1050],
          [1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2750, 3000, 3250, 3500],
          [3000, 3250, 3500, 3750, 4000, 4250, 4500, 4750, 5000, 5250, 5500, 5750, 6000, 6250, 6500, 6750, 7000, 8000, 9000, 10000]
        ],
        hoardRewards: [
          {
            credits: 3000,
            additionalCredits: [0, 1000, 1000, 1500, 1500, 2000, 2000, 2500, 2500, 3000, 3000, 3500, 3500, 4000, 4000, 4500, 4500, 5000, 6000, 7000],
            itemRolls: [
              { min: 1, max: 25, roll: null },
              { min: 26, max: 50, roll: 6, table: 'a' },
              { min: 51, max: 75, roll: 4, table: 'b' },
              { min: 76, max: 90, roll: 2, table: 'e' },
              { min: 91, max: 97, roll: 2, table: 'd' },
              { min: 98, max: 100, roll: 1, table: 'f' }
            ]
          },
          {
            credits: 10000,
            additionalCredits: [0, 1000, 3000, 6000, 9000, 12000, 14000, 16000, 18000, 20000, 22000, 24000, 26000, 28000, 30000, 32000, 34000, 36000, 38000, 40000],
            itemRolls: [
              { min: 1, max: 25, roll: null },
              { min: 26, max: 35, roll: 6, table: 'a' },
              { min: 36, max: 45, roll: 6, table: 'b' },
              { min: 46, max: 60, roll: 4, table: 'c' },
              { min: 61, max: 75, roll: 4, table: 'd' },
              { min: 76, max: 90, roll: 4, table: 'e' },
              { min: 91, max: 100, roll: 2, table: 'f' }
            ]
          },
          {
            credits: 50000,
            additionalCredits: [0, 1000, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 50000, 55000, 60000, 65000, 75000, 80000, 85000, 90000, 95000, 100000],
            itemRolls: [
              { min: 1, max: 15, roll: null },
              { min: 16, max: 30, roll: 6, table: 'b' },
              { min: 31, max: 45, roll: 6, table: 'c' },
              { min: 46, max: 60, roll: 4, table: 'd' },
              { min: 61, max: 70, roll: 4, table: 'e' },
              { min: 71, max: 85, roll: 4, table: 'f' },
              { min: 71, max: 90, roll: 4, table: 'g' },
              { min: 91, max: 100, roll: 1, table: 'h' }
            ]
          },
          {
            credits: 150000,
            additionalCredits: [0, 5000, 1000, 15000, 20000, 25000, 30000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000],
            itemRolls: [
              { min: 1, max: 5, roll: null },
              { min: 6, max: 15, roll: 8, table: 'c' },
              { min: 16, max: 25, roll: 8, table: 'd' },
              { min: 26, max: 30, roll: 8, table: 'f' },
              { min: 31, max: 50, roll: 4, table: 'g' },
              { min: 51, max: 65, roll: 6, table: 'g' },
              { min: 66, max: 80, roll: 8, table: 'g' },
              { min: 66, max: 95, roll: 4, table: 'h' },
              { min: 96, max: 100, roll: 6, table: 'h' }
            ]
          }
        ],
        rewardTables: {
          a: [
            { min: 1, max: 15, reward: () => this.addThOrHw('omniGel', this.randomAmount(0, 1, 4)), text: '1d4 omni-gel' },
            { min: 16, max: 35, reward: () => this.addMedigel(1, 'standard'), text: '1 standard medi-gel' },
            { min: 35, max: 50, reward: () => this.addGrenade(1), text: '1 random grenade' },
            { min: 51, max: 60, reward: () => this.addGrenade(2), text: '2 random grenades' },
            { min: 61, max: 80, reward: () => this.addWeapon('common'), text: '1 common weapon' },
            { min: 81, max: 95, reward: () => this.addProgram('uncommon'), text: '1 uncommon or lower omni-tool program' },
            { min: 96, max: 100, reward: () => this.addModOrArmor('mods', 0, 3000), text: '1 random armor or weapon mod worth 3,000 credits or less' }
          ],
          b: [
            { min: 1, max: 15, reward: () => this.addMedigel(1, 'enhanced'), text: '1 enhanced medi-gel' },
            { min: 16, max: 25, reward: () => this.addThOrHw('omniGel', this.randomAmount(1, 2, 4)), text: '2d4 + 1 omni-gel' },
            { min: 26, max: 44, reward: () => this.addGrenade(2), text: '2 random grenades' },
            { min: 55, max: 64, reward: () => this.addWeapon('common'), text: '1 common weapon' },
            { min: 65, max: 74, reward: () => this.addModOrArmor('mods', 0, 5000), text: '1 random armor or weapon mod worth 5,000 credits or less' },
            { min: 75, max: 84, reward: () => this.addProgram('uncommon'), text: '1 uncommon or lower omni-tool program' },
            { min: 75, max: 94, reward: () => this.addThOrHw('heavyWeapon', 3), text: '3 heavy weapon charges' },
            { min: 95, max: 100, reward: () => this.addWeapon('uncommon'), text: '1 uncommon weapon' }
          ],
          c: [
            { min: 1, max: 15, reward: () => this.addMedigel(1, 'enhanced'), text: '1 enhanced medi-gel' },
            { min: 16, max: 25, reward: () => this.addThOrHw('omniGel', this.randomAmount(2, 1, 8)), text: '1d8 + 2 omni-gel' },
            { min: 26, max: 35, reward: () => this.addProgram('uncommon'), text: '1 uncommon or lower omni-tool program' },
            { min: 36, max: 45, reward: () => this.addGrenade(3), text: '3 random grenades' },
            { min: 46, max: 60, reward: () => this.addWeapon('uncommon'), text: '1 uncommon weapon' },
            { min: 61, max: 73, reward: () => this.addModOrArmor('mods', 0, 10000), text: '1 random armor or weapon mod of 10,000 credits or less' },
            { min: 74, max: 85, reward: () => this.addThOrHw('heavyWeapon', 5), text: '5 heavy weapon charges' },
            { min: 86, max: 90, reward: () => this.addModOrArmor('armor', 0, 20000), text: '1 random armor set of 20,000 credits or less' },
            { min: 91, max: 100, reward: () => this.addMedigel(1, 'superior'), text: '1 superior medi-gel' }
          ],
          d: [
            { min: 1, max: 20, reward: () => this.addThOrHw('omniGel', this.randomAmount(1, 1, 6)), text: '1d6 + 1 omni-gel' },
            { min: 21, max: 40, reward: () => this.addProgram('rare'), text: '1 rare or lower omni-tool program' },
            { min: 41, max: 60, reward: () => this.addGrenade(3), text: '3 random grenades' },
            { min: 61, max: 70, reward: () => this.addMedigel(2, 'enhanced'), text: '2 enhanced medi-gel' },
            { min: 71, max: 80, reward: () => this.addThOrHw('heavyWeapon', 3), text: '3 heavy weapon charges' },
            { min: 81, max: 90, reward: () => this.addMedigel(2, 'superior'), text: '2 superior medi-gel' },
            { min: 91, max: 95, reward: () => this.addMedigel(1, 'ultimate'), text: '1 ultimate medi-gel' },
            { min: 96, max: 100, reward: () => this.addMedigel(2, 'ultimate'), text: '2 ultimate medi-gel' }
          ],
          e: [
            { min: 1, max: 10, reward: () => this.addWeapon('common'), text: '1 common weapon' },
            { min: 11, max: 40, reward: () => this.addWeapon('uncommon'), text: '1 uncommon weapon' },
            { min: 41, max: 60, reward: () => this.addProgram('rare'), text: '1 rare or lower omni-tool program' },
            { min: 61, max: 80, reward: () => this.addModOrArmor('mods', 0, 5000), text: '1 random armor or weapon mod of 5,000 credits or less' },
            { min: 81, max: 90, reward: () => this.addModOrArmor('mods', 0, 10000), text: '1 random armor or weapon mod of 10,000 credits or less' },
            { min: 91, max: 100, reward: () => this.addModOrArmor('armor', 0, 20000), text: '1 random armor set of 20,000 credits or less' }
          ],
          f: [
            { min: 1, max: 10, reward: () => this.addWeapon('uncommon'), text: '1 uncommon weapon' },
            { min: 11, max: 30, reward: () => this.addProgram('rare'), text: '1 rare or lower omni-tool program' },
            { min: 31, max: 60, reward: () => this.addWeapon('rare'), text: '1 rare weapon' },
            { min: 61, max: 80, reward: () => this.addModOrArmor('mods', 0, 10000), text: '1 random armor or weapon mod of 10,000 credits or less' },
            { min: 81, max: 90, reward: () => this.addModOrArmor('mods', 5000, 15000), text: '1 random 5,000 - 15,000 credit armor or weapon mod' },
            { min: 91, max: 100, reward: () => this.addModOrArmor('armor', 0, 30000), text: '1 random armor set of 30,000 credits or less' }
          ],
          g: [
            { min: 1, max: 30, reward: () => this.addWeapon('rare'), text: '1 rare weapon' },
            { min: 31, max: 60, reward: () => this.addWeapon('very rare'), text: '1 very rare weapon' },
            { min: 61, max: 70, reward: () => this.addProgram('very rare'), text: '1 very rare or lower omni-tool program' },
            { min: 71, max: 80, reward: () => this.addModOrArmor('mods', 5000, 15000), text: '1 random 5,000 - 15,000 credit armor or weapon mod' },
            { min: 81, max: 90, reward: () => this.addModOrArmor('mods', 15000, 30000), text: '1 random 15,000 - 30,000 credit armor or weapon mod' },
            { min: 91, max: 100, reward: () => this.addModOrArmor('armor', 20000, 40000), text: '1 random 20,000 - 40,000 armor set' }
          ],
          h: [
            { min: 1, max: 10, reward: () => this.addWeapon('rare'), text: '1 rare weapon' },
            { min: 11, max: 35, reward: () => this.addWeapon('very rare'), text: '1 very rare weapon' },
            { min: 36, max: 60, reward: () => this.addProgram('legendary'), text: '1 legendary or lower omni-tool program' },
            { min: 61, max: 80, reward: () => this.addModOrArmor('mods', 15000, 100000000000), text: '1 random armor or weapon mod of 15,000 credits or more' },
            { min: 81, max: 100, reward: () => this.addModOrArmor('armor', 30000, 100000000000), text: '1 random armor set of 30,000 credits or more' }
          ]
        }
      }
    },
    created () {
      this.cache.grenades = grenades
      this.cache.weapons = weapons
      this.cache.armor = armorSets
      this.cache.mods = weaponMods.concat(armorMods)
      this.cache.programs = programs
    },
    head () {
      return {
        title: 'Loot Generator - GM Tools | Mass Effect 5e',
        meta: [
          { id: 'description', name: 'description', content: 'A quick and easy way to decide loot.' }
        ]
      }
    },
    layout: 'phb',
    methods: {
      rollText (itemRoll) {
        if (!itemRoll.roll) {
          return 'Nothing extra'
        }
        const die = itemRoll.roll === 1 ? 1 : `1d${itemRoll.roll}`
        const plural = itemRoll.roll === 1 ? '' : 's'
        return `Roll ${die} time${plural} on Equipment Table ${itemRoll.table.toUpperCase()}`
      },
      addMedigel (count, type) {
        const existingType = this.workingLoot.medigel.find((mg) => mg.type === type)
        if (existingType) {
          existingType.count += count
        } else {
          this.workingLoot.medigel.push({type, count})
        }
      },
      addThOrHw (type, count) {
        this.workingLoot[type] += count
      },
      addGrenade (count) {
        const grenade = this.randomValue(this.cache.grenades)
        const existingGrenade = this.workingLoot.grenades.find((g) => g.grenade.id === grenade.id)
        if (existingGrenade) {
          existingGrenade.count += count
        } else {
          this.workingLoot.grenades.push({count, grenade})
        }
      },
      addWeapon (rarity) {
        const availableWeapons = this.cache.weapons.filter((weapon) => weapon.rarity.toLowerCase() === rarity.toLowerCase())
        this.workingLoot.weapons.push(this.randomValue(availableWeapons))
      },
      addModOrArmor (itemType, minCost, maxCost) {
        const availableItems = this.cache[itemType].filter((item) => {
          const itemCost = parseInt(item.cost)
          const excludedItems = ['stock_light_armor', 'stock_medium_armor', 'stock_heavy_armor']
          return itemCost >= minCost && itemCost <= maxCost && !excludedItems.includes(item.id)
        })
        this.workingLoot[itemType].push(this.randomValue(availableItems))
      },
      addProgram (maxRarity) {
        const rarities = ['legendary', 'very rare', 'rare', 'uncommon', 'common']
        const availableRarities = rarities.splice(rarities.indexOf(maxRarity))
        const availablePrograms = this.cache.programs.filter(item => availableRarities.includes(item.rarity))
        this.workingLoot.programs.push(this.randomValue(availablePrograms))
      },
      clearLoot () {
        this.loots = []
      },
      getLoot () {
        this.workingLoot = this.loot()
        if (this.options.hoard) {
          this.getHoardLoot()
        } else {
          for (let i = 1; i <= this.options.individuals; i++) {
            this.getIndividualLoot()
          }
        }
        this.loots.push(JSON.parse(JSON.stringify(this.workingLoot)))
      },
      getHoardLoot () {
        const hoardTier = this.hoardRewards[this.options.cr]
        this.workingLoot.credits += hoardTier.credits
        this.workingLoot.credits += this.randomValue(hoardTier.additionalCredits)
        const hoardTierRoll = this.randomRoll(100)
        const itemReward = hoardTier.itemRolls.find((ir) => {
          return ir.min <= hoardTierRoll && ir.max >= hoardTierRoll
        })
        if (!itemReward) {
          console.log('something went terribly wrong')
          return
        }
        if (itemReward.roll) {
          const numRolls = this.randomRoll(itemReward.roll)
          console.log(`rolling ${numRolls} times on table ${itemReward.table}`)
          let reward = null
          let itemTableRoll = 1
          for (let i = 1; i <= numRolls; i++) {
            itemTableRoll = this.randomRoll(100)
            console.log(`roll # ${i} is ${itemTableRoll}`)
            reward = this.rewardTables[itemReward.table].find((reward) => {
              return reward.min <= itemTableRoll && reward.max >= itemTableRoll
            })
            if (!reward) {
              console.log('could not find reward')
              continue
            }
            reward.reward()
          }
        }
      },
      getIndividualLoot () {
        this.workingLoot.credits += this.randomValue(this.individualRewards[this.options.cr])
      },
      loot () {
        return {
          credits: 0,
          thermalClips: 0,
          heavyWeapon: 0,
          omniGel: 0,
          medigel: [],
          grenades: [],
          weapons: [],
          armor: [],
          mods: [],
          programs: []
        }
      },
      randomAmount (flat, numRolls, max) {
        let amount = flat
        for (let i = 0; i < numRolls; i++) {
          amount += this.randomRoll(max)
        }
        console.log(amount)
        return amount
      },
      randomRoll (max) {
        return Math.floor(Math.random() * max) + 1
      },
      removeLoot (index) {
        this.loots.splice(index, 1)
      }
    }
  }
</script>
