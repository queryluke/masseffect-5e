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
      v-data-table(v-bind:headers="headers" v-bind:items="items" hide-actions).elevation-1
        template(slot="items" slot-scope="props")
          td {{ props.item.name }}
          td {{ props.item.link }}
          td {{ props.item.description }}
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
