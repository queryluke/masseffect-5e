<template>
  <me-class-feature :hr="hr" :hr-size="hrSize" :klass-id="item.klass">
    <template #title>
      {{ item.name }}
    </template>
    <me-html
      :content="item.html"
    />
  </me-class-feature>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    hr: {
      type: Boolean,
      default: true
    },
    hrSize: {
      type: Number,
      default: 4
    }
  }
}
</script>
