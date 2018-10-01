<template lang="pug">
  v-container
    v-layout(row wrap)
      v-flex.xs12
        h2.display-1.hidden-sm-and-down Skills
      v-flex.xs12.sm6
        p.headline New
        p {{ new_skills }}
      v-flex.xs12.sm6
        p.headline Removed
        p {{ removed }}
    div.mt-3
      table.elevation-1.table
        thead
          tr
            th Name
            th Ability
            th Description
        tbody
          tr(v-for="item in items" v-bind:key="item.id")
            td(data-table-key="Name") {{ item.name }}
            td(data-table-key="Ability") {{ item.link }}
            td(data-table-key="Description").full-width-td {{ item.description }}
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters(['getData'])
    },
    created () {
      const data = this.getData('skills')
      this.items = data.filter((i) => { return i.removed === null })
      this.removed = data.filter((i) => { return i.removed }).map((i) => { return i.name }).join(', ')
      this.new_skills = data.filter((i) => { return i.new }).map((i) => { return i.name }).join(', ')
    },
    data () {
      return {
        items: [],
        new_skills: '',
        removed: '',
        listName: 'skills',
        headers: [
          { text: 'Name', value: 'name', align: 'left' },
          { text: 'Ability', value: 'link', align: 'left' },
          { text: 'Description', value: 'description', sortable: false, align: 'left' }
        ]
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | Rules - Skills',
        meta: [
          { hid: 'description', name: 'description', content: 'Mass Effect 5e comes with a few futuristic skill options!' }
        ]
      }
    },
    layout: 'phb'
  }
</script>
