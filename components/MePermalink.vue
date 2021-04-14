<template>
  <v-btn :to="localePath(`/${type}/${itemId}`)" right>
    {{ $t('site.buttons.view_details') }}
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
