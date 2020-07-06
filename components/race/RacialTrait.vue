<template>
  <trait>
    <span slot="header">
      {{ item.name }}
    </span>
    <template slot="text">
      <div>
        <me-html :content="item.html" />
      </div>
    </template>
  </trait>
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
