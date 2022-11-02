<template>
  <div>
    <v-tabs v-model="tab" vertical>
      <v-tab>Basic Info</v-tab>
      <v-tab>Mechanics</v-tab>
      <v-tab>Atk, DC, Dmg</v-tab>
      <v-tab>Uses/Resource</v-tab>
      <v-tab>Higher Levels</v-tab>
      <v-tab>Advancements</v-tab>
      <v-tab>Preview</v-tab>
      <!-- MAIN INFO -->
      <v-tab-item>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="title" filled label="Title" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="type"
                :items="powerTypeItems"
                filled
                dense
                label="Type"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="level"
                :items="levelItems"
                label="Level"
                filled
                dense
                :disabled="type === 'combat'"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <me-homebrew-input-classes-select :selected="classes" multiple @update="classes = $event" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="tags"
                :items="tagItems"
                label="Tags"
                multiple
                filled
                dense
                small-chips
              />
            </v-col>
            <v-col cols="12">
              <me-homebrew-input-description :content="html" @update="html = $event" />
            </v-col>
            <v-col cols="12" />
          </v-row>
        </v-card-text>
      </v-tab-item>

      <!-- BASE MECHANICS -->
      <v-tab-item>
        <me-homebrew-form-power-base-mechanics :mechanics="baseMechanics" @update="updateMechanics(0, $event)" />
      </v-tab-item>

      <!-- ATTACK/DC/DAMAGE -->
      <v-tab-item>
        <me-homebrew-form-power-base-attack-dc-damage :mechanics="baseMechanics" @update="updateMechanics(0, $event)" />
      </v-tab-item>

      <!-- RESOURCES -->
      <v-tab-item>
        <v-alert type="info" :value="true" class="mt-4">
          <p>
            <small>
              A "use" or "resource" can be one of two things. Either be a number of uses per short or long rest (for combat powers)
              or it could be a usage counter indicating uses <em>while the power is active</em>. For example, when Biotic
              Orbs is <em>active</em>, it summons 3 orbs, therefore has 3 uses.
            </small>
          </p>
          <p>
            <small>
              You can use other types of calculated bonuses like proficiency bonus, ability mods, level, etc to
              customize the number of uses. However, this is rare for powers.
            </small>
          </p>
        </v-alert>
        <me-homebrew-input-resource
          :resource="baseMechanics.resource"
          castable
          label="Has Uses?"
          :excluded-display-types="['gear-consumable', 'hit-dice', 'omni-gel', 'barrier-ticks']"
          @update="updateMechanics(0, {...baseMechanics, resource: $event })"
        >
          <template #resourceMaxDescription>
            <div>
              # of Uses or Resource Amount
            </div>
            <div class="text-caption">
              Most powers (especially combat powers) do not require anything beyond the a simple flat number of uses per short/long rest.
              However, it is possible to set up resources of other types of powers. For example, the hex shield and biotic sphere have hit points
              which you can define as a "resource" with a custom label "Hit Points". You <em>can</em> use the other types of calculated bonuses
              like proficiency bonus, ability mods, level, etc to customize the # of uses. However, this is rare for powers.
            </div>
          </template>
        </me-homebrew-input-resource>
      </v-tab-item>

      <!-- HIGHER LEVELS -->
      <v-tab-item>
        <me-homebrew-form-power-at-higher-levels :level="level" :mechanics="mechanics" :type="type" @update="mechanics = $event" />
      </v-tab-item>
      <!-- Advancements -->
      <v-tab-item>
        <me-homebrew-form-power-advancements :advancements="advancements" :level="level" :mechanics="mechanics" :type="type" @update="advancements = $event" />
      </v-tab-item>
      <v-tab-item>
        <me-homebrew-preview-powers :item="item" />
      </v-tab-item>
    </v-tabs>
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
    title: {
      get () {
        return this.item.name
      },
      set (value) {
        this.$emit('updateTitle', value)
      }
    },
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
          newObject.level = 1
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
    }
  },
  watch: {
    level (newVal) {
      this.updateHigherLevelMechanics(newVal)
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
    },
    updateHigherLevelMechanics (newLevel) {
      let levelsLength = 0
      if (newLevel === 0) {
        levelsLength = 4
      } else {
        const max = this.type === 'tech' ? 7 : 6
        levelsLength = max - newLevel
      }
      // update the powers mechanics
      let newMechanics = (this.mechanics || []).slice()
      const mechanicsLength = newMechanics.length
      if (levelsLength > mechanicsLength) {
        for (let i = 0; i < levelsLength - mechanicsLength; i++) {
          newMechanics.push({})
        }
      } else if (mechanicsLength > levelsLength) {
        newMechanics = newMechanics.slice(0, levelsLength)
      }
      this.mechanics = newMechanics

      // update the advancement mechanics
      const newAdvancements = (this.advancements || []).slice()
      for (const [index, adv] of newAdvancements.entries()) {
        let newAdvMechanics = (adv.mechanics || []).slice()
        if (newAdvancements.length > levelsLength) {
          newAdvMechanics = newAdvMechanics.slice(0, levelsLength)
          adv.mechanics = newAdvMechanics
          newAdvancements.splice(index, 1, adv)
        }
      }
      this.advancements = newAdvancements
    }
  }
}
</script>
