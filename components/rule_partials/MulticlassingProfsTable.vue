<template lang="pug">
  v-data-table(v-bind:headers="profs.headers" v-bind:items="profs.items" hide-actions)
    template(slot="items" slot-scope="props")
      td {{ props.item.name }}
      td {{ props.item.prof }}
</template>

<script>
  export default {
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
              prof: '2 weapon types'
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
