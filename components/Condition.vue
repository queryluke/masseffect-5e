<template lang="pug">
  span.condition
    a(@click="dialog = true") {{ id }}
    v-dialog(v-model="dialog" v-bind:fullscreen="this.$vuetify.breakpoint.xsOnly" transition="dialog-bottom-transition" width="70vw" scrollable hide-overlay)
      v-card(tile)
        v-toolbar(card dark color="primary")
          v-btn(icon dark @click.native="dialog = false")
            v-icon close
          v-toolbar-title {{ id | capitalize }}
        v-card-text
          v-container(grid-list-lg fluid)
            markdown-file(:id="id" itemType="conditions")
</template>

<script>
  export default {
    data () {
      return {
        dialog: false
      }
    },
    props: {
      id: String
    }
  }
</script>

<style>
  .condition .v-dialog__container {
    display: inline !important;
  }
</style>