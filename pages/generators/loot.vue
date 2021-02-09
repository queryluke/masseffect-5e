<template>
  <v-container>
    <me-page-title />
    <p>
      The Loot Generator uses random rolls on a set of loot tables to decide loot rewards. Our loot tables aren't as diverse as the ones
      found in the DMG. For example, individual loot tables currently supply only credits. Weapons, armor, and mods, can be acquired from the hoard
      loot tables.
    </p>
    <div class="text-center">
      <v-btn color="primary" @click.stop="lootTableDialog = true">
        Raw Tables
      </v-btn>
    </div>
    <!-- START: LOOT TABLES -->
    <v-dialog
      v-model="lootTableDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card tile>
        <v-toolbar card dark color="primary">
          <v-toolbar-title>
            Raw loot Tables
          </v-toolbar-title>
          <v-spacer />
          <v-btn icon dark @click.native="lootTableDialog = false">
            <v-icon>
              mdi_close
            </v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col cols="12" lg="6">
              <me-loot-group title="Individual Rewards">
                <me-loot-table
                  :table-headers="['CR', 'Reward']"
                  :table-data="individualRewardsData"
                />
              </me-loot-group>
              <me-loot-group title="Hoard Rewards">
                <me-loot-table
                  v-for="cr in crOptions"
                  :key="cr.value"
                  :table-headers="['1d100', 'Equipment Table Roll']"
                  :table-data="hoardRewards[cr.value].itemRolls.map(i => [`${i.min}-${i.max}`,rollText(i)])"
                >
                  <template v-slot:list="{ cr }">
                    <p class="text-subtitle-2">
                      CR: {{ cr.text }}
                    </p>
                    <me-stat-list>
                      <me-stat-list-item label="Credits">
                        {{ hoardRewards[cr.value].credits }}
                      </me-stat-list-item>
                      <me-stat-list-item label="Additional Credits">
                        {{ hoardRewards[cr.value].additionalCredits[0] | groupDigits(',') }} - {{ hoardRewards[cr.value].additionalCredits[hoardRewards[cr.value].additionalCredits.length - 1] | groupDigits(',') }}
                      </me-stat-list-item>
                    </me-stat-list>
                  </template>
                </me-loot-table>
              </me-loot-group>
            </v-col>
            <v-col cols="12" lg="6">
              <me-loot-group title="Equipment Tables">
                <me-loot-table
                  v-for="(table, id) in rewardTables"
                  :key="id"
                  :table-headers="['1d100', 'Result']"
                  :table-data="table.map(i => [`${i.min}-${i.max}`, i.text])"
                >
                  <template v-slot:list>
                    <p class="text-subtitle-2">
                      Equipment Table {{ id.toUpperCase() }}
                    </p>
                  </template>
                </me-loot-table>
              </me-loot-group>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- END: LOOT TABLES -->

    <!-- START: LOOT GENERATOR FORM -->
    <v-card>
      <v-card-text>
        <p class="text-h6">
          Options
        </p>
        <v-select
          v-model="options.cr"
          :items="crOptions"
          label="Challenge Rating"
          single-line
          menu-props="bottom"
          hint="Challenge Rating"
          persistent-hint
        />
        <v-checkbox
          v-model="options.hoard"
          label="Hoard?"
          color="primary"
        />
        <v-btn
          block
          color="primary"
          @click="getLoot()"
        >
          Generate Loot
        </v-btn>
      </v-card-text>
    </v-card>
    <!-- END: LOOT GENERATOR FORM -->

    <!-- START: LOOT -->
    <v-row>
      <v-col
        v-for="(loot, index) in loots"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card>
          <v-card-title>
            {{ loot.credits | groupDigits(',') }} credits
          </v-card-title>
          <v-card-text>
            <div
              v-if="loot.thermalClips > 0 || loot.heavyWeapon > 0 || loot.omniGel > 0 || loot.medigel.length > 0"
            >
              <p class="text-subtitle-2">
                Consumables
              </p>
              <div v-if="loot.thermalClips > 0">
                {{ loot.thermalClips }} thermal clips
              </div>
              <div v-if="loot.heavyWeapon > 0">
                {{ loot.heavyWeapon }} heavy weapon charges
              </div>
              <div v-if="loot.omniGel > 0">
                {{ loot.thermalClips }} omni-gel
              </div>
              <div v-if="loot.medigel.length > 0">
                Medigel: {{ loot.medigel.map(i => `${i.count} ${i.type}`).join(', ') }}
              </div>
            </div>
            <me-reward-section
              v-if="loot.weapons.length > 0"
              title="Weapons"
              :rewards="loot.weapons"
            />
            <me-reward-section
              v-if="loot.armor.length > 0"
              title="Armor"
              :rewards="loot.armor"
            />
            <me-reward-section
              v-if="loot.gear.length > 0"
              title="Gear"
              :rewards="loot.gear"
            />
            <me-reward-section
              v-if="loot.mods.length > 0"
              title="Mods"
              :rewards="loot.mods"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              @click="removeLoot(index)"
            >
              <v-icon left>
                mdi_remove_circle
              </v-icon>
              Remove
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- END: LOOT -->

    <v-row>
      <v-col
        cols="8"
        sm="6"
        offset-sm="3"
        md="4"
        offset-md="4">
        <v-btn
          block
          @click="clearLoot"
        >
          Clear all loot
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { RandomValue } from '~/mixins/randomValue'

