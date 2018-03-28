<template lang="pug">
  v-app(toolbar dark)
    main-toolbar
    transition(name="slide" mode="out-in")
      router-view(:key="$route.fullPath")
    main-footer
</template>

<script>
import MainToolbar from '../components/MainToolbar.vue';
import MainFooter from '../components/MainFooter.vue';


export default {
  components: {
    MainFooter,
    MainToolbar
  },
  name: 'Default',
};
</script>
