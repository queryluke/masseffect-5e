<template>
  <div class="d-flex align-start">
    <v-btn x-small class="mr-1" color="primary" icon @click="reloadWeapon">
      <v-icon size="18">
        mdi-refresh
      </v-icon>
    </v-btn>
    <div style="width: 200px">
      <v-progress-linear
        :value="currentHeatPercent"
        height="6"
        class="mt-1"
        :color="`${heatColor}`"
        background-color="grey darken-2"
      />
      <div class="text-caption text-center mt-n1">
        <small>
          {{ item.heat }} / {{ item.stats.heat }}
        </small>
      </div>
    </div>
    <v-btn x-small class="ml-1 mr-2" color="secondary" icon @click="fireWeapon">
      <v-icon size="18" :disabled="item.heat >= item.stats.heat">
        mdi-lightning-bolt
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      heatColors: [
        'indigo darken-4',
        'blue darken-4',
        'cyan darken-3',
        'green',
        'light-green',
        'lime',
        'amber accent-4',
        'orange darken-1',
        'deep-orange darken-1',
        'red darken-4'
      ]
    }
  },
  computed: {
    heatColor () {
      return this.heatColors[Math.ceil(this.currentHeatPercent / 10) - 1]
    },
    currentHeatPercent () {
      return Math.ceil((this.item.heat * 100) / this.item.stats.heat)
    }
  },
  methods: {
    fireWeapon () {
      const changeItem = { ...this.item, heat: this.item.heat + 1 }
      this.removeEquipment('weapon', this.item.uuid, changeItem)
    },
    reloadWeapon () {
      const changeItem = { ...this.item, heat: 0 }
      this.removeEquipment('weapon', this.item.uuid, changeItem)
    }
  }
}
</script>
