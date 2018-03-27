<template lang="pug">
  v-app(dark)
    router-view(:key="$route.fullPath")
</template>

<script>
export default {
  name: 'Default',
};
</script>
