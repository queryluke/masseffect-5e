<template>
  <v-progress-linear :value="100" :height="size" class="my-2" />
</template>

<script>
export default {
  name: 'MeHr',
  props: {
    size: {
      type: Number,
      default: 4
    }
  }
}
</script>
