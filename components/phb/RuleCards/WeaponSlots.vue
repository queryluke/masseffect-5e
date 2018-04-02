<template lang="pug">
  rule-card
    span(slot="header") Weapon Slots
    template(slot="text")
      p.
        You can carry 2 weapons into combat unless a feature or armor mod allows you to carry more. If using the #[a(v-on:click="showGlobalDialog('encumbrance')") Variant: Encumberance rule], you can
        carry as many weapons as your carry capacity will allow.
</template>

<script>
  import RuleCard from '~/components/shared/RuleCard.vue'
  import {mapActions} from 'vuex'

  export default {
    components: { RuleCard },
    methods: {
      ...mapActions(['showGlobalDialog'])
    }
  }
</script>
