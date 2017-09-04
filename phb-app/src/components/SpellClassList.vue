<template lang="jade">
  v-layout(justify-end).spell-class-list
    div(v-for="meClass in classes" v-bind:key="meClass" v-if="spell[meClass]")
      class-icon(
        v-bind:classname="meClass"
      )
      span(v-if="spell[meClass] !== 'x'") {{ spell[meClass] }}
</template>

<script>
  import ClassIcon from "./ClassIcon.vue";

  export default {
    components: {
      ClassIcon
    },
    name: 'SpellClassList',
    props: ['spell'],
    data () {
      return {
        classes: ['adept', 'engineer', 'infiltrator', 'sentinel', 'soldier', 'vanguard']
      }
    }
  };
</script>

<style lang="stylus">
  .spell-class-list
    .class-icon
      width: 50px;
      height: 50px;
      vertical-align middle

</style>

