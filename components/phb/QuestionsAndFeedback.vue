<template lang="pug">
  flat-card
    span(slot="title") Questions and feedback
    template(slot="body")
      p.
        Check out the #[nuxt-link(to="/contributing") contributing page] for all information on leaving questions and feedback.
</template>

<script>
  import FlatCard from '~/components/cards/FlatCard.vue'

  export default {
    components: { FlatCard }
  }
</script>
