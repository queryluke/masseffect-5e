<template>
  <div>
    {{shieldWidth}}
    {{shieldPad}}
    <div style="max-width: 130px; text-align: center;">
      <v-progress-circular
        :value="100 * current / maximum"
        color="red"
        :class="[$style.circle, $style.red]"
        :size="circleSize"
        rotate="270"
        width="10"
      >
        <div :class="$style.circle">
          <h2>{{ current }}<span class="text-caption text--accent-3 blue--text" v-if="shields">
              ({{ shields }})
            </span><span class="text-caption text--accent-3 green--text" v-if="temporary">
              ({{ temporary }})
            </span>
          </h2>
          <v-divider width="80" :class="$style.divider"></v-divider>
          <h2>{{ maximum }}</h2>
        </div>
      </v-progress-circular>
      <v-progress-circular
        :value="100"
        :color="'blue accent-3'"
        :class="[$style.circle, $style.blue]"
        :size="shieldSize"
        :style="'opacity: '+ (0.5 + flicker) +'; margin-left: '+shieldPad.toString()+'; margin-top: '+shieldPad.toString()+';'"
        :width="shieldWidth">
      </v-progress-circular>
      <v-progress-circular
        class="greenCircle"
        :value="100 * temporary / maximum"
        :color="'green accent-3'"
        :class="$style.circle"
        :size="circleSize"
        :rotate="360 * current / maximum - 90"
        width="10">
      </v-progress-circular>
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
      return 15 * this.shields / 10
    },
    shieldPad () {
      return (this.circleSize - this.shieldSize) / 2 + 'px' // this.shieldWidth / 2
    },
    shieldSize () {
      return this.circleSize + this.shieldWidth * 2
    },
    circleSize () {
      return 120
    }
  },
  created () {
    this.pollData()
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
