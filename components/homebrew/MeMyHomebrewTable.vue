<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="filteredItems"
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
          <v-col cols="7">
            <v-text-field v-model="search" hide-details label="Search" />
          </v-col>
          <v-col cols="4" offset="1">
            <v-select
              v-model="modelType"
              hide-details
              label="Filter by type"
              :items="modelTypes"
              :menu-props="{offsetY: true}"
              clearable
            >
              <template #selection="{ item: selection }">
                <v-list-item-action class="my-0 py-0">
                  <v-icon :color="modelConfig[selection].color">
                    {{ modelConfig[selection].icon }}
                  </v-icon>
                </v-list-item-action>
                <v-list-item-content class="my-0 py-0">
                  <v-list-item-title class="text-capitalize">
                    {{ selection }}
                  </v-list-item-title>
                </v-list-item-content>
              </template>
              <template #item="{ item: selectItem }">
                <v-list-item-action>
                  <v-icon :color="modelConfig[selectItem].color">
                    {{ modelConfig[selectItem].icon }}
                  </v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="text-capitalize">
                    {{ selectItem }}
                  </v-list-item-title>
                </v-list-item-content>
              </template>
            </v-select>
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
            {{ item.profile.username }}
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
          <div v-if="!collection" class="mx-3">
            <v-btn icon :to="`/homebrew/edit/?id=${item.id}`" exact small>
              <v-icon small>
                mdi-pencil
              </v-icon>
            </v-btn>
          </div>
          <div v-if="!collection" class="mx-3">
            <v-btn icon small color="error" @click.stop="deleteHomebrew(item)">
              <v-icon small>
                mdi-delete
              </v-icon>
            </v-btn>
          </div>
        </div>
      </template>
      <template #expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <component :is="`me-homebrew-preview-${item.model}`" :item="JSON.parse(item.data)" />
        </td>
      </template>
    </v-data-table>
    <me-homebrew-delete-dialog :show="confirmDeleteDialog" :item="confirmDeleteItem" @close="cancelDelete" @deleted="deleted" />
  </div>
</template>

<script>
import { homebrewModelConfig } from '~/mixins/homebrewModelConfig'
export default {
  name: 'MeMyHomebrewTable',
  mixins: [homebrewModelConfig],
  props: {
    collection: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      search: null,
      modelTypes: [
        'powers'
      ],
      modelType: null,
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
        itemsPerPageOptions: [20, 50, 100]
      },
      items: [],
      expanded: [],
      loading: false,
      confirmDeleteItem: {},
      confirmDeleteDialog: false
    }
  },
  async fetch () {
    await this.getItems()
  },
  computed: {
    myId () {
      return this.$store.getters['auth/username']
    },
    filteredItems () {
      if (this.modelType) {
        return this.items.filter(i => i.model === this.modelType)
      }
      return this.items
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
      this.loading = true
      this.expanded = []
      let allItems = []
      if (this.collection) {
        await this.$store.dispatch('FETCH_HOMEBREW_DATA')
        allItems = this.$store.getters.rawHomebrew.slice()
      } else {
        const query = 'homebrewByUser'
        const variables = { owner: this.myId }
        let nextToken = null
        do {
          variables.nextToken = nextToken
          const response = await this.$store.dispatch('api/QUERY', { query, variables })
          if (response?.items?.length) {
            allItems.push(...response.items)
          }
          nextToken = response?.nextToken || null
        } while (nextToken !== null)
      }
      this.items = allItems
      this.loading = false
    },
    deleteHomebrew (item) {
      this.confirmDeleteItem = item
      this.confirmDeleteDialog = true
    },
    async deleted () {
      this.cancelDelete()
      await this.getItems()
    },
    cancelDelete () {
      this.confirmDeleteItem = {}
      this.confirmDeleteDialog = false
    }
  }
}
</script>