export default {
  mixins: [RandomValue],
  async fetch () {
    await Promise.all([
      this.$store.dispatch('FETCH_DATA', 'gear'),
      this.$store.dispatch('FETCH_DATA', 'weapons'),
      this.$store.dispatch('FETCH_DATA', 'armor'),
      this.$store.dispatch('FETCH_DATA', 'mods')
    ])
    this.$store.commit('pageTitle', 'Loot Generator')
    this.loading = false
  },
  data () {
    return {
      loading: true,
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
          { min: 35, max: 50, ...this.addGear('common') },
          { min: 51, max: 60, ...this.addMod('common') },
          { min: 61, max: 80, ...this.addWeapon('common') },
          { min: 81, max: 95, ...this.addMod('uncommon') },
          { min: 96, max: 100, ...this.addArmor('uncommon') }
        ],
        b: [
          { min: 1, max: 15, reward: () => this.addMedigel(1, 'enhanced'), text: '1 enhanced medi-gel' },
          { min: 16, max: 25, reward: () => this.addThOrHw('omniGel', this.randomAmount(1, 2, 4)), text: '2d4 + 1 omni-gel' },
          { min: 26, max: 44, ...this.addGear('uncommon') },
          { min: 55, max: 64, ...this.addWeapon('common') },
          { min: 65, max: 74, ...this.addMod('common') },
          { min: 75, max: 84, ...this.addArmor('uncommon') },
          { min: 75, max: 94, reward: () => this.addThOrHw('heavyWeapon', 3), text: '3 heavy weapon charges' },
          { min: 95, max: 100, ...this.addWeapon('uncommon') }
        ],
        c: [
          { min: 1, max: 15, reward: () => this.addMedigel(1, 'enhanced'), text: '1 enhanced medi-gel' },
          { min: 16, max: 25, reward: () => this.addThOrHw('omniGel', this.randomAmount(2, 1, 8)), text: '1d8 + 2 omni-gel' },
          { min: 26, max: 35, ...this.addMod('uncommon') },
          { min: 36, max: 45, ...this.addGear('uncommon') },
          { min: 46, max: 60, ...this.addWeapon('uncommon') },
          { min: 61, max: 73, ...this.addArmor('uncommon') },
          { min: 74, max: 85, reward: () => this.addThOrHw('heavyWeapon', 5), text: '5 heavy weapon charges' },
          { min: 86, max: 90, ...this.addMod('rare') },
          { min: 91, max: 100, reward: () => this.addMedigel(1, 'superior'), text: '1 superior medi-gel' }
        ],
        d: [
          { min: 1, max: 20, reward: () => this.addThOrHw('omniGel', this.randomAmount(1, 1, 6)), text: '1d6 + 1 omni-gel' },
          { min: 21, max: 40, ...this.addMod('rare') },
          { min: 41, max: 60, ...this.addGear('rare') },
          { min: 61, max: 70, reward: () => this.addMedigel(2, 'enhanced'), text: '2 enhanced medi-gel' },
          { min: 71, max: 80, reward: () => this.addThOrHw('heavyWeapon', 3), text: '3 heavy weapon charges' },
          { min: 81, max: 90, reward: () => this.addMedigel(2, 'superior'), text: '2 superior medi-gel' },
          { min: 91, max: 95, reward: () => this.addMedigel(1, 'ultimate'), text: '1 ultimate medi-gel' },
          { min: 96, max: 100, reward: () => this.addMedigel(2, 'ultimate'), text: '2 ultimate medi-gel' }
        ],
        e: [
          { min: 1, max: 10, ...this.addWeapon('common') },
          { min: 11, max: 40, ...this.addWeapon('uncommon') },
          { min: 41, max: 60, ...this.addMod('rare') },
          { min: 61, max: 80, ...this.addGear('very rare') },
          { min: 81, max: 90, ...this.addArmor('uncommon') },
          { min: 91, max: 100, ...this.addArmor('rare') }
        ],
        f: [
          { min: 1, max: 10, ...this.addWeapon('uncommon') },
          { min: 11, max: 30, ...this.addWeapon('rare') },
          { min: 31, max: 70, ...this.addMod('rare') },
          { min: 71, max: 100, ...this.addArmor('rare') }
        ],
        g: [
          { min: 1, max: 30, ...this.addWeapon('rare') },
          { min: 31, max: 60, ...this.addWeapon('spectre') },
          { min: 61, max: 70, ...this.addMod('rare') },
          { min: 71, max: 80, ...this.addGear('very rare') },
          { min: 81, max: 90, ...this.addArmor('rare') },
          { min: 91, max: 100, ...this.addArmor('spectre') }
        ],
        h: [
          { min: 1, max: 10, ...this.addWeapon('spectre') },
          { min: 11, max: 40, ...this.addGear('spectre') },
          { min: 41, max: 70, ...this.addMod('spectre') },
          { min: 71, max: 100, ...this.addArmor('spectre') }
        ]
      }
    }
  },
  computed: {
    mods () {
      return this.$store.getters.getData('mods')
    },
    weapons () {
      return this.$store.getters.getData('weapons')
    },
    armor () {
      return this.$store.getters.getData('armor')
    },
    gear () {
      const gear = this.$store.getters.getData('gear')
      const addGrenades = []
      const grenadeRarityMap = [
        { level: 'I', rarity: 'Common' },
        { level: 'II', rarity: 'Common' },
        { level: 'III', rarity: 'Uncommon' },
        { level: 'IV', rarity: 'Uncommon' },
        { level: 'V', rarity: 'Rare' },
        { level: 'VI', rarity: 'Rare' },
        { level: 'VII', rarity: 'Very Rare' },
        { level: 'VII', rarity: 'Very Rare' },
        { level: 'IX', rarity: 'Very Rare' },
        { level: 'X', rarity: 'Spectre' }
      ]
      for (const grenade of gear.filter(i => i.type === 'Grenade')) {
        for (const rarity of grenadeRarityMap) {
          addGrenades.push(this.createRarityItem(grenade, rarity))
        }
      }
      const addOther = []
      const addOtherMap = [
        { level: 'I', rarity: 'Uncommon' },
        { level: 'II', rarity: 'Rare' },
        { level: 'III', rarity: 'Very Rare' },
        { level: 'VI', rarity: 'Very Rare' },
        { level: 'V', rarity: 'Spectre' }
      ]
      for (const otherItem of gear.filter(i => i.rarity === 'Varies')) {
        for (const rarity of addOtherMap) {
          addOther.push(this.createRarityItem(otherItem, rarity))
        }
      }
      return gear.filter(i => i.type !== 'Grenade' && i.type !== 'Tool').concat(addGrenades).concat(addOther)
    },
    individualRewardsData () {
      return this.crOptions.map((i) => {
        const value1 = this.individualRewards[i.value][0]
        const range1 = this.$options.filters.groupDigits(value1, ',')
        const value2 = this.individualRewards[i.value][this.individualRewards[i.value].length - 1]
        const range2 = this.$options.filters.groupDigits(value2, ',')
        return [
          i.text,
          `${range1} - ${range2}`
        ]
      })
    }
  },
  methods: {
    addArmor (rarity) {
      return {
        reward: () => this.addItem('armor', rarity), text: `1 ${rarity} armor`
      }
    },
    addWeapon (rarity) {
      return {
        reward: () => this.addItem('weapons', rarity), text: `1 ${rarity} weapon`
      }
    },
    addGear (rarity) {
      return {
        reward: () => this.addItem('gear', rarity), text: `1 ${rarity} gear`
      }
    },
    addMod (rarity) {
      return {
        reward: () => this.addItem('mods', rarity), text: `1 ${rarity} mod`
      }
    },
    createRarityItem (item, rarity) {
      const newItem = JSON.parse(JSON.stringify((item)))
      newItem.rarity = rarity.rarity
      newItem.name = `${item.name} ${rarity.level}`
      newItem.id = `${item.id}-${rarity.level.toLowerCase()}`
      return newItem
    },
    rollText (itemRoll) {
      if (!itemRoll.roll) {
        return 'Nothing extra'
      }
      const die = itemRoll.roll === 1 ? 1 : `1d${itemRoll.roll}`
      const plural = itemRoll.roll === 1 ? '' : 's'
      return `Roll ${die} time${plural} on Equipment Table ${itemRoll.table.toUpperCase()}`
    },
    addMedigel (count, type) {
      const existingType = this.workingLoot.medigel.find(mg => mg.type === type)
      if (existingType) {
        existingType.count += count
      } else {
        this.workingLoot.medigel.push({ type, count })
      }
    },
    addThOrHw (type, count) {
      this.workingLoot[type] += count
    },
    addItem (type, rarity) {
      const availableItems = this[type].filter(i => i.rarity.toLowerCase() === rarity.toLowerCase())
      const randomItem = this.randomValue(availableItems)
      this.workingLoot[type].push(randomItem)
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
        gear: [],
        weapons: [],
        armor: [],
        mods: []
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
  },
  head () {
    return {
      title: 'Loot Generator - Generators | Mass Effect 5e',
      meta: [
        { id: 'description', name: 'description', content: 'A random loot generator.' }
      ]
    }
  }
}
</script>
