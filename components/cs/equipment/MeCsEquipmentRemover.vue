<template>
  <div>
    <!-- DIALOG -->
    <v-dialog v-model="removeDialog" max-width="500">
      <template #activator="{ on, attrs }">
        <div class="text-center mb-4">
          <v-badge :value="itemCount" overlap :color="execColor" :content="itemCount">
            <v-btn
              outlined
              small
              :color="execColor"
              :disabled="!itemCount || viewOnly"
              v-bind="attrs"
              v-on="on"
            >
              {{ execText }}
            </v-btn>
          </v-badge>
        </div>
      </template>

      <v-card>
        <v-card-title>{{ execText }}</v-card-title>
        <v-card-text>
          <!-- ADJUSTMENT -->
          <v-slider
            v-if="manageKey === 'toSell'"
            v-model="adjustment"
            min="-100"
            max="100"
            step="5"
            label="% Adjustment"
          />
          <!-- INCLUDE MODS -->
          <div class="my-2">
            <div class="d-flex text-caption align-center" @click="includeMods = !includeMods">
              <v-icon color="primary" x-small>
                {{ includeMods ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline' }}
              </v-icon>
              <span class="pl-1">
                Include Mods?
              </span>
            </div>
          </div>
          <v-list dense>
            <v-list-item v-for="item of groupedItems" :key="item.uuid">
              <v-list-item-action class="pr-2 mr-0">
                <v-btn icon small color="error" @click="deleteCartItem(item.uuid)">
                  <v-icon>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  <span v-if="manageKey === 'toSell'">
                    Amount: {{ item.count }}
                  </span>
                  <span v-if="item.modCount">
                    ({{ item.modCount }} mod{{ item.modCount > 1 ? 's' : '' }})
                  </span>
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action-text v-if="manageKey === 'toSell'">
                {{ ((item.cost * item.count) + (includeMods ? item.modCosts : 0)) | groupDigits(',') }}
              </v-list-item-action-text>
              <v-list-item-action-text v-else>
                {{ item.gel + (includeMods ? item.modCount : 0) }}
              </v-list-item-action-text>
            </v-list-item>
            <v-divider />
            <v-list-item>
              <v-list-item>
                <span v-if="manageKey === 'toSell' && adjustment !== 0">
                  {{ totalCredits | groupDigits(',') }} {{ adjustment > 0 ? '+' : '-' }} {{ adjustment > 0 ? adjustment : adjustment * -1 }}% ({{ normalizedAdjustedCredits | groupDigits(',') }}) =
                </span>
                <span v-else>
                  &nbsp;
                </span>
              </v-list-item>
              <v-list-item-action-text class="font-weight-bold">
                <span v-if="manageKey === 'toSell'">
                  {{ gainedCredits | groupDigits(',') }}
                </span>
                <span v-else>
                  {{ gainedGel }} omni-gel
                </span>
              </v-list-item-action-text>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn
            outlined
            small
            :color="execColor"
            :disabled="(!toSell.length && !toGel.length) || viewOnly"
            :loading="loading"
            @click="execute"
          >
            {{ execText }}
          </v-btn>
          <v-spacer />
          <v-btn outlined small :disabled="loading" @click="reset">
            Clear
          </v-btn>
          <v-btn outlined small :disabled="loading" @click="removeDialog = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table
      :items="filteredItems"
      :headers="tableHeaders"
      :search="search"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      hide-default-footer
      :items-per-page="5"
      :page.sync="page"
      item-key="uuid"
      hide-default-header
      :mobile-breakpoint="1"
      @page-count="pageCount = $event"
      @click:row="manageThis"
    >
      <template #[`item.data.name`]="{ item }">
        <div style="max-width: 150px" class="text-caption">
          <div class="d-flex">
            <me-cs-equipment-title :rarity="item.data.rarity">
              {{ item.data.name }}
            </me-cs-equipment-title>
            <span v-if="item.equipped" class="font-weight-thin pl-1 font-italic">
              <small>
                (equipped)
              </small>
            </span>
          </div>
          <div class="mt-n1">
            <small>
              <me-cs-equipment-subtitle :model="item.type === 'weapon' ? 'weapons' : item.type" :type="item.data.type" :additional="{ placement: item.data.placement }" />
              <span v-if="item.data.consumable" class="pl-1">
                ({{ item.uses }} remaining)
              </span>
            </small>
          </div>
        </div>
      </template>

      <template #[`item.actions`]="{ item }">
        <div v-if="item.data.consumable && item.uses > 0">
          <v-list-item-action class="mr-2 my-0">
            <v-btn x-small icon :disabled="amountInBag(item.uuid) === 0" @click.stop="removeFromBag(item.uuid)">
              <v-icon>
                mdi-minus
              </v-icon>
            </v-btn>
          </v-list-item-action>
          <v-list-item-action class="my-0 mx-1">
            <v-chip small>
              {{ amountInBag(item.uuid) }}
            </v-chip>
          </v-list-item-action>
          <v-list-item-action class="ml-2 my-0">
            <v-btn x-small icon :disabled="amountInBag(item.uuid) + 1 > item.uses" @click.stop="addToBag(item.uuid)">
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </div>
        <v-btn v-else-if="!item.data.consumable" icon small @click.stop="toggleBag(item.uuid)">
          <v-icon>
            {{ bagIndex(item.uuid) > -1 ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline' }}
          </v-icon>
        </v-btn>
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
  name: 'MeCsEquipmentRemover',
  props: {
    manageKey: {
      type: String,
      default: 'toGel'
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
        { text: 'Name', value: 'data.name', align: 'start', sortable: false },
        { text: '', value: 'actions', filterable: false, sortable: false, align: 'center' }
      ],
      toGel: [],
      toSell: [],
      adjustment: 0,
      expanded: [],
      loading: false,
      includeMods: true,
      removeDialog: false
    }
  },
  computed: {
    ...mapGetters({
      character: 'character',
      weapons: 'equipment/weapons',
      armor: 'equipment/armor',
      gear: 'equipment/gear',
      mods: 'equipment/modsList',
      filter: 'navigation/equipmentManagerFilter'
    }),
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    execText () {
      return this.manageKey === 'toSell'
        ? 'Sell'
        : 'Convert'
    },
    execColor () {
      return this.manageKey === 'toSell'
        ? 'green darken-2'
        : 'yellow darken-4'
    },
    items () {
      return [...this.weapons, ...this.armor, ...this.gear]
    },
    filteredItems () {
      return this.items.filter((i) => {
        return this.filter &&
        (
          this.filter !== 'all'
            ? this.filter === 'weapons'
              ? i.type === 'weapon'
              : i.type === this.filter
            : true
        ) &&
        (
          this.manageKey === 'toSell'
          // to sell
            ? i.data.consumable
            // consumables require
              ? i.uses > 0
              : i.data.cost > 0
              // to gel
            : i.type === 'gear'
              ? ['tool', 'heavy_weapon', 'device'].includes(i.subType)
              : true
        )
      })
    },
    itemCount () {
      return this[this.manageKey].length
    },
    groupedItems () {
      const items = []
      for (const uuid of this[this.manageKey]) {
        const match = this.items.find(i => i.uuid === uuid)
        let gel = 0
        let modCount = 0
        let modCosts = 0
        const consumable = match?.data.consumable
        if (consumable) {
          const existingIndex = items.findIndex(i => i.uuid === uuid)
          if (existingIndex > -1) {
            items[existingIndex].count += 1
            items[existingIndex].subtotal += items[existingIndex].cost
            continue
          }
        } else if (match.type === 'gear') {
          if (match.subType === 'heavy_weapon') {
            gel = 10
          } else {
            gel = 1
          }
        } else if (match.type === 'armor') {
          if (match.data.placement === 'chest') {
            gel = 6
          } else if (match.data.placement === 'body_armor') {
            gel = 12
          } else {
            gel = 3
          }
          if (match.mods?.length) {
            modCount = match.mods.length
            for (const mod of match.mods) {
              const modMatch = this.mods.find(i => i.id === mod)
              if (modMatch) {
                modCosts += modMatch.cost
              }
            }
          }
        } else if (match.type === 'weapon') {
          if (['melee', 'heavy_pistol', 'smg'].includes(match.data.type)) {
            gel = 3
          } else {
            gel = 6
          }
          const mods = Object.values(match.mods).filter(i => i)
          if (mods.length) {
            modCount = mods.length
            for (const mod of mods) {
              const modMatch = this.mods.find(i => i.id === mod)
              if (modMatch) {
                modCosts += modMatch.cost
              }
            }
          }
        }
        items.push({
          name: match?.data?.name,
          consumable,
          uuid,
          count: 1,
          cost: match?.data?.cost || 0,
          modCosts,
          modCount,
          uses: match?.uses || 0,
          gel
        })
      }
      return items
    },
    totalCredits () {
      if (this.manageKey !== 'toSell') {
        return 0
      }
      return this.groupedItems.reduce((a, c) => a + (c.cost * c.count) + (this.includeMods ? (c.modCosts || 0) : 0), 0)
    },
    adjustedCredits () {
      if (this.totalCredits < 0) {
        return 0
      }
      const discount = this.adjustment * 0.01
      return Math.floor(this.totalCredits * discount)
    },
    normalizedAdjustedCredits () {
      return this.adjustedCredits < 0 ? this.adjustedCredits * -1 : this.adjustedCredits
    },
    gainedCredits () {
      if (this.totalCredits < 0) {
        return 0
      }
      return this.totalCredits + this.adjustedCredits
    },
    gainedGel () {
      return this.groupedItems.reduce((a, c) => a + c.gel + (this.includeMods ? (c.modCount || 0) : 0), 0)
    },
    includedMods () {
      return this.includeMods ? this.groupedItems.reduce((a, c) => a + (c.modCount || 0), 0) : 0
    }
  },
  watch: {
    manageKey () {
      this.reset()
    }
  },
  methods: {
    reset () {
      this.toGel = []
      this.toSell = []
      this.removeDialog = false
      this.includeMods = true
    },
    manageThis (item) {
      if (item.data.consumable) {
        if (this.amountInBag(item.uuid) + 1 < item.uses) {
          this.addToBag(item.uuid)
        }
      } else {
        this.toggleBag(item.uuid)
      }
    },
    bagIndex (uuid) {
      return this[this.manageKey].indexOf(uuid)
    },
    removeFromBag (uuid) {
      const index = this.bagIndex(uuid)
      this[this.manageKey].splice(index, 1)
    },
    addToBag (uuid) {
      this[this.manageKey].push(uuid)
    },
    toggleBag (uuid) {
      if (this.bagIndex(uuid) > -1) {
        this.removeFromBag(uuid)
      } else {
        this.addToBag(uuid)
      }
    },
    amountInBag (uuid) {
      return this[this.manageKey].filter(i => i === uuid).length
    },
    deleteCartItem (uuid) {
      const index = this[this.manageKey].indexOf(uuid)
      if (index > -1) {
        this[this.manageKey].splice(index, 1)
      }
    },
    execute () {
      if (this.loading) {
        return
      }
      this.loading = true
      if (this.manageKey === 'toSell') {
        const currentCredits = this.$store.getters['character/credits']
        this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.credits', value: this.gainedCredits + currentCredits })
      }
      if (this.manageKey === 'toGel') {
        this.$store.dispatch('character/equipment/ADD_OMNI_GEL', this.gainedGel)
      }
      for (const item of this.groupedItems) {
        let newItem = null
        if (item.consumable && (item.uses - item.count > 0)) {
          newItem = this.items.find(i => i.uuid === item.uuid)
          newItem.uses = newItem.uses - item.count
        }
        this.$store.dispatch('character/equipment/REPLACE_EQUIPMENT', { uuid: item.uuid, replacement: newItem })
      }
      this.reset()
      this.loading = false
    }
  }
}
</script>
