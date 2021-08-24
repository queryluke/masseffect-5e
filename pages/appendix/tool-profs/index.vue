<template>
  <v-container>
    <v-row align-content="space-around">
      <v-col>
        <me-page-title />
      </v-col>
      <v-col class="text-right">
        <v-btn to="/manual/equipment#tools-kits" nuxt outlined color="primary">
          {{ $t('rules_title') }}
        </v-btn>
      </v-col>
    </v-row>
    <me-skeleton-loader :pending="$fetchState.pending" type="expansionList">
      <me-expansion-list
        :items="items"
        :headers="headers"
        type="appendix/tool-profs"
        :bookmarkable="false"
      >
        <template #[`header.name`]="{ item }">
          <div>
            {{ item.name }}
          </div>
          <div v-if="item.type" class="text-caption">
            {{ $t(`tool_prof_types.${item.type}`) }}
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
        { label: 'Name', key: 'name' }
      ]
    }
  },
  async fetch () {
    this.$store.dispatch('SET_META', {
      title: this.$t('tool_profs_title'),
      subtitle: this.$t('appendix_title'),
      description: this.$t('meta.tool_profs')
    })
    await this.$store.dispatch('FETCH_DATA', 'tool-profs')
  },
  computed: {
    items () {
      return this.$store.getters.getData('tool-profs')
    }
  }
}
</script>
