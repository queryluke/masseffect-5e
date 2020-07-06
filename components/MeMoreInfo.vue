<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    :hide-overlay="$vuetify.breakpoint.xsOnly"
    :transition="$vuetify.breakpoint.xsOnly ? 'dialog-bottom-transition' : 'dialog-transition'"
    width="70vw"
    scrollable
  >
    <template v-slot:activator="{ on }">
      <v-btn color="secondary" class="mb-5" v-on="on">
        {{ title }}
      </v-btn>
    </template>

    <v-card>
      <v-toolbar color="secondary">
        <v-btn icon @click="dialog=false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>
          {{ title }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <component :is="component" v-if="component" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    component: {
      type: String,
      default: ''
    },
    mdFile: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      dialog: false
    }
  }
}
</script>
