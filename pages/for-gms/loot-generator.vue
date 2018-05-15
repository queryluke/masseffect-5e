<template lang="pug">
  v-container
    h2.display-3 Random Loot Generator
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
              bottom
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
              div(v-if="loot.thermalClips > 0 || loot.heavyWeapon > 0")
                div.subheading.grey--text.text--darken-1 Ammo
                span(v-if="loot.thermalClips > 0").pl-2 {{ loot.thermalClips }} thermal clips
                div(v-if="loot.heavyWeapon > 0").pl-2 {{ loot.heavyWeapon }} heavy weapon charges
              div(v-if="loot.medigel.length > 0")
                div.subheading.grey--text.text--darken-1 Medigel
                span.pl-2 {{ loot.medigel.map((mg) => `${mg.count} ${mg.type}`).join(', ') }}
              div(v-if="loot.grenades.length > 0")
                div.subheading.grey--text.text--darken-1 Grenades & Mines
                span.pl-2 {{ loot.grenades.map((g) => `${g.count} ${g.grenade.name}`).join(', ') }}
              div(v-if="loot.weapons.length > 0")
                div.subheading.grey--text.text--darken-1 Weapons
                span.pl-2 {{ loot.weapons.map((weapon) => weapon.name).join(', ') }}
              div(v-if="loot.mods.filter((mod) => mod.hasOwnProperty('placement')).length > 0")
                div.subheading.grey--text.text--darken-1 Weapon Mods
                span.pl-2 {{ loot.mods.filter((mod) => mod.hasOwnProperty('placement')).map((mod) => mod.name).join(', ') }}
              div(v-if="loot.armor.length > 0")
                div.subheading.grey--text.text--darken-1 Armor Sets
                span.pl-2 {{ loot.armor.map((armor) => armor.name).join(', ') }}
              div(v-if="loot.mods.filter((mod) => !mod.hasOwnProperty('placement')).length > 0")
                div.subheading.grey--text.text--darken-1 Armor Mods
                span.pl-2 {{ loot.mods.filter((mod) => !mod.hasOwnProperty('placement')).map((mod) => mod.name).join(', ') }}
            v-card-actions
              v-btn(@click="removeLoot(index)" flat color="primary") #[v-icon(left) remove_circle] Remove
      v-layout(v-if="loots.length > 0")
        v-flex(xs8 offset-xs2).mt-3
          v-btn(@click="clearLoot()" block color="grey darken-3" dark) Clear All Loot
</template>

