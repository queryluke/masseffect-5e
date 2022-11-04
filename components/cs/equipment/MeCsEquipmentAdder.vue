<template>
  <div>
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
      :mobile-breakpoint="1"
      @click:row="expandItem"
      @page-count="pageCount = $event"
    >
      <template #[`item.actions`]="{ item }">
        <div style="max-width: 20px">
          <v-btn
            v-if="vendor"
            color="error"
            x-small
            icon
            @click.stop="$emit('add-to-cart', item)"
          >
            <v-badge dot :value="cartIds.filter(i => i === item.id).length">
              <v-icon>
                mdi-cart-plus
              </v-icon>
            </v-badge>
          </v-btn>
          <me-cs-equipment-add-btn v-else :item="item" />
        </div>
      </template>
      <template #[`item.name`]="{ item }">
        <div style="max-width: 125px" class="text-caption">
          <me-cs-equipment-title :rarity="item.rarity" :homebrew="!!item.homebrew">
            {{ item.name }}
          </me-cs-equipment-title>
          <div class="mt-n1">
            <small>
              <me-cs-equipment-subtitle :model="item.modelType" :type="item.type" :additional="{ placement: item.placement }" />
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
          <v-card flat color="transparent" :width="$vuetify.breakpoint.xsOnly ? 240 : 300">
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
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCsEquipmentAdder',
  props: {
    vendor: {
      type: Boolean,
      default: false
    },
    cartIds: {
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
        { text: '', value: 'actions', filterable: false, sortable: false, cellClass: 'pr-0 pl-3' },
        { text: 'Name', value: 'name', align: 'start' },
        { text: 'Cost', value: 'cost', filterable: false, align: 'center' }
      ],
      expanded: [],
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      character: 'character',
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
        if (i.notAddable) {
          return false
        }
        if (this.vendor && (isNaN(i.cost) || i.cost === 0)) {
          return false
        }
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
