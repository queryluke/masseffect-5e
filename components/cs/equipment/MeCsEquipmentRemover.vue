<template>
  <div>
    <v-card-text class="px-3">
      <!-- DELETE -->
      <div v-if="manageKey === 'toDel'" class="d-flex justify-space-between">
        <div>
          Remove: {{ toDel.length }} item{{ toDel.length === 1 ? '' : 's' }}
        </div>
        <v-btn
          outlined
          x-small
          color="red darken-4"
          :disabled="!toDel.length"
          :loading="loading"
          @click="execute"
        >
          Remove
        </v-btn>
      </div>

      <!-- SELL -->
      <div v-if="manageKey === 'toSell'">
        <div class="d-flex justify-space-between">
          <div>
            Sell: {{ toSell.length }} item{{ toSell.length === 1 ? '' : 's' }}
          </div>
          <v-btn
            outlined
            x-small
            color="green darken-2"
            :disabled="!toSell.length"
            :loading="loading"
            @click="execute"
          >
            Sell
          </v-btn>
        </div>
        <v-slider v-model="adjustment" min="-100" max="100" step="5" label="% Adjustment" />
        <div class="text-center">
          <span v-if="adjustment !== 0">
            {{ totalCredits | groupDigits(',') }} {{ adjustment > 0 ? '+' : '-' }} {{ adjustment > 0 ? adjustment : adjustment * -1 }}% ({{ normalizedAdjustedCredits | groupDigits(',') }}) =
          </span>
          <span>
            {{ gainedCredits | groupDigits(',') }} credits
          </span>
        </div>
      </div>

      <!-- OMNI_GEL -->
      <div v-if="manageKey === 'toGel'">
        <div class="d-flex justify-space-between">
          <div>
            Omni-Gel: {{ toGel.length }} item{{ toGel.length === 1 ? '' : 's' }}
          </div>
          <v-btn
            outlined
            x-small
            color="yellow darken-4"
            :disabled="!toGel.length"
            :loading="loading"
            @click="execute"
          >
            Convert
          </v-btn>
        </div>
        <div class="text-center">
          {{ gainedGel }} omni-gel
        </div>
      </div>
    </v-card-text>

    <v-data-table
      :items="filteredItems"
      :headers="tableHeaders"
      :search="search"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      hide-default-footer
      :items-per-page="10"
      :page.sync="page"
      item-key="uuid"
      @page-count="pageCount = $event"
      @click:row="manageThis"
    >
      <template #[`header.data.name`]>
        <v-text-field v-model="search" append-icon="mdi-magnify" dense label="Search" hide-details />
      </template>
      <template #[`header.actions`]>
        <v-btn-toggle v-model="manageKey" mandatory>
          <v-btn x-small value="toDel" :color="manageKey === 'toDel' ? 'red darken-4' : undefined">
            <v-icon x-small>
              mdi-delete
            </v-icon>
          </v-btn>
          <v-btn x-small value="toSell" :color="manageKey === 'toSell' ? 'green darken-2' : undefined">
            <v-icon x-small light>
              mdi-currency-eur
            </v-icon>
          </v-btn>
          <v-btn x-small value="toGel" :color="manageKey === 'toGel' ? 'yellow darken-4' : undefined">
            <v-icon x-small>
              mdi-liquid-spot
            </v-icon>
          </v-btn>
        </v-btn-toggle>
      </template>
      <template #[`item.data.name`]="{ item }">
        <div style="max-width: 125px" class="text-caption">
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
        <v-btn v-else-if="!item.data.consumable || (item.data.consumable && manageKey === 'toDel')" icon small @click.stop="toggleBag(item.uuid)">
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
      toDel: [],
      adjustment: 0,
      expanded: [],
      manageKey: 'toDel',
      loading: false
    }
  },
  computed: {
    ...mapGetters({ character: 'character', weapons: 'equipment/weapons', armor: 'equipment/armor', gear: 'equipment/gear', filter: 'navigation/equipmentManagerFilter' }),
    viewOnly () {
      return this.$store.state.character.viewOnly
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
          this.manageKey === 'toDel'
            ? true
            : this.manageKey === 'toSell'
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
    groupedItems () {
      const items = []
      for (const uuid of this[this.manageKey]) {
        const match = this.items.find(i => i.uuid === uuid)
        let gel = 0
        const consumable = match?.data.consumable
        if (consumable) {
          const existingIndex = items.findIndex(i => i.uuid === uuid)
          if (existingIndex > -1) {
            items[existingIndex].count += 1
            continue
          }
        } else if (['gear', 'mod'].includes(match.type)) {
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
        } else if (match.type === 'weapon') {
          if (['melee', 'heavy_pistol', 'smg'].includes(match.data.type)) {
            gel = 3
          } else {
            gel = 6
          }
        }
        items.push({
          consumable,
          uuid,
          count: 1,
          cost: match?.data.cost || 0,
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
      return this.groupedItems.reduce((a, c) => a + (c.cost * c.count), 0)
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
      return this.groupedItems.reduce((a, c) => a + c.gel, 0)
    }
  },
  watch: {
    manageKey () {
      this.reset()
    }
  },
  methods: {
    reset () {
      this.toDel = []
      this.toGel = []
      this.toSell = []
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
    execute () {
      if (this.loading) {
        return
      }
      this.loading = true
      if (this.manageKey === 'toSell') {
        this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.credits', value: this.gainedCredits })
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
