<template lang="pug">
  span.inline-dialog
    a(@click="dialog = true") {{ propertyName }}
    v-dialog(v-model="dialog" v-bind:fullscreen="this.$vuetify.breakpoint.xsOnly" transition="dialog-bottom-transition" width="70vw" scrollable hide-overlay)
      v-card(tile)
        v-toolbar(card dark color="primary")
          v-btn(icon dark @click.native="dialog = false")
            v-icon close
          v-toolbar-title {{ propertyName }}
        v-card-text
          v-container(grid-list-lg fluid) {{ text }}
</template>

<script>
import weaponProperties from '~/static/data/weapon_properties.json'

export default {
  name: 'WeaponProp',
  props: {
    propertyName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      dialog: false,
      weaponProperties
    }
  },
  computed: {
    property () {
      return weaponProperties.find(i => i.name === this.propertyName)
    },
    text () {
      if (this.property) {
        return this.property.description
      }
      return ''
    }
  }
}
</script>
