<template>
  <v-container>
    <me-page-title />
    <me-skeleton-loader :pending="$fetchState.pending" type="articleList">
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.name"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ item.name }}<me-rule-chip :item="item" x-small />
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ $t(`abilities.${item.link}.title`) }}
            </v-list-item-subtitle>
            <div class="text-body-2 font-weight-light">
              <me-html :content="item.html" />
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </me-skeleton-loader>
  </v-container>
</template>

<script>
export default {
  async fetch () {
    this.$store.dispatch('SET_META', {
      title: this.$t('skills_title'),
      subtitle: this.$t('appendix_title'),
      description: this.$t('meta.skills')
    })
    await this.$store.dispatch('FETCH_DATA', 'skills')
  },
  computed: {
    items () {
      return this.$store.getters.getData('skills')
    }
  }
}
</script>
