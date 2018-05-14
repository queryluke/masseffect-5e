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
              p.headline {{ loot.credits | groupDigits(',') }} credits
              div(v-if="loot.thermalClips > 0") {{ loot.thermalClips }} thermal clips
              div(v-if="loot.heavyWeapon > 0") {{ loot.heavyWeapon }} heavy weapon charges
              div(v-if="loot.medigel.length > 0")
                div.subheading Medigel
                span.grey--text {{ loot.medigel.map((count, type) => `${count} ${type}`).join(',') }}
              div(v-if="loot.grenades.length > 0")
                div.subheading Grenades & Mines
                span.grey--text {{ loot.grenades.map((count, type) => `${count} ${type}`).join(',') }}
              div(v-if="loot.weapons.length > 0")
                div.subheading Weapons
                span.grey--text {{ loot.weapons.map((weapons) => weapon.name).join(',') }}
              div(v-if="loot.mods.filter((mod) => mod.hasOwnProperty('placement')).length > 0")
                div.subheading Weapon Mods
                span.grey--text {{ loot.mods.filter((mod) => mod.hasOwnProperty('placement')).map((mod) => mod.name).join(',') }}
              div(v-if="loot.armor.length > 0")
                div.subheading Armor Sets
                span.grey--text {{ loot.armor.map((armor) => armor.name).join(',') }}
              div(v-if="loot.mods.filter((mod) => !mod.hasOwnProperty('placement')).length > 0")
                div.subheading Armor Mods
                span.grey--text {{ loot.mods.filter((mod) => !mod.hasOwnProperty('placement')).map((mod) => mod.name).join(',') }}
</template>

