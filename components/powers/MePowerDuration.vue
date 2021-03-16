<template>
  <span>
    <span v-if="item.concentration">
      <span v-if="!abbr">Concentration, up to {{ duration }}</span>
      <span v-else>
        <v-avatar :color="cBackgroundColor" :size="cSize" :class="cTextColor" class="font-weight-bold" alt="concentration">C</v-avatar>
        <span v-if="showDuration" class="ml-1">{{ duration }}</span>
      </span>
    </span>
    <span v-else>
      {{ duration }}
    </span>
  </span>
</template>

<script>
export default {
  name: 'MePowerDuration',
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          concentration: '',
          duration: ''
        }
      }
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
    duration () {
      return this.item.duration ? this.item.duration : '-'
    },
    cBackgroundColor () {
      return this.$vuetify.theme.dark ? 'white' : 'black'
    },
    cTextColor () {
      return this.$vuetify.theme.dark ? 'black--text' : 'white--text'
    }
  }
}
</script>
