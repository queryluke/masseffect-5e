<template>
  <span class="text-caption font-weight-light d-inline">
    <template v-for="(note, index) of notes">
      <div v-if="note.type" :key="index" class="d-inline">
        <component :is="`me-cs-action-notes-${note.type}`" :note="note" :has-next="index < notes.length - 1" :is-first="index === 0" />
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
