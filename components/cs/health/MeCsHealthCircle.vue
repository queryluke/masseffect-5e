<template>
  <v-progress-circular
    :value="tempHp.value ? Math.ceil(tempHp.value / tempHp.max * 100) : 0"
    :color="csBgColor('temp')"
    :size="190"
    rotate="270"
    :width="tempHp.value ? 10 : 0"
  >
    <v-progress-circular
      :value="shields.max ? Math.ceil(shields.current / shields.max * 100) : 0"
      :color="csBgColor('shields')"
      :size="175"
      rotate="270"
      :width="shields.current ? 15 : 0"
    >
      <v-progress-circular
        :value="Math.ceil(hp.current / hp.max * 100)"
        :color="csBgColor('hp')"
        :size="150"
        rotate="270"
        width="20"
      >
        <me-cs-health-text hide-barrier />
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
    }
  }
}
</script>
