<template lang="pug">
  v-card.ma-1
    v-card-title {{ option.name }}
    v-card-text {{ option.description }}
</template>

<script>
export default {
  props: {
    option: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
