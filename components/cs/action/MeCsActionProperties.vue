<template>
  <div class="text-caption font-weight-light">
    <small>
      {{ properties.join(' ∙ ') }}
    </small>
  </div>
</template>
<script>
export default {
  name: 'MeCsActionProperties',
  props: {
    properties: {
      type: Array,
      default: () => []
    }
  }
}
</script>
