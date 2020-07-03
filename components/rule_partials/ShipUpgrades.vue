<template lang="pug">
  div
    v-data-table(v-bind:headers="headers" v-bind:items="items" hide-actions).mt-0
      template(slot="items" slot-scope="props")
        td {{ props.item.name }}
        td {{ props.item.system }}
        td {{ props.item.cost | groupDigits(',') }}
        td {{ props.item.prerequisite }}
        td {{ props.item.effect }}
</template>

<script>
import items from '~/static/data/ship_upgrades'
export default {
  data () {
    return {
      headers: [
        { text: 'Name', value: 'name', align: 'left', sortable: true },
        { text: 'System', value: 'system', sortable: true, align: 'left' },
        { text: 'Cost', value: 'cost', sortable: true, align: 'left' },
        { text: 'Prerequisite', value: 'prerequisite', sortable: false, align: 'left' },
        { text: 'Effect', value: 'effect', sortable: false, align: 'left' }
      ],
      items
    }
  }
}
</script>
