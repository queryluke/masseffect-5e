<template>
  <me-cs-action-notes-tooltip :note="{tooltipText: note.text}">
    <v-icon :color="note.color" size="16" class="mt-n1" :class="!isFirst ? 'ml-1' : ''">
      {{ note.icon }}
    </v-icon>
    <span v-if="hasNext" class="ml-n1">,</span>
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
    },
    hasNext: {
      type: Boolean,
      default: false
    },
    isFirst: {
      type: Boolean,
      default: false
    }
  }
}
</script>
