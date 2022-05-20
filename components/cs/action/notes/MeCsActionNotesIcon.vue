<template>
  <me-cs-action-notes-tooltip :note="{tooltipText: note.text}">
    <v-icon :color="note.color" size="16" class="mt-n1">
      {{ note.icon }}
    </v-icon>
  </me-cs-action-notes-tooltip>
</template>
<script>

export default {
  name: 'MeCsActionNotesIcon',
  props: {
    note: {
      type: Object,
      default: () => {
        return {
          text: '',
          icon: '',
          color: ''
        }
      }
    }
  }
}
</script>
