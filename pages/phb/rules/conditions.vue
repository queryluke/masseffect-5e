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
        conditions
</template>

<script>
  import Conditions from '~/components/phb/Conditions.vue'
  export default {
    components: {Conditions},
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
