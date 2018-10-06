<template lang="pug">
  span.feat
    a(@click="dialog = true") {{ name | titlecase }}
    v-dialog(v-model="dialog" v-bind:fullscreen="this.$vuetify.breakpoint.xsOnly" transition="dialog-bottom-transition" width="70vw" scrollable hide-overlay)
      v-card(tile)
        v-toolbar(card dark color="primary")
          v-btn(icon dark @click.native="dialog = false")
            v-icon close
          v-toolbar-title {{ name | titlecase }}
        v-card-text
          v-container(grid-list-lg fluid)
            markdown-file(:id="id" itemType="feats")
</template>

<script>
  export default {
    computed: {
      name () {
        return this.id.replace(/-/g, ' ')
      }
    },
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
  .feat .v-dialog__container {
    display: inline !important;
  }
</style>