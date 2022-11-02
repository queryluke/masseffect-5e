<template>
  <v-tooltip
    v-model="shareTooltip"
    :disabled="!shareTooltip"
    left
    :close-delay="1000"
  >
    <template #activator="{on, attrs}">
      <v-btn icon small v-bind="attrs" @click.stop="share" v-on="on">
        <v-icon small>
          mdi-share
        </v-icon>
      </v-btn>
    </template>
    <span>{{ shareTooltipMessage }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'MeHomebrewShareBtn',
  props: {
    id: {
      type: String,
      required: true
    },
    large: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      shareTooltip: false,
      shareTooltipMessage: ''
    }
  },
  methods: {
    async share () {
      let timeout = 1000
      if (!navigator.clipboard) {
        this.shareTooltipMessage = 'Error copying, you can copy from the address bar'
        timeout = 2000
      } else {
        await navigator.clipboard.writeText(`${window.location.origin}/homebrew/view/?id=${this.id}`)
        this.shareTooltipMessage = 'Link Copied!'
      }
      this.shareTooltip = true
      setTimeout(() => {
        this.shareTooltip = false
      }, timeout)
    }
  }
}
</script>
