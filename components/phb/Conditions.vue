<template lang="pug">
  rule-card(id="conditions")
    span(slot="header") Conditions
    template(slot="text")
      div(v-for="condition in items" v-bind:key="condition.id" v-bind:id="condition.id").my-5
        p.title.mb-1 {{ condition.name }}
        v-divider
        markdown-file(:id="condition.id" itemType="conditions").mt-2
</template>

<script>
  import MarkdownFile from '~/components/MarkdownFile.vue'
  import RuleCard from '~/components/cards/RuleCard.vue'
  import {mapGetters} from 'vuex'

  export default {
    components: {MarkdownFile, RuleCard},
    computed: {
      ...mapGetters(['getData'])
    },
    created () {
      this.items = this.getData('conditions')
    },
    data () {
      return {
        items: []
      }
    }
  }
</script>

<style>
  .theme--light .v-divider {
    background-color: #0d47a1;
    height: 2px;
  }
</style>
