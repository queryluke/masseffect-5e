<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <span v-bind="attrs" v-on="on">
        <slot>
          {{ note.text }}
        </slot>
      </span>
    </template>
    <span>
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
          tooltipText: ''
        }
      }
    }
  }
}
</script>
