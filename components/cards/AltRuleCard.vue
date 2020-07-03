<template lang="pug">
  v-card.mb-3(:id="id")
    v-card-title.headline.primary.white--text
      slot(name="header")
    v-card-text
      slot(name="text")
    v-card-actions
      slot(name="actions")
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  }
}
</script>
