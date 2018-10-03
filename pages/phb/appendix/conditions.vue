<template lang="pug">
  v-container
    v-layout(row wrap)
      v-flex.xs12
        h2.display-1.hidden-sm-and-down Conditions
      v-flex.xs12
        p.
          All of the conditions which can affect a character or object are listed below. Note that there are a few new
          conditions in this system in order to maintain consistency with the Mass Effect setting:
        p #[b New Conditions]: Frozen, Lifted, Primed, Targeting, Unprotected
        v-card(v-for="condition in items" v-bind:key="condition.id" v-bind:id="condition.id").my-5
          v-card-title
            p.title.mb-1 {{ condition.name }}
          v-divider
          v-card-text
            md-file(:id="condition.id" itemType="conditions").mt-2
</template>

<script>
  import items from '~/static/data/conditions.json'
  import MarkdownFile from '~/components/MarkdownFile.vue'

  export default {
    components: { MarkdownFile },
    data () {
      return {
        items
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
