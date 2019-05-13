<template lang="pug">
  v-container
    v-layout(row wrap)
      v-flex.xs12
        h2.display-1.hidden-sm-and-down Weapon Properties
    div.mt-3
      table.elevation-1.table
        thead
          tr
            th Name
            th Description
        tbody
          tr(v-for="item in items" v-bind:key="item.id")
            td(data-table-key="Name") {{ item.name }}
            td(data-table-key="Description").full-width-td {{ item.description }}
</template>

<script>
  import items from '~/static/data/weapon_properties'

  export default {
    data () {
      return {
        items,
        headers: [
          { text: 'Name', value: 'name', align: 'left' },
          { text: 'Description', value: 'description', sortable: false, align: 'left' }
        ]
      }
    },
    head () {
      return {
        title: 'Weapon Properties - Appendix | Mass Effect 5e',
        meta: [
          { hid: 'description', name: 'description', content: 'Mass Effect 5e comes with some new and fun weapon properties!' }
        ]
      }
    },
    layout: 'phb'
  }
</script>
