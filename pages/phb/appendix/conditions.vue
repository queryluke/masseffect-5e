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
            markdown-file(:id="condition.id" itemType="conditions").mt-2
</template>

<script>
  import items from '~/static/data/conditions.json'

  export default {
    data () {
      return {
        items
      }
    },
    head () {
      return {
        title: 'Conditions - Appendix | Mass Effect 5e',
        meta: [
          { hid: 'description', name: 'description', content: 'There are new conditions in Mass Effect 5e that add variety to combat.' }
        ]
      }
    },
    layout: 'phb'
  }
</script>
