<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :loading="loading"
    :options.sync="options"
    :expanded.sync="expanded"
    class="mt-5"
    @click:row="(item, slot) => slot.expand(!slot.isExpanded)"
    @update:options="getItems"
  >
    <template #top>
      <v-row class="px-3">
        <v-col cols="8">
          <v-text-field v-model="search" hide-details label="Search" />
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
    <template #[`item.actions`]="{ item }">
      <v-btn v-if="mine" icon :to="`/homebrew/edit/?id=${item.id}`" exact small>
        <v-icon small>
          mdi-pencil
        </v-icon>
      </v-btn>
      <v-btn icon small>
        <v-icon small>
          mdi-eye
        </v-icon>
      </v-btn>
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
      headers: [
        { text: '', value: 'type', sortable: false },
        { text: 'Name', value: 'title', align: 'start' },
        { text: 'Status', value: 'publicationStatus', sortable: false },
        { text: 'Votes', value: 'voteCount' },
        { text: 'Adds', value: 'usageCount' },
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
      loading: true
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
