<template>
  <v-card height="100%" flat>
    <v-card-text class="px-3">
      <v-text-field v-model="search" append-icon="mdi-magnify" dense label="Search" hide-details />
      <div class="d-flex justify-center mt-3">
        <me-cs-equipment-filter adder />
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
          <me-cs-equipment-add-btn :item="item" />
        </div>
      </template>
      <template #[`item.name`]="{ item }">
        <div style="max-width: 145px" class="text-caption">
          <me-cs-equipment-title :item="item" />
          <div class="mt-n1">
            <small>
              <me-cs-equipment-subtitle :item="item" :type="item.modelType" />
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
          <v-card flat color="transparent" width="300">
            <component :is="`me-cs-equipment-${item.modelType === 'weapons' ? 'weapon' : item.modelType}-info`" :item="item" />
          </v-card>
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
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
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
      expanded: []
    }
  },
  computed: {
    ...mapGetters({
      filter: 'navigation/equipmentAdderFilter',
      weapons: 'equipment/weaponsList',
      armor: 'equipment/armorList',
      gear: 'equipment/gearList'
    }),
    items () {
      const items = []
      for (const type of ['weapons', 'armor', 'gear']) {
        const models = this[type].map((i) => {
          return {
            ...i,
            modelType: type
          }
        })
        items.push(...models)
      }
      return items
    },
    filteredItems () {
      return this.items.filter((i) => {
        return this.filter && this.filter !== 'all' ? i.modelType === this.filter : true
      })
    }
  },
  methods: {
    expandItem (event, attrs) {
      if (attrs.isExpanded) {
        this.expanded = []
      } else {
        this.expanded.splice(0, 1, attrs.item)
      }
    }
  }
}
</script>
