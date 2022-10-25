<template>
  <v-dialog
    :value="shown"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    :transition="transition"
    :max-width="800"
    scrollable
    @click:outside="$emit('close')"
  >
    <v-card :max-height="maxHeight || undefined">
      <v-card-title>
        <slot name="title">
          {{ title }}
        </slot>
      </v-card-title>
      <v-card-text>
        <slot>
          <me-html v-if="shown" :content="content" />
        </slot>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          @click="$emit('close')"
        >
          {{ $t('buttons.close') }}
        </v-btn>
        <v-spacer />
        <slot name="addActions" />
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
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    shown: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    transition () {
      return this.$vuetify.breakpoint.xsOnly ? 'dialog-bottom-transition' : 'dialog-transition'
    }
  }
}
</script>
