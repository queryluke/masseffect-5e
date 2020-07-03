<template lang="pug">
  div
    v-data-table(v-bind:headers="headers" v-bind:items="items" hide-actions)
      template(slot="items" slot-scope="props")
        td(data-table-key="headers[0].short") {{ props.item.condition }}
        td(data-table-key="headers[1].short") {{ props.item.dex }}
        td(data-table-key="headers[2].short") {{ props.item.str }}
        td(data-table-key="headers[3].short") {{ props.item.stealth }}
    v-alert(value="true" type="info") #[strong Body Armor] is considered three pieces (arms, chest, and legs)
</template>

<script>
export default {
  data () {
    return {
      headers: [
        { text: 'If you are wearing...', short: 'Wearing', value: 'condition', sortable: false, align: 'left' },
        { text: 'Dexterity Bonus', short: 'DEX Bonus', value: 'dex', sortable: false, align: 'left' },
        { text: 'Minimum Strength', short: 'Min STR', value: 'str', sortable: false, align: 'left' },
        { text: 'Stealth', short: 'Stealth', value: 'stealth', sortable: false, align: 'left' }
      ],
      items: [
        {
          condition: '...three or more pieces of Heavy armor',
          dex: 'none',
          str: '16',
          stealth: 'disadvantage'
        },
        {
          condition: '...two pieces of Heavy armor',
          dex: 'none',
          str: '15',
          stealth: 'disadvantage'
        },
        {
          condition: '...one piece of Heavy armor',
          dex: 'none',
          str: '13',
          stealth: 'disadvantage'
        },
        {
          condition: '...three or more pieces of Medium armor',
          dex: 'Max +2 bonus from Dexterity modifier',
          str: '13',
          stealth: 'disadvantage'
        },
        {
          condition: '...two pieces of Medium armor',
          dex: 'Max +2 bonus from Dexterity modifier',
          str: '12',
          stealth: '-'
        },
        {
          condition: '...one piece of Medium armor',
          dex: 'Max +2 bonus from Dexterity modifier',
          str: '-',
          stealth: '-'
        },
        {
          condition: '...Light or no armor',
          dex: 'Add Dexterity modifier to your AC',
          str: '-',
          stealth: '-'
        }
      ]
    }
  }
}
</script>
