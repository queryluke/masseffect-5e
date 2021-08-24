<template>
  <v-chip
    v-if="hasChip"
    :color="chipColor"
    :text-color="chipTextColor"
    class="ml-3"
    :small="small"
    :x-small="xSmall"
  >
    {{ chipText }}
  </v-chip>
</template>

<script>

export default {
  name: 'MeRuleChip',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    small: {
      type: Boolean,
      default: false
    },
    xSmall: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hasChip () {
      return this.item.is_new || this.item.is_change
    },
    chipColor () {
      return this.item.is_new ? 'info' : 'warning'
    },
    chipTextColor () {
      return this.item.is_new ? 'white' : 'black'
    },
    chipText () {
      return this.item.is_new ? this.$t('new') : this.$t('change')
    }
  }
}
</script>
