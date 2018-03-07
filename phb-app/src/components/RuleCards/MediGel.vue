<template lang="pug">
  rule-card
    span(slot="header") Medi-gel
    template(slot="text")
      p.headline Capacity: 4
      p.
        All armor comes standard with 4 medi-gel. Some armor and mods allow you to increase this ammount.
      p.
        You can use your medi-gel in combat, by using the #[a(v-on:click="showGlobalDialog('apply-medi-gel')") Apply Medi-gel action].
      p.headline Resupply: Common
      p.
        Medi-gel (medical gel) is an all-purpose medicinal salve combining an anaesthetic and clotting agent used by
        paramedics, EMTs, and military personnel, produced by the Sirta Foundation. As long as you're in a relatively
        civilized environment, you can resupply all of your medi-gel for 1,000 credits.
</template>

<script>
  import RuleCard from './../RuleCard.vue';
  import {mapActions} from 'vuex';

  export default {
    components: { RuleCard },
    methods: {
      ...mapActions(['showGlobalDialog']),
    },
    name: 'MediGel'
  };
</script>
