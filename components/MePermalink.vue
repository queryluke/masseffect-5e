<template>
  <v-btn :to="`/${type}/${itemId}`" right>
    View Details Page
  </v-btn>
</template>

<script>
export default {
  props: {
    itemId: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  }
}
</script>
