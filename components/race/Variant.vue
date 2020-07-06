<template>
  <div>
    <p class="headline">
      {{ item.name }}
    </p>
    <me-html :content="item.html" />
  </div>
</template>

<script>

export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          name: '',
          html: ''
        }
      }
    }
  }
}
</script>
