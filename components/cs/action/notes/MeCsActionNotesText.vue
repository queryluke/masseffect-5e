<template>
  <span class="text-caption font-weight-thin">
    {{ note.text }}
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
    }
  }
}
</script>
