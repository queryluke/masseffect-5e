<template lang="pug">
  div
    div(v-for="item in items" v-bind:key="item.system").mb-3
      p.title.mt-5 {{ item.system }}
      v-data-table(v-bind:headers="headers" v-bind:items="generateUpgradeList(item)" hide-actions).mt-0
        template(slot="items" slot-scope="props")
          td {{ props.item.cost }}
          td {{ props.item.effect }}
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          { text: 'Cost', value: 'cost', align: 'left', sortable: false },
          { text: 'Effect', value: 'effect', sortable: false, align: 'left' }
        ],
        items: [
          {
            system: 'Helm',
            effect: 'bonus to Speed and Maneuver and Hard Maneuver rolls'
          },
          {
            system: 'Weapons',
            effect: 'bonus to damage rolls'
          },
          {
            system: 'EWS',
            effect: 'bonus Harden and Sabotage rolls'
          },
          {
            system: 'SSC',
            effect: 'bonus to Scan rolls'
          },
          {
            system: 'Drive',
            effect: 'range and bonus to Restore checks'
          }
        ],
        costs: [
          50000,
          150000,
          300000,
          500000,
          1000000
        ]
      }
    },
    methods: {
      generateUpgrageList (system) {
        const upgrades = []
        for (let i = 1; i < 6; i++) {
          upgrades.push({cost: this.costs[i - 1], effect: `+${i} ${system.effect}`})
        }
        return upgrades
      }
    }
  }
</script>
