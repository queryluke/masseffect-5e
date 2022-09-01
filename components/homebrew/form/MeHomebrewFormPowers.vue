<template>
  <div>
    <v-tabs v-model="tab">
      <v-tab>Information</v-tab>
      <v-tab>At Higher Levels</v-tab>
      <v-tab>Advancements</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <!-- MAIN INFO -->
      <v-tab-item>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <me-homebrew-input-legend id="info">
                Basic Information
              </me-homebrew-input-legend>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-select
                v-model="type"
                :items="powerTypeItems"
                label="Type"
              />
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-select
                v-model="level"
                :items="levelItems"
                label="Level"
                :disabled="type === 'combat'"
              />
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <me-homebrew-input-classes-select :selected="classes" multiple @update="classes = $event" />
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-select
                v-model="tags"
                :items="tagItems"
                label="Tags"
                multiple
                small-chips
              />
            </v-col>
            <v-col cols="12">
              <me-homebrew-input-description :content="html" @update="html = $event" />
            </v-col>
            <v-col cols="12" />
          </v-row>
        </v-card-text>
        <me-homebrew-form-power-mechanics :mechanics="baseMechanics" is-base @update="updateMechanics(0, $event)" />
      </v-tab-item>

      <!-- HIGHER LEVELS -->
      <v-tab-item />
    </v-tabs-items>
    <v-speed-dial
      v-if="tab === 0"
      v-model="quickNav"
      bottom
      right
      direction="top"
      fixed
    >
      <template #activator>
        <v-btn
          v-model="quickNav"
          color="blue darken-2"
          dark
          fab
          small
        >
          <v-icon v-if="quickNav">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-menu-open
          </v-icon>
        </v-btn>
      </template>
      <template v-for="nav in navOptions">
        <v-btn :key="`nav-option-${nav}`" small @click="$vuetify.goTo(`#${nav}`)">
          {{ nav }}
        </v-btn>
      </template>
    </v-speed-dial>
  </div>
</template>

<script>
export default {
  name: 'MeHomebrewFormPowers',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tab: 0,
      quickNav: true,
      navOptions: ['uses', 'damage', 'dc', 'attack', 'conditions', 'range', 'duration', 'cast', 'info'],
      levelItemsUnfiltered: [
        { value: 0, text: 'Cantrip' },
        { value: 1, text: '1st' },
        { value: 2, text: '2nd' },
        { value: 3, text: '3rd' },
        { value: 4, text: '4th' },
        { value: 5, text: '5th' }
      ],
      powerTypeItems: [
        { value: 'biotic', text: 'Biotic' },
        { value: 'tech', text: 'Tech' },
        { value: 'combat', text: 'Combat' }
      ],
      tagItems: [
        'buff',
        'control',
        'damage',
        'debuff',
        'heal',
        'movement',
        'protection',
        'summon'
      ]
    }
  },
  computed: {
    level: {
      get () {
        return this.item.level || 0
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.item, level: value }))
      }
    },
    levelItems () {
      return this.levelItemsUnfiltered.filter((i) => {
        if (this.type === 'tech' && i.value === 0) {
          return false
        } else if (this.type === 'combat' && i.value > 0) {
          return false
        }
        return true
      })
    },
    higherLevels () {
      if (this.level === 0) {
        return [1, 5, 11, 17]
      } else {
        const max = this.type === 'tech' ? 7 : 6
        return [...Array(max - this.level).keys()].map(i => i + this.level)
      }
    },
    type: {
      get () {
        return this.item.type
      },
      set (value) {
        const newObject = Object.assign({}, { ...this.item, type: value })
        if (value === 'combat') {
          newObject.level = 0
        }
        if (value === 'tech' && this.level === 0) {
          this.level = 1
        }
        this.$emit('update', newObject)
      }
    },
    classes: {
      get () {
        return this.item.classes || []
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.item, classes: value }))
      }
    },
    tags: {
      get () {
        return this.item.tags || []
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.item, tags: value }))
      }
    },
    html: {
      get () {
        return this.item.html || ''
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.item, html: value }))
      }
    },
    advancements: {
      get () {
        return this.item.advancements || []
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.item, advancements: value }))
      }
    },
    mechanics: {
      get () {
        return this.item.mechanics || []
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.item, mechanics: value }))
      }
    },
    baseMechanics () {
      return this.mechanics[0] || {}
    },
    higherLevelOptions () {
      return this.higherLevels.slice(1)
    }
  },
  watch: {
    level () {
      const higherLevelsLength = this.higherLevels.length
      let newMechanics = (this.mechanics || []).slice()
      const mechanicsLength = newMechanics.length
      if (higherLevelsLength > mechanicsLength) {
        for (let i = 0; i < higherLevelsLength - mechanicsLength; i++) {
          newMechanics.push({})
        }
      } else if (mechanicsLength > higherLevelsLength) {
        newMechanics = newMechanics.slice(0, higherLevelsLength)
      }
      this.mechanics = newMechanics
    }
  },
  methods: {
    updateMechanics (index, value) {
      const newMechanics = this.mechanics.slice()
      newMechanics.splice(index, 1, value)
      this.mechanics = newMechanics
    },
    addAdvancement () {
      const advNum = (this.advancements || []).length + 1
      const newAdvs = this.advancements.slice()
      newAdvs.push({ title: `Advancement #${advNum}`, id: `advancement--${advNum}`, text: '', mechanics: [] })
      this.advancements = newAdvs
    },
    removeAdvancement (index) {
      const newAdvs = this.advancements.slice()
      newAdvs.splice(index, 1)
      this.advancements = newAdvs
    },
    updateAdvancement (index, value) {
      const newAdvs = this.advancements.slice()
      newAdvs.splice(index, 1, value)
      this.advancements = newAdvs
    }
  }
}
</script>
