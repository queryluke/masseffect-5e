<template>
  <v-container>
    <me-page-title />
    <p v-for="(para, index) in $t('character.feat.intro')" :key="index">
      {{ para }}
    </p>
    <me-skeleton-loader :pending="$fetchState.pending" type="expansionList">
      <me-expansion-list
        :items="items"
        :headers="headers"
        type="feats"
        :bookmarkable="false"
      >
        <template #[`header.indicator`]="{ item }">
          <v-avatar :class="item.new ? 'deep-purple' : 'deep-orange'" size="30px" class="white--text text-caption my-n2">
            {{ item.new ? $t('chips.new') : $t('chips.phb') }}
          </v-avatar>
        </template>
        <template #body="{ item }">
          <p v-if="item.prerequisite">
            <strong>{{ $t('character.feat.prereq') }}</strong>
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
  async fetch () {
    this.$store.commit('pageTitle', this.$t('character.feat.title'))
    await this.$store.dispatch('FETCH_DATA', 'feats')
  },
  head () {
    return {
      title: 'Feats | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'New feats available! Plus a curated list of D&D 5th edition feats.' }
      ]
    }
  },
  computed: {
    headers () {
      return this.$store.getters['config/featHeaders']
    },
    items () {
      return this.$store.getters.getData('feats')
    }
  }
}
</script>
