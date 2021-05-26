<template>
  <v-container>
    <me-page-title />
    <p v-for="(para, index) in $t('feat_intro')" :key="index">
      {{ para }}
    </p>
    <me-skeleton-loader :pending="$fetchState.pending" type="expansionList">
      <me-expansion-list
        :items="items"
        :headers="headers"
        :bookmarkable="false"
        type="feats"
      >
        <template #[`header.indicator`]="{ item }">
          <v-avatar :class="item.new ? 'deep-purple' : 'deep-orange'" size="30px" class="white--text text-caption my-n2">
            {{ item.new ? $t('new_title') : $t('phb') }}
          </v-avatar>
        </template>
        <template #body="{ item }">
          <p v-if="item.prerequisite">
            <strong>{{ $t('prerequisite_title') }}</strong>
            <em class="pl-1">
              {{ item.prerequisite }}
            </em>
          </p>
          <div class="text-body-2">
            <me-html :content="item.html" />
          </div>
        </template>
      </me-expansion-list>
    </me-skeleton-loader>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        { label: false, key: 'indicator', cols: 2, sm: 1, sortable: false },
        { label: 'name_title', key: 'name', cols: 10, sm: 5, lg: 2 },
        { label: 'prerequisite_title', key: 'prerequisite', cols: 3, classes: 'd-none d-lg-flex', sortable: false },
        { label: 'notes_title', key: 'note', cols: 6, classes: 'd-none d-sm-flex', sortable: false }
      ]
    }
  },
  async fetch () {
    this.$store.dispatch('SET_META', {
      title: this.$tc('feat_title', 2),
      description: this.$t('meta.feats')
    })
    await this.$store.dispatch('FETCH_DATA', 'feats')
  },
  computed: {
    items () {
      return this.$store.getters.getData('feats')
    }
  }
}
</script>
