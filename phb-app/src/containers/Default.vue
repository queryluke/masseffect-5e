<template>
  <v-app toolbar footer>
    <main-navigation :drawer="drawer"></main-navigation>
    <main-toolbar :drawer="drawer" v-on:toggleDrawer="toggleDrawer"></main-toolbar>
    <main>
      <v-container fluid class="blue-grey lighten-4">
        <transition name="slide" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-container>
    </main>
    <main-footer></main-footer>
  </v-app>
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
  methods: {
    toggleDrawer () {
      this.drawer = !this.drawer;
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
