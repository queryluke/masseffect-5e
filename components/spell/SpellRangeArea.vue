<template lang="pug">
  div
    span {{ spell.distance.range }}
    span(v-if="spell.distance.aoeDistance").ml-1
      span ({{ spell.distance.aoeDistance }}
      v-avatar(size="18" tile)
        v-img(:src="`/images/aoe/${spell.distance.aoeType}.svg`" v-bind:alt="spell.distance.aoeType")
      span )
</template>

<script>
  export default {
    props: {
      spell: {
        type: Object,
        default: () => { return {} }
      },
    }
  }
</script>
