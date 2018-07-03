<template lang="pug">
  flat-card
    span(slot="title") Starting your campaign
    template(slot="body")
      p.
        Once you've assembled a group of players and characters are made, it's time to start your campaign. Other than following the rule changes,
        there isn't anything special about running a Mass Effect 5e campaign. In later versions, we hope to introduce additional Variant rules
        for space travel and ship-to-ship combat, but this isn't required to get started.
      p.
        For information about the Mass Effect universe, we recommend consulting the
        #[a(href="http://masseffect.wikia.com/wiki/Mass_Effect_Wiki" target="_blank") Mass Effect Wiki].
</template>

<script>
  import FlatCard from '~/components/cards/FlatCard.vue'

  export default {
    components: { FlatCard }
  }
</script>
