<template>
  <div>
    <v-tabs v-model="tab">
      <template v-for="adv of advancements">
        <v-tab :key="adv.id">
          {{ adv.name }}
        </v-tab>
      </template>
      <v-tab @click.stop="addAdvancement">
        Add <v-icon>mdi-plus</v-icon>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <template v-for="(advData, index) of advancements">
        <me-homebrew-form-power-advancement
          :key="advData.id"
          :advancement="advData"
          :level="level"
          :mechanics="mechanics"
          :active="tab === index"
          @update="updateAdvancement(index, $event)"
        />
      </template>
    </v-tabs-items>
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
    }
  },
  data () {
    return {
      tab: 0
    }
  },
  methods: {
    addAdvancement () {
      const newAdvancements = [...this.advancements, { id: `new-advancement-${this.advancements.length}`, name: null, text: null, mechanics: [] }]
      this.$emit('update', newAdvancements)
    },
    updateAdvancement (index, value) {
      const newAdvancements = this.advancements.slice()
      newAdvancements.splice(index, 1, value)
      this.$emit('update', newAdvancements)
    }
  }
}
</script>
