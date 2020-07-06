<template>
  <div>
    <p class="title">
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
    },
    featureLevel: {
      type: Object,
      default: () => { return {} }
    }
  }
}
</script>
