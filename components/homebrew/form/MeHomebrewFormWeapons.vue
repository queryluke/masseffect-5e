<template>
  <div>
    <v-tabs v-model="tab" vertical>
      <v-tab>Basic Info</v-tab>
      <v-tab>Range & DMG</v-tab>
      <v-tab>Preview</v-tab>
      <v-tab-item>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="title" filled label="Title" />
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                v-model="type"
                :items="weaponTypes"
                filled
                dense
                label="Type"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <me-homebrew-input-rarity :rarity="rarity" @update="rarity = $event" />
            </v-col>
            <v-col cols="12" sm="4">
              <me-homebrew-input-cost :cost="cost" @update="cost = $event" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <v-select
                v-model="heat"
                label="Heat"
                filled
                dense
                :items="[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]"
              />
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <me-homebrew-input-weight :weight="weight" @update="weight = $event" />
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-select
                v-model="slots"
                :items="[0, 1, 2, 3, 4]"
                filled
                dense
                label="Weapon Slots"
              />
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <me-homebrew-input-andromeda :andromeda="andromeda" @update="andromeda = $event" />
            </v-col>
            <v-col cols="12">
              <me-homebrew-input-legend>Properties</me-homebrew-input-legend>
              <v-select
                v-model="properties"
                :items="weaponPropertyOptions"
                filled
                dense
                multiple
                chips
                deletable-chips
                small-chips
                label="Properties"
                item-text="name"
                item-value="id"
              />
            </v-col>
            <v-col cols="12">
              <me-homebrew-input-description :content="html" @update="html = $event" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-tab-item>
      <v-tab-item>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <me-homebrew-input-legend>Range</me-homebrew-input-legend>
              <me-homebrew-input-free-range :range="range" @update="range = $event" />
            </v-col>
            <v-col cols="12">
              <me-homebrew-input-legend>Damage</me-homebrew-input-legend>
              <me-homebrew-input-damages :damages="damages" :prevent-ability-mod-override="preventAbilityModReason" prevent-delete-zero-index @update="damages = $event" />
            </v-col>
            <v-col v-if="versatile" cols="12">
              <me-homebrew-input-legend>Versatile Damage</me-homebrew-input-legend>
              <me-homebrew-input-damage :damage="versatile" @update="versatile = $event" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-tab-item>
      <v-tab-item>
        <me-homebrew-preview-weapons :item="item" />
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
export default {
  name: 'MeHomebrewFormWeapons',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tab: 0,
      weaponTypes: [
        { text: 'Melee', value: 'melee' },
        { text: 'Assault Rifle', value: 'assault_rifle' },
        { text: 'Heavy Pistol', value: 'heavy_pistol' },
        { text: 'SMG', value: 'smg' },
        { text: 'Shotgun', value: 'shotgun' },
        { text: 'Sniper Rifle', value: 'sniper_rifle' }
      ],
      preventAbilityModReason: 'Melee = STR, Ranged = DEX. If Recoil or Finesse, the higher of DEX or STR will be used.'
    }
  },
  async fetch () {
    await this.$store.dispatch('FETCH_DATA', 'weapon-properties')
  },
  computed: {
    weaponPropertyOptions () {
      return this.$store.getters.getData('weapon-properties').filter(i => !['heat', 'melee', 'range', 'weight'].includes(i.id))
    },
    title: {
      get () {
        return this.item.name
      },
      set (value) {
        this.$emit('updateTitle', value)
      }
    },
    type: {
      get () {
        return this.item.type
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.item, type: value }))
      }
    },
    rarity: {
      get () {
        return this.item.rarity
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.item, rarity: value }))
      }
    },
    cost: {
      get () {
        return this.item.cost
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.item, cost: value }))
      }
    },
    weight: {
      get () {
        return this.item.weight
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.item, weight: value }))
      }
    },
    heat: {
      get () {
        return this.item.heat
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.item, heat: value }))
      }
    },
    damages: {
      get () {
        return [this.item.damage, ...(this.item.addDamages || [])]
      },
      set (value) {
        const [damage, ...addDamages] = value
        this.$emit('update', Object.assign({}, { ...this.item, damage, addDamages: (addDamages || []) }))
      }
    },
    range: {
      get () {
        return this.item.range
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.item, range: value }))
      }
    },
    slots: {
      get () {
        return this.item.slots
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.item, slots: value }))
      }
    },
    properties: {
      get () {
        return this.item.properties
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.item, properties: value }))
      }
    },
    andromeda: {
      get () {
        return this.item.andromeda
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.item, andromeda: value }))
      }
    },
    versatile: {
      get () {
        return this.item.versatile || (this.item.properties.includes('versatile') ? this.item.damage : false)
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.item, versatile: value }))
      }
    },
    html: {
      get () {
        return this.item.html || ''
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.item, html: value }))
      }
    }
  },
  methods: {

  }
}
</script>
