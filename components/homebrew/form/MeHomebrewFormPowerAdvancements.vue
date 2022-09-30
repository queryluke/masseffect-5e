<template>
  <div>
    <v-toolbar dense>
      <v-tabs>
        <template v-for="(adv, index) of advancements">
          <v-tab :key="adv.id" @click="tab = index">
            {{ adv.name }}
          </v-tab>
        </template>
      </v-tabs>
      <v-spacer>
        <v-btn text color="success" @click="addAdvancement">
          <v-icon left>
            mdi-plus
          </v-icon>
          Add
        </v-btn>
      </v-spacer>
    </v-toolbar>
    <v-fade-transition hide-on-leave>
      <template v-for="(advData, index) of advancements">
        <me-homebrew-form-power-advancement
          v-if="index === tab"
          :key="advData.id"
          :advancement="advData"
          :level="level"
          :mechanics="mechanics"
          :active="tab === index"
          :type="type"
          @update="updateAdvancement(index, $event)"
          @delete="deleteAdvancement(index)"
        />
      </template>
    </v-fade-transition>
  </div>
</template>

<script>
export default {
  name: 'MeHomebrewFormPowerAdvancements',
  props: {
    advancements: {
      type: Array,
      default: () => []
    },
    mechanics: {
      type: Array,
      default: () => []
    },
    level: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      tab: 0
    }
  },
  methods: {
    addAdvancement () {
      const newAdvancements = [...this.advancements, { id: `new-advancement-${this.advancements.length}`, name: `Advancement ${this.advancements.length + 1}`, text: null, mechanics: [] }]
      this.$emit('update', newAdvancements)
    },
    updateAdvancement (index, value) {
      const newAdvancements = this.advancements.slice()
      newAdvancements.splice(index, 1, value)
      this.$emit('update', newAdvancements)
    },
    deleteAdvancement (index) {
      const newAdvancements = this.advancements.slice()
      newAdvancements.splice(index, 1)
      this.$emit('update', newAdvancements)
    }
  }
}
</script>
