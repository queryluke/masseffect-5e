<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :loading="loading"
    :options.sync="options"
    :expanded.sync="expanded"
    show-expand
    class="mt-5"
    @click:row="(item, slot) => slot.expand(!slot.isExpanded)"
    @update:options="getItems"
  >
    <template #top>
      <v-row class="px-3">
        <v-col cols="8">
          <v-text-field v-model="search" hide-details label="Search" />
        </v-col>
        <v-col cols="4">
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
                <v-icon :color="typeMap[selection].color">
                  {{ typeMap[selection].icon }}
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
                <v-icon :color="typeMap[selectItem].color">
                  {{ typeMap[selectItem].icon }}
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
      <v-avatar :color="typeMap[item.model].color" size="26">
        <v-icon>
          {{ typeMap[item.model].icon }}
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
      <v-chip x-small :color="statusColors[item.publicationStatus]" outlined>
        <span class="text-uppercase">
          {{ item.publicationStatus }}
        </span>
      </v-chip>
    </template>
    <template #[`item.actions`]="{ item }">
      <div class="d-flex justify-space-around">
        <me-homebrew-vote-btn :homebrew="item" @voted="updateItemCounts(item, 1, 'voteCount')" @voteRemoved="updateItemCounts(item, -1, 'voteCount')" />
        <me-homebrew-add-btn :homebrew="item" @added="updateItemCounts(item, 1, 'usageCount')" @removed="updateItemCounts(item, -1, 'usageCount')" />
        <v-btn v-if="mine" icon :to="`/homebrew/edit/?id=${item.id}`" exact small>
          <v-icon small>
            mdi-pencil
          </v-icon>
        </v-btn>
      </div>
    </template>
    <template #expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <component :is="`me-homebrew-preview-${item.model}`" :item="JSON.parse(item.data)" />
      </td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'MeHomebrewTable',
  props: {
    mine: {
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
      myHbOnly: false,
      headers: [
        { text: '', value: 'data-table-expand' },
        { text: 'Type', value: 'type', sortable: false },
        { text: 'Name', value: 'title', align: 'start' },
        { text: 'Status', value: 'publicationStatus', sortable: false },
        { text: 'Votes', value: 'voteCount', align: 'center' },
        { text: 'Adds', value: 'usageCount', align: 'center' },
        { text: '', value: 'actions', sortable: false }
      ],
      typeMap: {
        powers: {
          icon: 'mdi-fire',
          color: 'purple lighten-1'
        }
      },
      sortingOptions: {
        usageCount: 1,
        voteCount: 2,
        title: 3,
        createdAt: 4
      },
      items: [],
      expanded: [],
      options: {
        sortBy: [],
        sortDesc: []
      },
      loading: true,
      statusColors: {
        private: 'error',
        campaign: 'warning',
        development: 'info',
        published: 'success'
      }
    }
  },
  computed: {
    myId () {
      return this.$store.getters['auth/username']
    }
  },
  watch: {
    options: {
      async handler () {
        await this.getItems()
      },
      deep: true
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
      this.loading = true
      this.expanded = []
      const sortBy = this.options.sortBy[0]
      let sortDesc = this.options.sortDesc[0]
      const variables = {}
      let query = ''
      switch (sortBy) {
        case 'usageCount':
          query = 'homebrewSortedByUsage'
          variables.sortHackUsage = 1
          break
        case 'voteCount':
          query = 'homebrewSortedByVotes'
          variables.sortHackVotes = 2
          break
        case 'title':
          query = 'homebrewSortedByTitle'
          variables.sortHackTitle = 3
          sortDesc = !!sortDesc
          break
        default:
          query = 'homebrewSortedByCreatedAt'
          variables.sortHackCreatedAt = 4
          break
      }
      variables.sortDirection = sortDesc ? 'ASC' : 'DESC'
      const filters = { and: {} }
      if (this.mine) {
        filters.and = {
          owner: {
            eq: this.myId
          }
        }
      } else {
        filters.and = {
          publicationStatus: {
            ne: 'private'
          }
        }
      }
      if (this.model) {
        filters.and = {
          model: {
            eq: this.model
          }
        }
      }
      const search = this.search && this.search !== '' ? this.search : null
      if (search) {
        filters.and = {
          title: {
            contains: this.search
          }
        }
      }
      variables.filter = filters
      const response = await this.$store.dispatch('api/QUERY', { query, variables })
      this.items = response?.items || []
      this.loading = false
    }
  }
}
</script>