<script>
  import {mapGetters} from 'vuex'
  import {RandomValue} from '~/mixins/randomValue'

  export default {
    components: {},
    created () {
      this.cache.grenades = this.getData('grenades')
      this.cache.weapons = this.getData('weapons')
      this.cache.armor = this.getData('armorSets')
      this.cache.mods = this.getData('weaponMods').concat(this.getData('armorMods'))
    },
    computed: {
      ...mapGetters(['getData'])
    },
    data () {
      return {
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
          [10, 50, 200, 350, 500],
          [500, 600, 700, 800, 900, 1000],
          [1000, 1500, 2000, 3000],
          [3000, 4500, 6000]
        ],
        hoardRewards: [
          {
            credits: 3000,
            additionalCredits: [0, 1000, 1000, 1500, 1500, 2000, 2000, 2500, 2500, 3000, 3000, 3500, 3500, 4000, 4000, 4500, 4500, 5000, 6000, 7000],
            itemRolls: [
              { min: 1, max: 25, roll: null },
              { min: 26, max: 50, roll: 6, table: 'a' },
              { min: 51, max: 75, roll: 4, table: 'b' },
              { min: 76, max: 90, roll: 1, table: 'e' },
              { min: 91, max: 97, roll: 1, table: 'd' },
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
              { min: 91, max: 100, roll: 1, table: 'f' }
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
              { min: 16, max: 25, roll: 6, table: 'd' },
              { min: 26, max: 30, roll: 6, table: 'f' },
              { min: 31, max: 50, roll: 4, table: 'g' },
              { min: 51, max: 65, roll: 6, table: 'g' },
              { min: 66, max: 80, roll: 1, table: 'h' },
              { min: 66, max: 95, roll: 4, table: 'h' },
              { min: 96, max: 100, roll: 6, table: 'h' }
            ]
          }
        ],
        rewardTables: {
          a: [
            { min: 1, max: 25, reward: () => this.addThOrHw('thermalClips', 10) },
            { min: 26, max: 50, reward: () => this.addMedigel(1, 'standard') },
            { min: 51, max: 70, reward: () => this.addGrenade(1) },
            { min: 71, max: 80, reward: () => this.addGrenade(2) },
            { min: 81, max: 90, reward: () => this.addWeapon('common') },
            { min: 90, max: 95, reward: () => this.addMedigel(1, 'enhanced') },
            { min: 96, max: 100, reward: () => this.addModOrArmor('mods', 0, 3000) }
          ],
          b: [
            { min: 1, max: 15, reward: () => this.addMedigel(1, 'enhanced') },
            { min: 16, max: 54, reward: () => this.addGrenade(2) },
            { min: 55, max: 64, reward: () => this.addWeapon('common') },
            { min: 65, max: 77, reward: () => this.addModOrArmor('mods', 0, 5000) },
            { min: 78, max: 90, reward: () => this.addThOrHw('heavyWeapon', 3) },
            { min: 91, max: 100, reward: () => this.addWeapon('uncommon') }
          ],
          c: [
            { min: 1, max: 15, reward: () => this.addMedigel(1, 'enhanced') },
            { min: 16, max: 45, reward: () => this.addGrenade(3) },
            { min: 46, max: 60, reward: () => this.addWeapon('uncommon') },
            { min: 61, max: 73, reward: () => this.addModOrArmor('mods', 0, 10000) },
            { min: 74, max: 85, reward: () => this.addThOrHw('heavyWeapon', 5) },
            { min: 86, max: 90, reward: () => this.addModOrArmor('armor', 0, 20000) },
            { min: 91, max: 100, reward: () => this.addMedigel(1, 'superior') }
          ],
          d: [
            { min: 1, max: 20, reward: () => this.addMedigel(2, 'standard') },
            { min: 21, max: 40, reward: () => this.addMedigel(2, 'enhanced') },
            { min: 41, max: 60, reward: () => this.addGrenade(3) },
            { min: 61, max: 80, reward: () => this.addThOrHw('heavyWeapon', 3) },
            { min: 81, max: 90, reward: () => this.addMedigel(2, 'superior') },
            { min: 91, max: 95, reward: () => this.addMedigel(1, 'ultimate') },
            { min: 96, max: 100, reward: () => this.addMedigel(1, 'ultimate') }
          ],
          e: [
            { min: 1, max: 30, reward: () => this.addWeapon('common') },
            { min: 31, max: 60, reward: () => this.addWeapon('uncommon') },
            { min: 61, max: 80, reward: () => this.addModOrArmor('mods', 0, 5000) },
            { min: 81, max: 90, reward: () => this.addModOrArmor('mods', 0, 10000) },
            { min: 91, max: 100, reward: () => this.addModOrArmor('armor', 0, 20000) }
          ],
          f: [
            { min: 1, max: 30, reward: () => this.addWeapon('uncommon') },
            { min: 31, max: 60, reward: () => this.addWeapon('rare') },
            { min: 61, max: 80, reward: () => this.addModOrArmor('mods', 0, 10000) },
            { min: 81, max: 90, reward: () => this.addModOrArmor('mods', 5000, 15000) },
            { min: 91, max: 100, reward: () => this.addModOrArmor('armor', 0, 30000) }
          ],
          g: [
            { min: 1, max: 30, reward: () => this.addWeapon('rare') },
            { min: 31, max: 60, reward: () => this.addWeapon('very rare') },
            { min: 61, max: 80, reward: () => this.addModOrArmor('mods', 5000, 15000) },
            { min: 81, max: 90, reward: () => this.addModOrArmor('mods', 15000, 30000) },
            { min: 91, max: 100, reward: () => this.addModOrArmor('armor', 20000, 40000) }
          ],
          h: [
            { min: 1, max: 10, reward: () => this.addWeapon('rare') },
            { min: 11, max: 45, reward: () => this.addWeapon('very rare') },
            { min: 46, max: 75, reward: () => this.addModOrArmor('mods', 15000, 100000000000) },
            { min: 76, max: 100, reward: () => this.addModOrArmor('armor', 30000, 100000000000) }
          ]
        }
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | GM Tools - Loot Generator',
        meta: [
          { id: 'description', name: 'description', content: 'A quick and easy way to decide loot.' }
        ]
      }
    },
    layout: 'phb',
    methods: {
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
        console.log(this.workingLoot)
      },
      getIndividualLoot () {
        this.workingLoot.credits += this.randomValue(this.individualRewards[this.options.cr])
      },
      loot () {
        return {
          credits: 0,
          thermalClips: 0,
          heavyWeapon: 0,
          medigel: [],
          grenades: [],
          weapons: [],
          armor: [],
          mods: []
        }
      },
      randomRoll (max) {
        return Math.floor(Math.random() * max) + 1
      },
      removeLoot (index) {
        this.loots.splice(index, 1)
      }
    },
    mixins: [RandomValue]
  }
</script>
