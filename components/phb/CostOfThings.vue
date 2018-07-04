<template lang="pug">
  rule-card(id="cost-of-things")
    span(slot="header") Commonplace Things
    template(slot="text")
      p.
        We've provided an assortment of costs for commonplace things. These are recommendations and not rules.
      div(v-for="thing in items" v-bind:key="thing.type").mb-3
        p.title.mb-0 {{ thing.type }}
        v-data-table(v-bind:headers="headers" v-bind:items="thing.items" hide-actions).mt-0
          template(slot="items" slot-scope="props")
            td {{ props.item.name }}
            td {{ props.item.cost }}
</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'
  import {mapGetters} from 'vuex'

  export default {
    components: { RuleCard },
    computed: {
      ...mapGetters(['getData'])
    },
    created () {
      this.items = this.getData('commonplaceItems')
    },
    data () {
      return {
        headers: [
          { text: 'Item', value: 'item', align: 'left', sortable: false },
          { text: 'Credits', value: 'credits', sortable: false, align: 'left' }
        ]
      }
    }
  }
</script>
