<template lang="pug">
  div
    p
      strong
        em {{ action.name }}
      span(v-if="action.cost > 1").ml-1 (Costs {{ action.cost }} {{ action.cost | pluralize('Action') }})
      span .
      span.ml-1 {{ action.description }}
</template>

<script>
export default {
  props: {
    action: {
      type: Object,
      default: () => { return {} }
    }
  }
}
</script>
