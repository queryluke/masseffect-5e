<template>
  <v-card flat tile>
    <v-card-title>
      <me-weapon-title
        :item="item"
      />
    </v-card-title>
    <v-card-text v-if="!loading">
      <me-weapon-info :item="item" />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'MeHomebrewPreviewWeapon',
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
