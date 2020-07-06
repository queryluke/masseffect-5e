<template lang="pug">
  span.inline-dialog
    a(@click="dialog = true") {{ property.name }}
    v-dialog(v-model="dialog" v-bind:fullscreen="this.$vuetify.breakpoint.xsOnly" transition="dialog-bottom-transition" width="70vw" scrollable hide-overlay)
      v-card(tile)
        v-toolbar(card dark color="primary")
          v-btn(icon dark @click.native="dialog = false")
            v-icon close
          v-toolbar-title {{ property.name }}
        v-card-text
          v-container(grid-list-lg fluid) {{ property.description }}
</template>

<script>
export default {
  name: 'WeaponProp',
  props: {
    property: {
      type: Object,
      default: () => {
        return {
          name: '',
          description: ''
        }
      }
    }
  },
  data () {
    return {
      dialog: false
    }
  }
}
</script>
