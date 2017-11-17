<template lang="pug">
  v-card.mb-3
    v-card-title.headline.primary.white--text
      slot(name="header")
    v-card-text
      slot(name="text")
</template>

<script>
  export default {
    name: 'RuleCard',
  };
</script>

