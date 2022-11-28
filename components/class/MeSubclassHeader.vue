<template>
  <div>
    <p class="text-h4 font-weight-thin">
      {{ item.name }}
    </p>
    <p v-if="item.author" class="font-italic text-subtitle-1 mt-n4 primary--text">
      by {{ item.author }}
    </p>
    <me-html v-if="flavor" :content="item.html" />
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    flavor: {
      type: Boolean,
      default: false
    }
  }
}
</script>