<script>
  import {mapGetters} from 'vuex'
  import {RandomValue} from '~/mixins/randomValue'

  // Have a clear button to remove all loots
  // Have individual deletes

  export default {
    components: {},
    created () {
      this.cache.grenades = this.getData('grenades_mines')
      this.cache.weapons = this.getData('weapons')
      this.cache.armor = this.getData('armor_sets')
      const mods = []
      mods.push(this.getData('weapon_mods'))
      mods.push(this.getData('armor_mods'))
      this.cache.mods = mods
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
              { min: 26, max: 50, roll: '6-a' },
              { min: 51, max: 75, roll: '4-b' },
              { min: 76, max: 90, roll: '1-e' },
              { min: 91, max: 97, roll: '1-d' },
              { min: 98, max: 100, roll: '1-f' }
            ]
          },
          {
            credits: 10000,
            additionalCredits: [0, 1000, 3000, 6000, 9000, 12000, 14000, 16000, 18000, 20000, 22000, 24000, 26000, 28000, 30000, 32000, 34000, 36000, 38000, 40000],
            itemRolls: [
              { min: 1, max: 25, roll: null },
              { min: 26, max: 35, roll: '6-a' },
              { min: 36, max: 45, roll: '6-b' },
              { min: 46, max: 60, roll: '4-c' },
              { min: 61, max: 75, roll: '4-d' },
              { min: 76, max: 90, roll: '4-e' },
              { min: 91, max: 100, roll: '1-f' }
            ]
          },
          {
            credits: 50000,
            additionalCredits: [0, 1000, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 50000, 55000, 60000, 65000, 75000, 80000, 85000, 90000, 95000, 100000],
            itemRolls: [
              { min: 1, max: 15, roll: null },
              { min: 16, max: 30, roll: '6-b' },
              { min: 31, max: 45, roll: '6-c' },
              { min: 46, max: 60, roll: '4-d' },
              { min: 61, max: 70, roll: '4-e' },
              { min: 71, max: 85, roll: '1-f' },
              { min: 71, max: 90, roll: '4-f' },
              { min: 91, max: 100, roll: '1-g' }
            ]
          },
          {
            credits: 150000,
            additionalCredits: [0, 5000, 1000, 15000, 20000, 25000, 30000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000],
            itemRolls: [
              { min: 1, max: 5, roll: null },
              { min: 6, max: 15, roll: '8-c' },
              { min: 16, max: 25, roll: '6-d' },
              { min: 26, max: 30, roll: '6-e' },
              { min: 31, max: 50, roll: '4-f' },
              { min: 51, max: 65, roll: '1-g' },
              { min: 66, max: 80, roll: '4-g' },
              { min: 66, max: 95, roll: '1-h' },
              { min: 96, max: 100, roll: '4-h' }
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
            { min: 96, max: 100, reward: () => this.addModOrArmor('mod', 0, 3000) }
          ],
          b: [
            { min: 1, max: 15, reward: () => this.addMedigel(1, 'enhanced') },
            { min: 16, max: 54, reward: () => this.addGrenade(2) },
            { min: 55, max: 64, reward: () => this.addWeapon('common') },
            { min: 65, max: 77, reward: () => this.addModOrArmor('mod', 0, 5000) },
            { min: 78, max: 90, reward: () => this.addThOrHw('heavyWeapon', 3) },
            { min: 91, max: 100, reward: () => this.addWeapon('uncommon') }
          ],
          c: [
            { min: 1, max: 15, reward: () => this.addMedigel(1, 'enhanced') },
            { min: 16, max: 45, reward: () => this.addGrenade(3) },
            { min: 46, max: 60, reward: () => this.addWeapon('uncommon') },
            { min: 61, max: 73, reward: () => this.addModOrArmor('mod', 0, 10000) },
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
            { min: 61, max: 80, reward: () => this.addModOrArmor('mod', 0, 5000) },
            { min: 81, max: 90, reward: () => this.addModOrArmor('mod', 0, 10000) },
            { min: 91, max: 100, reward: () => this.addModOrArmor('armor', 0, 20000) }
          ],
          f: [
            { min: 1, max: 30, reward: () => this.addWeapon('uncommon') },
            { min: 31, max: 60, reward: () => this.addWeapon('rare') },
            { min: 61, max: 80, reward: () => this.addModOrArmor('mod', 0, 10000) },
            { min: 81, max: 90, reward: () => this.addModOrArmor('mod', 5000, 15000) },
            { min: 91, max: 100, reward: () => this.addModOrArmor('armor', 0, 30000) }
          ],
          g: [
            { min: 1, max: 30, reward: () => this.addWeapon('rare') },
            { min: 31, max: 60, reward: () => this.addWeapon('very rare') },
            { min: 61, max: 80, reward: () => this.addModOrArmor('mod', 5000, 15000) },
            { min: 81, max: 90, reward: () => this.addModOrArmor('mod', 15000, 30000) },
            { min: 91, max: 100, reward: () => this.addModOrArmor('armor', 20000, 40000) }
          ],
          h: [
            { min: 1, max: 10, reward: () => this.addWeapon('rare') },
            { min: 11, max: 45, reward: () => this.addWeapon('very rare') },
            { min: 46, max: 75, reward: () => this.addModOrArmor('mod', 15000, 100000000000) },
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
        if (this.workingLoot.medigel[type]) {
          this.workingLoot.medigel[type] += count
        } else {
          this.workingLoot.medigel[type] = count
        }
      },
      addThOrHw (type, count) {
        this.workingLoot[type] += count
      },
      addGrenade (count) {
        const grenade = this.randomValue(this.cache.grenades)
        if (this.workingLoot.grenades[grenade.name]) {
          this.workingLoot.grenades[grenade.name] += count
        } else {
          this.workingLoot.grenades[grenade.name] = count
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
      getLoot () {
        this.workingLoot = this.loot()
        if (this.hoard) {
          this.getHoardLoot()
        } else {
          for (let i = 1; i <= this.options.individuals; i++) {
            this.getIndividualLoot()
          }
        }
        this.loots.push(JSON.parse(JSON.stringify(this.workingLoot)))
      },
      getHoardLoot () {

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
      }
    },
    mixins: [RandomValue]
  }
</script>
