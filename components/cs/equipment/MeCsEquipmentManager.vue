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
          <v-btn outlined color="primary" x-small @click="addItem(item)">
            Add
          </v-btn>
        </div>
      </template>
      <template #[`item.name`]="{ item }">
        <div style="max-width: 145px" class="text-caption">
          <me-cs-equipment-title :item="item" />
          <div class="mt-n1">
            <small>
              <me-cs-equipment-subtitle :item="item" />
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
          More info about {{ item.name }}
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
      rarity: null,
      customArmorRules: {
        name: [v => !!v || 'Name is required'],
        placement: [v => !!v || 'Placement is required'],
        type: [v => !!v || 'Type is required']
      },
      customArmor: {
        name: null,
        placement: null,
        type: null,
        html: null
      },
      defaultCustomArmor: {
        name: null,
        placement: null,
        type: null,
        html: null
      },
      armorTypes: ['light', 'medium', 'heavy'],
      armorPlacements: ['head', 'chest', 'arms', 'legs'],
      tab: 0,
      customArmorAdded: false,
      customArmorAdding: false
    }
  },
  computed: {
    filter () {
      return this.$store.getters['character/navigation/equipmentAdderFilter']
    },
    items () {
      const items = []
      for (const type of ['weapons', 'armor']) {
        const models = this.$store.getters.getData(type).map((i) => {
          return {
            ...i,
            modelType: type
          }
        })
        items.push(...models)
      }
      return [...items, ...this.$store.getters['character/equipment/gearList']]
    },
    filteredItems () {
      return this.items.filter((i) => {
        return this.filter && this.filter !== 'all' ? i.modelType === this.filter : true
      })
    }
  },
  methods: {
    addItem (item) {
      console.log(item)
    },
    expandItem (event, attrs) {
      if (attrs.isExpanded) {
        this.expanded = []
      } else {
        this.expanded.splice(0, 1, attrs.item)
      }
    },
    submitCustomArmor () {
      if (this.customArmor.name && this.customArmor.placement && this.customArmor.type) {
        const customArmor = {
          type: 'armor',
          custom: this.customArmor,
          equipped: false,
          mods: [],
          id: this.customArmor.name.replaceAll(/\W/g, '-') + new Date().getTime(),
          uuid: this.customArmor.name.replaceAll(/\W/g, '-') + new Date().getTime()
        }
        this.customArmorAdding = true
        this.$store.dispatch('character/equipment/ADD_EQUIPMENT', customArmor)
        this.customArmorAdding = false
        this.customArmorAdded = true
        setTimeout(() => {
          this.customArmorAdded = false
          this.tab = 0
          this.customArmor = { ...this.defaultCustomArmor }
        }, 1000)
      }
    }
  }
}
</script>
