<template>
  <v-container>
    <v-card>
      <v-card-text>
        <div class="text-overline text--primary">
          Conditions
        </div>
        <div class="mb-3">
          <me-item-title :title="item.name" />
        </div>
        <me-conditions-info :item="item" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  async asyncData ({ store }) {
    await store.dispatch('FETCH_DATA', 'conditions')
  },
  computed: {
    item () {
      return this.$store.getters.getItem('conditions', this.$route.params.id)
    }
  },
  created () {
    this.$store.dispatch('SET_META', {
      title: this.item.name,
      subTitle: this.$t('conditions_title'),
      description: this.$t('meta.info', { name: this.item.name })
    })
  }
}
</script>
