<template>
  <span class="text-caption font-weight-light d-inline">
    <template v-for="(note, index) of notes">
      <div v-if="note.type" :key="index" class="d-inline">
        <component :is="`me-cs-action-notes-${note.type}`" :note="note" />
        <span v-if="index < notes.length - 1" class="ml-n1">,</span>
      </div>
    </template>
  </span>
</template>
<script>

export default {
  name: 'MeCsActionNotesList',
  props: {
    notes: {
      type: Array,
      default: () => []
    }
  }
}
</script>
