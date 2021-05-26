<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    :transition="transition"
    width="70vw"
    scrollable
  >
    <template #activator="{ on }">
      <a
        :class="linkCss"
        v-on="on"
      >{{ linkText }}</a>
    </template>
    <v-card>
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-card-text>
        <slot>
          <me-html :content="content" />
        </slot>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          @click.native="dialog = false"
        >
          {{ $t('buttons.close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'MeMoreInfoDialog',
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      default: ''
    },
    linkCss: {
      type: String,
      default: ''
    },
    text: {
      type: [String, Boolean],
      default: false
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    transition () {
      return this.$vuetify.breakpoint.xsOnly ? 'dialog-bottom-transition' : 'dialog-transition'
    },
    linkText () {
      return this.text ? this.text : this.title
    }
  }
}
</script>
