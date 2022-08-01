<template>
  <span class="text-caption font-weight-light">
    {{ note.text }}{{ hasNext ? ',' : '' }}
  </span>
</template>
<script>

export default {
  name: 'MeCsActionNotesText',
  props: {
    note: {
      type: Object,
      default: () => {
        return {
          text: ''
        }
      }
    },
    hasNext: {
      type: Boolean,
      default: false
    }
  }
}
</script>
