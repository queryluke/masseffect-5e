<template lang="pug">
  v-layout(justify-end).spell-class-list
    div(v-for="me_class in classes" v-bind:key="me_class" v-if="spell[me_class]").class-icon
      me-icon(type="classes" v-bind:name="me_class")
      span(v-if="spell[me_class] !== 'x'") {{ spell[me_class] }}
</template>

<script>
  import MeIcon from '~/components/shared/MeIcon.vue'

  export default {
    components: {
      MeIcon
    },
    props: ['spell'],
    data () {
      return {
        classes: ['adept', 'engineer', 'infiltrator', 'sentinel', 'soldier', 'vanguard']
      }
    }
  }
</script>

<style lang="stylus">
  .spell-class-list
    .class-icon
      width: 50px;
      height: 50px;
      vertical-align middle

</style>

