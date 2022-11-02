<template>
  <v-card flat tile>
    <v-card-title>
      <me-item-title
        :title="item.name"
        avatar
        :avatar-src="require(`~/assets/images/powers/${item.type}.svg`)"
      />
    </v-card-title>
    <v-card-text v-if="!loading">
      <me-power-info :item="item" />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'MeHomebrewPreviewPowers',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: true
    }
  },
  watch: {
    item () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 500)
    }
  },
  created () {
    this.loading = false
  }
}
</script>
