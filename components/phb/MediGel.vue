<template lang="pug">
  rule-card(id="medi-gel")
    span(slot="header") Medi-gel
    template(slot="text")
      h3.title Using Medi-gel
      p.
        As an action, use a medi-gel pack on yourself or a willing creature within 2m. The target regains hit points equal to the medi-gel's potency.
      h3.title Armor Capacity: 4
      p.
        All armor comes standard with a capacity for 4 medi-gel. Some armor and mods allow you to increase this amount.
      h3.title Resupplying
      p.
        As long as you're in a relatively civilized environment, you can easily resupply your medi-gel at a medical facility.
        However, you would need insider or black-market connections to get Superior or Ultimate medi-gel. Since Ultimate
        medi-gel is so rare, the cost is entirely dependent on the people you know, favors your owed, or ability
        to break into a medical facility.
      h3.title Medi-gel types
      table.my-2.table
        thead
          tr
            th(v-for="header in headers" v-bind:key="header.value") {{ header.text }}
        tbody
          tr(v-for="(item, index) in items" v-bind:key="index")
            td(:data-table-key="headers[0].text") {{ item.name }}
            td(:data-table-key="headers[1].text") {{ item.rarity }}
            td(:data-table-key="headers[2].text") {{ item.cost }}
            td(:data-table-key="headers[3].text") {{ item.hp }}
</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'

  export default {
    components: {RuleCard},
    data () {
      return {
        items: [
          {
            name: 'Standard',
            rarity: 'Common',
            cost: '~200 credits',
            hp: '2d4 + 2'
          },
          {
            name: 'Enhanced',
            rarity: 'Uncommon',
            cost: '~500 credits',
            hp: '4d4 + 4'
          },
          {
            name: 'Superior',
            rarity: 'Rare',
            cost: '~1,500 credits',
            hp: '8d4 + 8'
          },
          {
            name: 'Ultimate',
            rarity: 'Very Rare',
            cost: '?',
            hp: '10d4 + 20'
          }
        ],
        headers: [
          { text: 'Type', value: 'name', sortable: false, align: 'left' },
          { text: 'Rarity', value: 'rarity', sortable: false, align: 'left' },
          { text: 'Cost', value: 'cost', sortable: false, align: 'left' },
          { text: 'HP Regained', value: 'hp', sortable: false, align: 'left' }
        ]
      }
    }
  }
</script>
