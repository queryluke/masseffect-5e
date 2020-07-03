<template lang="pug">
  div
    span {{ spell.distance.range }}
    span(v-if="spell.distance.aoeDistance").ml-1
      span ({{ spell.distance.aoeDistance }}
      v-avatar(:size="size" tile).ml-1
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
    size: {
      type: Number,
      default: 18
    }
  }
}
</script>
