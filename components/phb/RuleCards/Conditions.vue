<template lang="pug">
  rule-card
    span(slot="header") Conditions
    template(slot="text")
      p.headline New
      p Frozen, Lifted, Primed, Targeting, Unprotected
      v-data-table(v-bind:headers="headers" v-bind:items="items" hide-actions)
        template(slot="items" slot-scope="props")
          td {{ props.item.name }}
          td {{ props.item.mechanic }}
</template>

<script>
  import RuleCard from '~/components/shared/RuleCard.vue'
  import {mapGetters} from 'vuex'

  export default {
    components: {RuleCard},
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
    }
  }
</script>
