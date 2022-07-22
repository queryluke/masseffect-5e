<template>
  <div>
    <v-card-text class="px-3">
      <v-text-field v-model="search" append-icon="mdi-magnify" dense label="Search" hide-details />
      <div class="d-flex justify-space-between mt-3">
        <me-cs-equipment-filter adder />
        <v-badge
          :content="cart.length"
          :value="cart.length"
          bottom
          left
          overlap
          color="error"
        >
          <v-btn small outlined color="error" @click="purchaseDialog = true">
            <v-icon>
              mdi-cart
            </v-icon>
          </v-btn>
        </v-badge>
      </div>
    </v-card-text>

    <v-dialog v-model="purchaseDialog" max-width="500">
      <v-card>
        <v-card-title>Purchase Gear</v-card-title>
        <v-card-text>
          <v-slider v-model="discount" step="5" min="-100" max="100">
            <template #label>
              <div style="width: 150px">
                {{ discountLabel }}
              </div>
            </template>
          </v-slider>
          <v-list dense>
            <v-list-item v-for="cartItem of groupedCart" :key="cartItem.item.id">
              <v-list-item-action>
                <v-btn icon small color="error" @click="deleteCartItem(cartItem.item.id)">
                  <v-icon>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ cartItem.item.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  Amount: {{ cartItem.count }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action-text>
                {{ cartItem.subtotal | groupDigits(',') }}
              </v-list-item-action-text>
            </v-list-item>
            <v-divider />
            <v-list-item>
              <v-list-item-action-text>
                <span class="font-weight-bold">
                  Total: {{ totalPurchase | groupDigits(',') }}
                </span>
                <span class="font-italic">
                  (credits remaining {{ creditsAfterPurchase | groupDigits(',') }})
                </span>
              </v-list-item-action-text>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn outlined color="primary" small :loading="loading" @click="purchase">
            Purchase
          </v-btn>
          <v-spacer />
          <v-btn outlined small :disabled="loading" @click="cart = []; purchaseDialog = false">
            Clear Cart
          </v-btn>
          <v-btn outlined small :disabled="loading" @click="purchaseDialog = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
        <div style="max-width: 20px">
          <me-cs-equipment-add-btn :item="item" />
        </div>
      </template>
      <template #[`item.name`]="{ item }">
        <div style="max-width: 125px" class="text-caption">
          <me-cs-equipment-title :rarity="item.rarity">
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
      <template #[`item.cart`]="{ item }">
        <v-btn
          v-if="item.cost > 0"
          color="error"
          x-small
          icon
          @click.stop="addToCart(item)"
        >
          <v-badge dot :value="cart.filter(i => i.id === item.id).length">
            <v-icon>
              mdi-cart-plus
            </v-icon>
          </v-badge>
        </v-btn>
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
        { text: 'Cost', value: 'cost', filterable: false, align: 'center' },
        { text: '', value: 'cart', filterable: false, sortable: false }
      ],
      expanded: [],
      cart: [],
      discount: 0,
      purchaseDialog: false,
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
        return this.filter && this.filter !== 'all' ? i.modelType === this.filter : true
      })
    },
    discountLabel () {
      return this.discount < 0 ? `Mark up: ${this.discount * -1}%` : `Discount: ${this.discount}%`
    },
    credits () {
      return this.character.currentStats.credits
    },
    totalPurchase () {
      const total = this.groupedCart.reduce((a, c) => a + c.subtotal, 0)
      const discount = this.discount * 0.01
      return total - Math.floor(total * discount)
    },
    creditsAfterPurchase () {
      return Math.max(0, this.credits - this.totalPurchase)
    },
    groupedCart () {
      const items = []
      for (const item of this.cart) {
        const index = items.findIndex(i => i.item.id === item.id)
        if (index > -1) {
          items[index].count += 1
          items[index].subtotal += item.cost
        } else {
          items.push({ item, count: 1, subtotal: item.cost })
        }
      }
      return items
    }
  },
  methods: {
    reset () {
      this.purchaseDialog = false
      this.cart = []
      this.discount = 0
    },
    expandItem (event, attrs) {
      if (attrs.isExpanded) {
        this.expanded = []
      } else {
        this.expanded.splice(0, 1, attrs.item)
      }
    },
    addToCart (item) {
      this.cart.push(item)
    },
    deleteCartItem (id) {
      const index = this.cart.findIndex(i => i.id === id)
      if (index > -1) {
        this.cart.splice(index, 1)
      }
    },
    purchase () {
      if (this.loading) {
        return
      }
      this.loading = true
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.credits', value: this.creditsAfterPurchase })
      for (const item of this.cart) {
        this.$store.dispatch('character/equipment/ADD_EQUIPMENT', item)
      }
      this.reset()
      this.loading = false
    }
  }
}
</script>
