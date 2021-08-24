<template>
  <v-dialog
    :value="shown"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    :transition="transition"
    width="70vw"
    scrollable
    @click:outside="$emit('close')"
  >
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
          @click="$emit('close')"
        >
          {{ $t('buttons.close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'MeStandardDialog',
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      default: ''
    },
    shown: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    transition () {
      return this.$vuetify.breakpoint.xsOnly ? 'dialog-bottom-transition' : 'dialog-transition'
    }
  }
}
</script>
