<template lang="pug">
  v-container
    v-layout(row wrap)
      v-flex.xs12
        h2.display-3 Conditions
      v-flex.xs12
        p All of the conditions which can affect a character or object are listed below. Note that there are a few new conditions in this system in order to maintain consistency with the Mass Effect setting:
        p #[b New Conditions]: Frozen, Lifted, Primed, Targeting, Unprotected
    div.mt-3
      v-data-table(v-bind:headers="headers" v-bind:items="items" hide-actions).elevation-1
        template(slot="items" slot-scope="props")
          td {{ props.item.name }}
          td {{ props.item.mechanic }}
    page-footer(:list="listName")
</template>

<script>
  import PageFooter from '~/components/phb/PageFooter.vue'
  import {mapGetters} from 'vuex'

  export default {
    components: {PageFooter},
    computed: {
      ...mapGetters(['getData'])
    },
    created () {
      this.items = this.getData('conditions')
    },
    data () {
      return {
        items: [],
        listName: 'conditions',
        new_skills: '',
        removed: '',
        source: '',
        updated: '',
        headers: [
          { text: 'Name', value: 'name', align: 'left' },
          { text: 'Description', value: 'description', sortable: false, align: 'left' }
        ]
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | Rules - General',
        meta: [
          { hid: 'description', name: 'description', content: 'There are new conditions in Mass Effect 5e that add variety to combat.' }
        ]
      }
    },
    layout: 'phb'
  }
</script>
