<template>
  <div class="text-caption font-weight-light">
    {{ notes.join(', ') }}
  </div>
</template>
<script>

export default {
  name: 'MeCsActionNotes',
  props: {
    notes: {
      type: Array,
      default: () => []
    }
  }
}
</script>
