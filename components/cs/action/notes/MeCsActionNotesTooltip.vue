<template>
  <v-tooltip bottom max-width="200">
    <template #activator="{ on, attrs }">
      <span v-bind="attrs" v-on="on">
        <slot>
          {{ note.text }}
        </slot>
      </span>
    </template>
    <me-html v-if="note.isHtml" :content="note.tooltipText" inline />
    <span v-else>
      {{ note.tooltipText }}
    </span>
  </v-tooltip>
</template>
<script>

export default {
  name: 'MeCsActionNotesText',
  props: {
    note: {
      type: Object,
      default: () => {
        return {
          text: '',
          tooltipText: '',
          isHtml: false
        }
      }
    }
  }
}
</script>
