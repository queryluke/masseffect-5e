<template>
  <v-tooltip bottom max-width="200">
    <template #activator="{ on, attrs }">
      <span v-bind="attrs" v-on="on">
        <slot>
          {{ note.text }}{{ hasNext ? ',' : '' }}
        </slot>
      </span>
    </template>
    <me-cs-action-notes-html v-if="note.isHtml" :note="{ text: note.tooltipText }" />
    <span v-else>
      {{ note.tooltipText }}
    </span>
  </v-tooltip>
</template>
<script>

export default {
  name: 'MeCsActionNotesTooltip',
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
    },
    hasNext: {
      type: Boolean,
      default: false
    }
  }
}
</script>
