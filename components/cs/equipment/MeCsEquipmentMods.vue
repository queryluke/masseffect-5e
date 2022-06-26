<template>
  <v-card height="100%" flat>
    <v-card-text class="px-3">
      <v-text-field v-model="search" append-icon="mdi-magnify" dense label="Search" hide-details />
      <div v-if="sfOptions.length" class="mt-2">
        <v-btn-toggle v-model="sfValue" color="primary" borderless>
          <v-btn v-for="sf in sfOptions" :key="`sf-${sf}`" x-small :value="sf">
            {{ sf }}
          </v-btn>
        </v-btn-toggle>
      </div>
    </v-card-text>
    <v-data-table
      :items="filteredItems"
      :headers="tableHeaders"
      :search="search"
      single-expand
      :expanded.sync="expanded"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      hide-default-footer
      :items-per-page="10"
      :page.sync="page"
      @click:row="expandItem"
      @page-count="pageCount = $event"
    >
      <template #[`item.actions`]="{ item }">
        <div style="max-width: 30px">
          <v-btn x-small color="primary" outlined :disabled="isSelected(item.id)" @click.stop="add(item)">
            <v-icon v-if="isSelected(item.id)">
              mdi-check
            </v-icon>
            <span v-else>
              Add
            </span>
          </v-btn>
        </div>
      </template>
      <template #[`item.name`]="{ item }">
        <div style="max-width: 145px" class="text-caption">
          <me-cs-equipment-title :rarity="item.rarity">
            {{ item.name }}
          </me-cs-equipment-title>
          <div class="mt-n1 text-capitalize">
            <small>
              {{ item.placement }}
            </small>
          </div>
        </div>
      </template>
      <template #[`item.cost`]="{ item }">
        <div class="text-caption">
          <span v-if="isNaN(item.cost) || item.cost === 0">
            -
          </span>
          <span v-else>
            {{ item.cost | groupDigits(',') }}
          </span>
        </div>
      </template>
      <template #expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <me-html :content="item.html" :classes="'text-caption'" />
        </td>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination
        v-model="page"
        :length="pageCount"
        :total-visible="0"
        circle
        color="primary"
      />
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    filters: {
      type: Array,
      required: true
    },
    secondaryFilter: {
      type: [Object, Boolean],
      default: false
    },
    current: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      search: null,
      sortBy: 'name',
      sortDesc: false,
      page: 1,
      pageCount: 0,
      tableHeaders: [
        { text: '', value: 'actions', filterable: false, sortable: false },
        { text: 'Name', value: 'name', align: 'start' },
        { text: 'Cost', value: 'cost', filterable: false, align: 'center' }
      ],
      expanded: [],
      sfValue: 'all'
    }
  },
  computed: {
    items () {
      return this.$store.getters.getData('mods')
    },
    filteredItems () {
      return this.items.filter((i) => {
        const tests = []
        for (const filter of this.filters) {
          tests.push(i[filter.attr].includes(filter.value))
        }
        if (this.secondaryFilter) {
          if (this.sfValue === 'all') {
            tests.push(true)
          } else {
            tests.push(i[this.secondaryFilter.attr] === this.sfValue)
          }
        }
        return tests.every(i => i)
      })
    },
    sfOptions () {
      if (!this.secondaryFilter) {
        return []
      }
      return ['all', ...this.secondaryFilter.options]
    }
  },
  methods: {
    add (item) {
      this.$emit('add', item)
    },
    expandItem (event, attrs) {
      if (attrs.isExpanded) {
        this.expanded = []
      } else {
        this.expanded.splice(0, 1, attrs.item)
      }
    },
    isSelected (id) {
      return this.current.includes(id)
    }
  }
}
</script>
