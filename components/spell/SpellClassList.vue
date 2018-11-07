<template lang="pug">
  v-layout(justify-end)
    div(v-for="me_class in availableClasses" v-bind:key="me_class")
      v-avatar(size="50" tile)
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
      }
    }
  }
</script>

