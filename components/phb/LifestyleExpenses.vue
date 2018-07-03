<template lang="pug">
  rule-card
    span(slot="header") Lifestyle Expenses
    template(slot="text")
      v-card
        v-card-text.blue.lighten-5
          p.
            Lifestyle expenses provide you with a simple way to account for the cost of living in [the Mass Effect] world.
            They cover your accommodations, food and drink, and all your other necessities. Furthermore, expenses cover the
            cost of maintaining your equipment so you can be ready when adventure next calls.
          p.
            At the start of each week or month (your choice), choose a lifestyle from the Expenses table and pay the price to
            sustain that lifestyle. The prices listed are per day, so if you wish to calculate the cost of your chosen lifestyle over a
            thirty-day period, multiply the listed price by 30. Your lifestyle might change from one period to the next, based on the
            funds you have at your disposal, or you might maintain the same lifestyle throughout your character's career.
          p.
            Your lifestyle choice can have consequences. Maintaining a wealthy lifestyle might help you make contacts
            with the rich and powerful, though you run the risk of attracting thieves. Likewise, living frugally might
            help you avoid criminals, but you are unlikely to make powerful connections.
          p
            em -- 5th Edition SRD, #[a(href="http://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf" target="_blank") pg. 72]
      v-data-table(v-bind:headers="headers" v-bind:items="items" hide-actions)
        template(slot="items" slot-scope="props")
          td {{ props.item.name }}
          td {{ props.item.cost }}
</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'

  export default {
    components: { RuleCard },
    data () {
      return {
        headers: [
          { text: 'Lifestyle', value: 'lifestyle', align: 'left', sortable: false },
          { text: 'Credits/Day', value: 'credits', sortable: false, align: 'left' }
        ],
        items: [
          {
            'name': 'Wretched',
            'cost': '-'
          },
          {
            'name': 'Squalid',
            'cost': '25 credits'
          },
          {
            'name': 'Poor',
            'cost': '75 credits'
          },
          {
            'name': 'Modest',
            'cost': '150 credits'
          },
          {
            'name': 'Comfortable',
            'cost': '250 credits'
          },
          {
            'name': 'Wealthy',
            'cost': '500 credits'
          },
          {
            'name': 'Aristocratic',
            'cost': '1,000 credits minimum'
          }
        ]
      }
    }
  }
</script>
