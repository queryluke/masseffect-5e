<template>
  <v-list-item>
    <v-list-item-action v-if="config.equippable" @click="toggleEquipped">
      <v-icon v-if="item.equipped" color="primary">
        mdi-checkbox-marked
      </v-icon>
      <v-icon v-else>
        mdi-checkbox-blank-outline
      </v-icon>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title>
        <slot name="title">
          {{ item.data.name }}
        </slot>
      </v-list-item-title>
      <v-list-item-subtitle>
        <me-cs-equipment-subtitle :item="item.data" />
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action @click="equipmentDialog = true">
      <v-icon>
        mdi-cog
      </v-icon>
    </v-list-item-action>
    <me-standard-dialog :shown="equipmentDialog" @close="equipmentDialog = false">
      <template #title>
        {{ item.data.title }}
      </template>
      <v-row justify="space-between">
        <v-col>
          <v-chip-group v-model="tab" active-class="primary--text">
            <v-chip small>
              Info
            </v-chip>
            <v-chip v-if="config.moddable" small>
              Mods
            </v-chip>
            <v-chip v-if="config.overrideable" small>
              Stat Overrides
            </v-chip>
          </v-chip-group>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-chip small color="error" @click="equipmentDialog = false; removeEquipment(item.type, item.uuid)">
            <v-icon>
              mdi-delete
            </v-icon>
          </v-chip>
        </v-col>
      </v-row>
      <v-tabs-items v-model="tab">
        <!-- INFO -->
        <v-tab-item>
          <div v-if="config.consumable">
            <v-row>
              <v-col cols="4">
                <div>Uses / Charges / Quantity</div>
                <me-cs-action-resource-display-counter
                  :current="item.uses"
                  :max="999"
                  @add="changeStat('uses', item.uses + 1)"
                  @remove="changeStat('uses', item.uses - 1)"
                  @set="changeStat('uses', $event)"
                />
              </v-col>
              <v-col cols="8">
                <v-text-field
                  label="Notes"
                  :value="item.notes"
                  hint="e.g. Grenade mark, medi-gel type"
                  persistent-hint
                  @change="updateCache('notes', $event)"
                />
              </v-col>
            </v-row>
          </div>
          <component :is="`me-${config.component}-info`" :item="itemData" />
        </v-tab-item>
        <!-- MODS -->
        <v-tab-item />
      </v-tabs-items>
    </me-standard-dialog>
  </v-list-item>
</template>

<script>
import { debounce, set as attrSetter, cloneDeep } from 'lodash'
export default {
  name: 'MeCsEquipmentListItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      equipmentDialog: false,
      cache: {},
      loading: false,
      tab: 0,
      tabs: ['Info'],
      configs: {
        weapons: {
          component: 'weapon',
          equippable: true,
          consumable: false,
          moddable: true,
          overrideable: true
        },
        armor: {
          component: 'armor',
          equippable: true,
          consumable: false,
          moddable: this.item.custom,
          overrideable: false
        },
        gear: {
          component: 'gear',
          equippable: false,
          consumable: true,
          overrideable: false
        }
      },
      customArmorStub: {
        placement: null,
        type: null,
        name: '',
        cost: 0,
        manufacturer: null,
        image: null,
        tags: [],
        andromeda: false,
        set: false,
        rarity: 'common',
        flavor: '',
        html: ''
      }
    }
  },
  computed: {
    config () {
      return this.configs[this.item.modelType]
    },
    itemData () {
      if (this.item.custom) {
        return { ...this.customArmorStub, placement: this.item.stats.placement, type: this.item.stats.type, name: this.item.custom.name, id: this.item.id, html: this.item.custom.notes || '' }
      }
      return { ...this.item.data, ...(this.item.overrides || {}) }
    },
    mods () {
      return this.$store.getters.getData('mods')
    }
  },
  created () {
    this.debounceChangeStat = debounce(() => {
      this.changeStatDebounced()
    }, 1000)
  },
  methods: {
    updateCache (attr, value) {
      attrSetter(this.cache, attr, value)
      this.debounceChangeStat()
    },
    changeStatDebounced () {
      const replacement = { ...this.item, ...this.cache }
      this.$store.dispatch('character/equipment/REPLACE_EQUIPMENT', { uuid: this.item.uuid, replacement })
    },
    changeStat (attr, value) {
      const replacement = cloneDeep(this.item)
      attrSetter(replacement, attr, value)
      this.$store.dispatch('character/equipment/REPLACE_EQUIPMENT', { uuid: this.item.uuid, replacement })
    },
    toggleEquipped () {
      this.$store.dispatch('character/equipment/TOGGLE_EQUIPPED', this.item.uuid)
    },
    removeEquipment () {
      this.$store.dispatch('character/equipment/REPLACE_EQUIPMENT', { uuid: this.item.uuid })
    }
  }
}
</script>
