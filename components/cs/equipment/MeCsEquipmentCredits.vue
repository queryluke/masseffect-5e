<template>
  <v-card height="100%" flat>
    <v-card-text>
      <v-row justify="center">
        <v-col cols="10" sm="8">
          <v-text-field
            v-model="creditAmount"
            type="number"
            outlined
            dense
            hide-details
            clearable
            :disabled="viewOnly"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn small outlined color="success" :disabled="viewOnly" @click="addCredits">
        Add
      </v-btn>
      <v-btn small outlined color="error" :disabled="viewOnly" @click="removeCredits">
        Remove
      </v-btn>
      <v-spacer />
    </v-card-actions>
    <v-divider />

    <!-- Purchase -->
    <v-list-item @click="expand('vendor')">
      <v-list-item-content>
        <v-list-item-title>
          Buy
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-icon>
        <v-icon>
          mdi-chevron-{{ expanded === 'vendor' ? 'up' : 'down' }}
        </v-icon>
      </v-list-item-icon>
    </v-list-item>
    <v-expand-transition>
      <div v-if="expanded === 'vendor'">
        <!-- PURCHASE DIALOG -->
        <v-dialog v-model="purchaseDialog" max-width="500">
          <template #activator="{ on, attrs }">
            <div class="text-center mt-4">
              <v-badge :value="cart.length" overlap color="error" :content="cart.length">
                <v-btn
                  outlined
                  small
                  color="error"
                  :disabled="!cart.length || viewOnly"
                  v-bind="attrs"
                  v-on="on"
                >
                  Buy
                </v-btn>
              </v-badge>
            </div>
          </template>
          <v-card>
            <v-card-title>Buy</v-card-title>
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
                      (credits remaining after purchase {{ creditsAfterPurchase | groupDigits(',') }})
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
        <me-cs-equipment-adder vendor :cart-ids="cartIds" @add-to-cart="addToCart" />
      </div>
    </v-expand-transition>
    <v-divider />
    <!-- equipment seller, geller, deleter -->
    <v-list-item @click="expand('remover')">
      <v-list-item-content>
        <v-list-item-title>
          Sell
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-icon>
        <v-icon>
          mdi-chevron-{{ expanded === 'remover' ? 'up' : 'down' }}
        </v-icon>
      </v-list-item-icon>
    </v-list-item>
    <v-expand-transition>
      <div v-if="expanded === 'remover'" class="mt-4">
        <me-cs-equipment-remover manage-key="toSell" />
      </div>
    </v-expand-transition>
    <v-divider />
    <v-list-item @click="showEquipment">
      <v-list-item-content>
        <v-list-item-title>
          Equipment
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-icon>
        <v-icon>
          mdi-chevron-right
        </v-icon>
      </v-list-item-icon>
    </v-list-item>
    <v-divider />
  </v-card>
</template>

<script>
export default {
  name: 'MeCsEquipmentCredits',
  data () {
    return {
      creditAmount: null,
      expanded: null,
      cart: [],
      discount: 0,
      purchaseDialog: false,
      loading: false
    }
  },
  computed: {
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    credits () {
      return this.$store.getters['character/credits']
    },
    discountLabel () {
      return this.discount < 0 ? `Mark up: ${this.discount * -1}%` : `Discount: ${this.discount}%`
    },
    totalPurchase () {
      const total = this.groupedCart.reduce((a, c) => a + c.subtotal, 0)
      const discount = this.discount * 0.01
      return total - Math.floor(total * discount)
    },
    creditsAfterPurchase () {
      return Math.max(0, this.credits - this.totalPurchase)
    },
    cartIds () {
      return this.cart.map(i => i.id)
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
    addCredits () {
      const parsed = Number.parseInt(this.creditAmount)
      if (parsed && parsed > 0) {
        this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.credits', value: this.credits + parsed })
      }
      this.creditAmount = null
    },
    removeCredits () {
      const parsed = Number.parseInt(this.creditAmount)
      if (parsed && parsed > 0) {
        this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.credits', value: this.credits - parsed })
      }
      this.creditAmount = null
    },
    expand (value) {
      this.expanded = this.expanded === value ? null : value
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
    },
    reset () {
      this.purchaseDialog = false
      this.cart = []
      this.discount = 0
    },
    showEquipment () {
      this.$store.dispatch('character/navigation/SHOW_SIDE_NAV', 'me-cs-equipment-manager')
    }
  }
}
</script>
