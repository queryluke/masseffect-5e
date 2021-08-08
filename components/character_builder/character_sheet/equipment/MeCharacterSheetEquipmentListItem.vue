<template>
  <v-list-item>
    <v-list-item-action v-if="!noEquip" @click="toggleEquipped">
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
          {{ title }}
        </slot>
      </v-list-item-title>
      <v-list-item-subtitle>
        <slot name="subtitle">
          {{ subtitle }}
        </slot>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action @click="equipmentDialog = true">
      <v-icon>
        mdi-cog
      </v-icon>
    </v-list-item-action>
    <v-dialog v-model="equipmentDialog" :fullscreen="$vuetify.breakpoint.xsOnly" max-width="500">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>
            {{ title }}
          </v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn icon @click="equipmentDialog = false">
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="mt-5">
          <v-row justify="space-between">
            <v-col>
              <v-chip-group v-model="tab" active-class="primary--text">
                <v-chip
                  v-for="cTab in tabs"
                  :key="`feature-chip-tab-${cTab.slot}`"
                  small
                >
                  {{ cTab.title }}
                </v-chip>
              </v-chip-group>
            </v-col>
            <v-col class="d-flex justify-end">
              <v-chip-group>
                <v-chip small color="error" @click="equipmentDialog = false; removeEquipment(item.type, item.uuid)">
                  <v-icon>
                    mdi-delete
                  </v-icon>
                </v-chip>
              </v-chip-group>
            </v-col>
          </v-row>
          <v-tabs-items v-model="tab">
            <template v-for="tTab in tabs">
              <v-tab-item :key="`tTab-${tTab.slot}`">
                <v-card-text>
                  <slot :name="tTab.slot" />
                </v-card-text>
              </v-tab-item>
            </template>
            <!-- info -->
          </v-tabs-items>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-list-item>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    item: {
      type: Object,
      required: true
    },
    noEquip: {
      type: Boolean,
      default: false
    },
    tabs: {
      type: Array,
      default: () => [{ title: 'Info', slot: 'infoTab' }, { title: 'Mods', slot: 'modTab' }, { title: 'Stat Overrides', slot: 'overrideTab' }]
    }
  },
  data () {
    return {
      equipmentDialog: false,
      loading: false,
      tab: 0,
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
    title () {
      return this.itemData.name
    },
    subtitle () {
      switch (this.item.type) {
        case 'weapon':
          return this.$tc(`weapon_types.${this.itemData.type}`, 1)
        case 'armor':
          return `${this.$t(`armor_types.${this.itemData.type}`)} ${this.$t(`armor_placements.${this.itemData.placement}_title`)}`
        default:
          return ''
      }
    },
    itemData () {
      if (this.item.custom) {
        return { ...this.customArmorStub, placement: this.item.stats.placement, type: this.item.stats.type, name: this.item.custom.name, id: this.item.id, html: this.item.custom.notes || '' }
      }
      return this.equipmentData(this.item.type, this.item.id)
    }
  },
  methods: {
    toggleEquipped () {
      const changeItem = { ...this.item, equipped: !this.item.equipped }
      this.removeEquipment(this.item.type, this.item.uuid, changeItem)
    }
  }
}
</script>
