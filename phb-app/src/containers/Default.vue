<template lang="jade">
  v-app(toolbar)
    main-navigation
    main-toolbar
    main
      v-container(fluid).blue-grey.lighten-4
        h1.sr-only Mass Effect 5e - Player's Handbook
        transition(name="slide" mode="out-in")
          router-view(:key="$route.fullPath")
</template>

<script>
import MainNavigation from '../components/MainNavigation.vue';
import MainFooter from '../components/MainFooter.vue';
import MainToolbar from '../components/MainToolbar.vue';

export default {
  name: 'Default',
  components: {
    MainToolbar, 'main-toolbar': MainToolbar,
    MainNavigation, 'main-navigation': MainNavigation,
    MainFooter, 'main-footer': MainFooter,
  },
  data () {
    return {
      drawer: true,
    }
  },
};
</script>

<style lang="stylus">
  .slide-enter-active, .slide-enter
    transition: all .3s ease

  .slide-enter, .slide-leave-to
    opacity: 0

  .slide-enter
    transform: translateX(3rem)

  .slide-leave, .slide-leave-active
    transition: all .4s ease

  .slide-leave-to
    transform: translateX(-3rem)
</style>
