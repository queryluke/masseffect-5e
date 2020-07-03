<template lang="pug">
  v-layout(:class="justify")
    div(v-for="me_class in availableClasses" v-bind:key="me_class")
      v-avatar(:size="size" tile)
        img(:src="`/images/classes/${me_class}.svg`" v-bind:alt="me_class")
</template>

<script>
export default {
  props: {
    availableClasses: {
      type: Array,
      default: () => {
        return []
      }
    },
    size: {
      type: Number,
      default: 50
    },
    justify: {
      type: String,
      default: 'justify-end'
    }
  }
}
</script>
