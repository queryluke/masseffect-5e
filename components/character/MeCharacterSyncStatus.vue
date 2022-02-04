<template>
  <v-icon v-if="isAuthenticated" :title="text[status]" :color="colors[status]">
    {{ icons[status] }}
  </v-icon>
</template>

<script>

export default {
  props: {
    fab: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      icons: {
        editing: 'mdi-cloud-sync-outline',
        syncing: 'mdi-cloud-sync-outline',
        saved: 'mdi-cloud-check-outline',
        error: 'mdi-cloud-off-outline'
      },
      colors: {
        editing: 'primary',
        syncing: 'primary lighten-1',
        saved: null,
        error: 'error'
      },
      text: {
        editing: 'Editing...',
        syncing: 'Syncing...',
        saved: 'Saved',
        error: 'Error!'
      }
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters['auth/isAuthenticated']
    },
    status () {
      return this.$store.getters['user/syncStatus']
    }
  }
}
</script>
