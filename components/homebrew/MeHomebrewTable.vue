<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
      :expanded.sync="expanded"
      :search="search"
      show-expand
      class="mt-5"
      :footer-props="footerProps"
      @click:row="(item, slot) => slot.expand(!slot.isExpanded)"
      @update:options="getItems"
    >
      <template #top>
        <v-row class="px-3 mb-2">
          <v-col cols="12" md="6">
            <v-text-field v-model="search" hide-details label="Search" />
          </v-col>
          <v-col cols="12" md="6">
            <v-alert value type="info" dense>
              Items with the <em><strong>DEVELOPMENT</strong></em> status can be updated by the creator and might change without warning.
            </v-alert>
          </v-col>
        </v-row>
      </template>

      <template #[`item.type`]="{ item }">
        <v-avatar :color="modelConfig[item.model].color" size="26">
          <v-icon>
            {{ modelConfig[item.model].icon }}
          </v-icon>
        </v-avatar>
      </template>
      <template #[`item.title`]="{ item }">
        <div>
          <div>{{ item.title }}</div>
          <div class="text-caption font-italic">
            {{ item.profile.username || 'anonymous' }}
          </div>
        </div>
      </template>
      <template #[`item.publicationStatus`]="{ item }">
        <me-homebrew-pub-status-chip :item="item" />
      </template>
      <template #[`item.createdAt`]="{ item }">
        {{ $moment(item.createdAt).fromNow() }}
      </template>
      <template #[`item.actions`]="{ item }">
        <div class="d-flex justify-end">
          <div class="mx-3">
            <me-homebrew-add-btn :homebrew="item" @added="updateItemCounts(item, 1, 'usageCount')" @removed="updateItemCounts(item, -1, 'usageCount')" />
          </div>
          <div class="mx-3">
            <me-homebrew-vote-btn :homebrew="item" @voted="updateItemCounts(item, 1, 'voteCount')" @voteRemoved="updateItemCounts(item, -1, 'voteCount')" />
          </div>
        </div>
      </template>
      <template #expanded-item="{ headers: eiHeaders, item }">
        <td :colspan="eiHeaders.length">
          <component :is="`me-homebrew-preview-${item.model}`" :item="JSON.parse(item.data)" />
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { homebrewModelConfig } from '~/mixins/homebrewModelConfig'
export default {
  name: 'MeMyHomebrewTable',
  mixins: [homebrewModelConfig],
  props: {
    selectedModel: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      search: null,
      headers: [
        { text: '', value: 'data-table-expand' },
        { text: 'Type', value: 'type' },
        { text: 'Name', value: 'title', align: 'start' },
        { text: 'Status', value: 'publicationStatus', sortable: false },
        { text: 'Votes', value: 'voteCount', align: 'center' },
        { text: 'Adds', value: 'usageCount', align: 'center' },
        { text: 'Created', value: 'createdAt', align: 'center' },
        { text: '', value: 'actions', sortable: false }
      ],
      footerProps: {
        itemsPerPageOptions: [10, 20, 50]
      },
      items: [],
      expanded: [],
      loading: false,
      confirmDeleteItem: {},
      confirmDeleteDialog: false
    }
  },
  computed: {
    myId () {
      return this.$store.getters['auth/username']
    }
  },
  watch: {
    selectedModel: {
      async handler () {
        if (Object.keys(this.modelConfig).includes(this.selectedModel)) {
          await this.getItems()
        }
      }
    }
  },
  methods: {
    updateItemCounts (item, increment, key) {
      const newItems = this.items.slice()
      const index = newItems.findIndex(i => i.id === item.id)
      if (index > -1) {
        const newItem = { ...item, [key]: Math.max(0, (item[key] + increment)) }
        newItems.splice(index, 1, newItem)
      }
      this.items = newItems
    },
    async getItems () {
      if (this.loading) {
        return
      }
      if (!Object.keys(this.modelConfig).includes(this.selectedModel)) {
        return
      }
      this.loading = true
      this.expanded = []
      const allItems = []
      const query = 'homebrewByModel'
      const variables = { model: this.selectedModel, private: { eq: 0 } }
      let nextToken = null
      do {
        variables.nextToken = nextToken
        const response = await this.$store.dispatch('api/QUERY', { query, variables })
        if (response?.items?.length) {
          allItems.push(...response.items)
        }
        nextToken = response?.nextToken || null
      } while (nextToken !== null)
      this.items = allItems
      this.loading = false
    }
  }
}
</script>
