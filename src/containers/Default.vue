<template lang="pug">
  v-app(toolbar dark)
    main-toolbar
    transition(name="slide" mode="out-in")
      router-view(:key="$route.fullPath")
</template>

<script>
import MainToolbar from '../components/MainToolbar.vue';

export default {
  components: {MainToolbar},
  name: 'Default',
};
</script>
