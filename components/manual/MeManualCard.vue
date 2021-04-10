<template>
  <div :id="item.id" class="mb-10">
    <h2 class="text-h4 my-3">
      {{ item.title }}
      <v-chip v-if="hasChip" :color="chipColor" :text-color="chipTextColor" class="ml-3" small>
        {{ chipText }}
      </v-chip>
    </h2>
    <v-progress-linear :value="100" color="primary" height="3" class="mb-3" />
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
      return this.item.is_new ? this.$t('site.new') : this.$t('site.change')
    }
  }
}
</script>
