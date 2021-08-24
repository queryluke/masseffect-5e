<template>
  <div>
    <me-class-hit-points :item="klassData" />
    <v-switch
      v-model="klassHpOverride"
      label="Rolled HP"
    />
    <div v-if="klassHpOverride">
      <v-row class="hpSlots">
        <v-col
          v-for="(hp, index) in klassHitPoints"
          :key="index"
          cols="2"
        >
          <v-select
            :items="hpArray"
            :value="klassHitPoints[index]"
            :label="'Lvl. ' + (index + 1)"
            :readonly="index === 0"
            :disabled="index === 0"
            @change="updateHp($event, index)"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    classIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    hpArray () {
      const hpArr = []
      for (let i = 1; i <= this.klassData.hitDie; i++) {
        hpArr.push(i)
      }
      return hpArr
    }
  },
  methods: {
    updateHp (value, index) {
      const newArr = [...this.klassHitPoints]
      newArr.splice(index, 1, value)
      this.klassHitPoints = newArr
    }
  }
}
</script>
