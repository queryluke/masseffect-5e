<template>
  <div class="text-caption font-weight-light">
    <template v-for="(note, index) of notes">
      <me-html :key="index" :content="note" inline classes="text-caption" />
      <span v-if="index < notes.length - 1" :key="`note-comma-${index}`" class="ml-n1">, </span>
    </template>
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
