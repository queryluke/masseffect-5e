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
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-card-text>
        <component :is="component" v-if="component" />
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          @click="dialog = false"
        >
          Close
        </v-btn>
      </v-card-actions>
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
