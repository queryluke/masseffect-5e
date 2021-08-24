<template>
  <div :id="item.id" class="mb-10">
    <h2 class="text-h4 my-3">
      {{ item.title }}
      <me-rule-chip small :item="item" />
    </h2>
    <me-hr />
    <div>
      <me-html :content="item.html" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'MeManualCard',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
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
      return this.item.is_new ? this.$t('chips.new') : this.$t('chips.change')
    }
  }
}
</script>
