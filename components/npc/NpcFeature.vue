<template lang="pug">
  div
    p
      strong
        em {{ feature.name }}
          span(v-if="feature.recharge").ml-1 ({{ feature.recharge }})
        span .
      span.ml-1 {{ feature.description }}
</template>

<script>
export default {
  props: {
    feature: {
      type: Object,
      default: () => { return {} }
    }
  }
}
</script>
