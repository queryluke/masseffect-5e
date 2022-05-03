<template>
  <v-progress-circular
    :value="fourthPool.value"
    :color="fourthPool.color"
    :size="190"
    rotate="270"
    :width="fourthPool.width"
  >
    <v-progress-circular
      :value="thirdPool.value"
      :color="thirdPool.color"
      :size="170"
      rotate="270"
      :width="thirdPool.width"
    >
      <v-progress-circular
        :value="secondPool.value"
        :color="secondPool.color"
        :size="150"
        rotate="270"
        :width="secondPool.width"
      >
        <v-progress-circular
          :value="Math.ceil(hp.current / hp.max * 100)"
          :color="csBgColor('hp')"
          :size="130"
          rotate="270"
          width="10"
        >
          <me-cs-health-text hide-barrier />
        </v-progress-circular>
      </v-progress-circular>
    </v-progress-circular>
  </v-progress-circular>
</template>

<script>

import { CsColors } from '~/mixins/character/csColors'

export default {
  mixins: [CsColors],
  props: {
    hp: {
      type: Object,
      default: () => {
        return {
          max: 1,
          current: 1
        }
      }
    },
    shields: {
      type: Object,
      default: () => {
        return {
          max: 5,
          current: 5
        }
      }
    },
    tempHp: {
      type: Object,
      default: () => {
        return {
          value: 0,
          max: 0
        }
      }
    },
    techArmor: {
      type: Object,
      default: () => {
        return {
          value: 0,
          max: 0
        }
      }
    }
  },
  computed: {
    secondPool () {
      if (this.tempHp.value) {
        return {
          value: Math.ceil(this.tempHp.value / this.tempHp.max * 100),
          color: this.csBgColor('temp'),
          width: 11
        }
      } else if (this.shields.current) {
        return {
          value: Math.ceil(this.shields.current / this.shields.max * 100),
          color: this.csBgColor('shields'),
          width: 11
        }
      } else if (this.techArmor.value) {
        return {
          value: Math.ceil(this.techArmor.value / this.techArmor.max * 100),
          color: this.csBgColor('techArmor'),
          width: 11
        }
      } else {
        return {
          value: 0,
          color: undefined,
          width: 0
        }
      }
    },
    thirdPool () {
      if (this.shields.current && this.tempHp.value) {
        return {
          value: Math.ceil(this.shields.current / this.shields.max * 100),
          color: this.csBgColor('shields'),
          width: 11
        }
      } else if (this.techArmor.value && (this.tempHp.value || this.shields.current)) {
        return {
          value: Math.ceil(this.techArmor.value / this.techArmor.max * 100),
          color: this.csBgColor('techArmor'),
          width: 11
        }
      } else {
        return {
          value: 0,
          color: undefined,
          width: 0
        }
      }
    },
    fourthPool () {
      if (this.techArmor.value && this.shields.current && this.tempHp.value) {
        return {
          value: Math.ceil(this.techArmor.value / this.techArmor.max * 100),
          color: this.csBgColor('techArmor'),
          width: 11
        }
      } else {
        return {
          value: 0,
          color: undefined,
          width: 0
        }
      }
    }
  }
}
</script>
