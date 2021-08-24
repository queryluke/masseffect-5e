<template>
  <span>
    <span v-if="concentration">
      <span v-if="!abbr">
        {{ concentrationText }}
      </span>
      <span v-else>
        <v-avatar
          :color="cBackgroundColor"
          :size="cSize"
          :class="cTextColor"
          class="font-weight-bold"
          :alt="$t('concentration_title')"
        >
          {{ $t('concentration_abbr') }}
        </v-avatar>
        <span v-if="showDuration" class="ml-1">{{ durationText }}</span>
      </span>
    </span>
    <span v-else>
      {{ durationText }}
    </span>
  </span>
</template>

<script>
export default {
  name: 'MePowerDuration',
  props: {
    duration: {
      type: [Object, Boolean],
      default: false
    },
    concentration: {
      type: Boolean,
      default: true
    },
    showDuration: {
      type: Boolean,
      default: true
    },
    abbr: {
      type: Boolean,
      default: false
    },
    cSize: {
      type: Number,
      default: 16
    }
  },
  computed: {
    durationText () {
      return this.duration
        ? this.$tc(`times.${this.duration.time}`, this.duration.length, { n: this.duration.length })
        : '-'
    },
    cBackgroundColor () {
      return this.$vuetify.theme.dark ? 'white' : 'black'
    },
    cTextColor () {
      return this.$vuetify.theme.dark ? 'black--text' : 'white--text'
    },
    concentrationText () {
      return this.$t('concentration_text', {
        time: this.durationText
      })
    }
  }
}
</script>
