<template>
  <v-dialog
    v-model="mobileFilterDialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar color="primary">
        <v-toolbar-title>
          {{ title }}
        </v-toolbar-title>
        <v-btn icon @click.native="mobileFilterDialog = !mobileFilterDialog">
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
        <v-card-text>
          <slot name="filters" />
        </v-card-text>
      </v-toolbar>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'MeMobileFilters',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    mobileFilterDialog: {
      get () {
        return this.$store.getters.mobileFilterDialog
      },
      set (value) {
        return this.$store.commit('mobileFilterDialog', value)
      }
    }
  }
}
</script>
