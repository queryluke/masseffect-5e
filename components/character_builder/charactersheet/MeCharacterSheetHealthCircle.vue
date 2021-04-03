<template>
  <div>
    <div class="d-flex flex-column align-center text-center">
      <v-progress-circular
        :value="100 * current / maximum"
        color="secondary"
        :class="[$style.circle, $style.red]"
        :size="circleSize"
        rotate="270"
        width="10"
      >
        <div :class="$style.circle">
          <h2>{{ current }}</h2>
          <div
            v-if="shields || temporary"
            style="margin-top: -10px;"
          >
            <span class="text-caption text--accent-3 blue--text" v-if="shields">
              ({{ shields.value }})
            </span>
            <span class="text-caption text--accent-3 green--text" v-if="temporary">
              ({{ temporary }})
            </span>
          </div>
          <v-divider width="80" :class="$style.divider"></v-divider>
          <h2>{{ maximum }}</h2>
        </div>
      </v-progress-circular>
      <v-progress-circular
        :value="100"
        :color="'blue accent-3'"
        :class="[$style.circle, $style.blue]"
        :size="shieldSize"
        :style="'opacity: '+ (0.5 + flicker) +'; margin-left: '+(shieldPad + shieldWidth).toString()+'px; margin-top: '+shieldPad.toString()+'px;'"
        :width="shieldWidth">
      </v-progress-circular>
      <v-progress-circular
        class="greenCircle"
        :value="100 * temporary / maximum"
        :color="'green'"
        :class="$style.circle"
        :size="circleSize"
        :rotate="360 * current / maximum - 90"
        width="10">
      </v-progress-circular>
      <v-btn class="mt-4">Rest</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: ['current', 'temporary', 'maximum', 'shields'],
  data () {
    return {
      polling: null,
      flicker: 0
    }
  },
  methods: {
    pollData () {
      this.polling = setInterval(() => {
        this.flicker = this.flicker === 0 ? 0.025 : 0
      }, 1)
    }
  },
  computed: {
    shieldWidth () {
      return 10 * this.shields.value / this.shields.max
    },
    shieldPad () {
      return (this.circleSize - this.shieldSize) / 2 // this.shieldWidth / 2
    },
    shieldSize () {
      return this.circleSize + this.shieldWidth * 2
    },
    circleSize () {
      return 120
    }
  },
  created () {
    // this.pollData()
  }
}
</script>

<style module lang="scss">
  .divider {
    visibility: visible;
  }

  .circle {
    transform: scaleX(-1);

    &.red {
      position: absolute;
    }

    &.blue {
      position: absolute;
      z-index: 1;
      // margin-left: -10px;
      // margin-top: -10px;
    }
  }
</style>

<style lang="scss">
  .greenCircle .v-progress-circular__underlay {
    stroke: transparent;
  }
</style>
