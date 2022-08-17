<template>
  <v-card-actions>
    <v-btn color="primary" :loading="saving" @click="$emit('save')">
      Save
    </v-btn>
  </v-card-actions>
</template>

<script>
export default {
  name: 'MeHomebrewEditorActions',
  props: {
    publicationStatus: {
      type: String,
      default: 'private'
    },
    saving: {
      type: Boolean,
      default: false
    }
  }
}
</script>
