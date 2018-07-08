<template lang="pug">
  rule-card(id="multiclassing-profs")
    span(slot="header") Proficiencies
    template(slot="text")
      p.
        When you gain your first level in a class other than your initial class, you gain only some of new class's
        starting proficiencies, as shown in the Multiclassing Proficiencies table.
      p.subheading Multiclassing Proficiencies
      v-data-table(v-bind:headers="profs.headers" v-bind:items="profs.items" hide-actions)
        template(slot="items" slot-scope="props")
          td {{ props.item.name }}
          td {{ props.item.prof }}
</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'

  export default {
    components: { RuleCard },
    data () {
      return {
        profs: {
          headers: [
            { text: 'Class', value: 'name', sortable: false, align: 'left' },
            { text: 'Proficiencies Gained', value: 'prof', sortable: false, align: 'left' }
          ],
          items: [
            {
              name: 'Adept',
              prof: 'SMGs'
            },
            {
              name: 'Engineer',
              prof: 'Medium Armor'
            },
            {
              name: 'Infiltrator',
              prof: 'Sniper Rifles'
            },
            {
              name: 'Sentinel',
              prof: 'Heavy Armor'
            },
            {
              name: 'Soldier',
              prof: '1 weapon type'
            },
            {
              name: 'Vanguard',
              prof: 'Shotguns'
            }
          ]
        }
      }
    }
  }
</script>
