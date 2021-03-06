<template>
  <div :class="`power-card ${cardType}`">
    <v-sheet height="100%" elevation="0">
      <div
        v-if="power.id === 'spacer'"
        class="pa-2 text-center"
      >
        <v-img
          height="100%"
          :src="require('~/assets/images/me5e_logo_450w.png')"
          style="margin-top: -3em;"
        />
      </div>
      <v-row v-else>
        <!-- Title -->
        <v-col cols="12" :class="{'py-1': singleSide, 'text-xs-center': !singleSide}">
          <v-row :justify-space-between="singleSide">
            <v-col :class="`${titleSize} mb-0 text-uppercase font-weight-black`" cols="auto">
              {{ power.name }}
            </v-col>
            <v-col v-if="singleSide" cols="4" class="text-xs-right">
              <v-row justify="start" align-content="center" no-gutters>
                <v-col v-for="klass in power.availableClasses" :key="klass" cols="auto">
                  <v-avatar size="24" tile>
                    <v-img :src="require(`~/assets/images/classes/${klass}.svg`)" :alt="klass" />
                  </v-avatar>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <!-- info -->
        <v-col cols="12" class="text-xs-center power-info">
          <v-row>
            <v-col cols="4">
              <label>
                Casting Time
              </label>
              <div>
                {{ castingTime }}
              </div>
            </v-col>
            <v-col cols="4">
              <label>
                Range (AoE)
              </label>
              <div>
                <me-power-range :item="power" :size="aoeSize" />
              </div>
            </v-col>
            <v-col cols="4">
              <label>
                Duration
              </label>
              <div>
                <me-power-duration :item="power" :c-size="aoeSize" abbr />
              </div>
            </v-col>
          </v-row>
        </v-col>
        <!-- text -->
        <v-col cols="12" class="pa-1 power-text">
          <me-html :content="power.html" />
          <div v-if="singleSide" class="adv-options mt-1">
            <div class="text-xs-center">
              <label>
                Advanced options
              </label>
              <div v-for="(option, i) in power.advancementOptions" :key="i">
                <p>
                  <strong>{{ option.name }}</strong>
                  <me-html :content="option.description" />
                </p>
              </div>
            </div>
          </div>
        </v-col>
        <v-row justify="space-between" class="power-tags">
          <v-col cols="3">
            {{ powerLevel }}
          </v-col>
          <v-col cols="6" class="text-xs-center">
            {{ powerTags }}
          </v-col>
          <v-col cols="3" class="text-xs-right">
            <span v-if="power.primes || power.detonates">
              <v-avatar v-if="power.primes" :size="primeSize" color="white" class="primes" tile>
                <img :src="require(`~/assets/images/powers/${power.primes}.svg`)" :alt="power.primes">
              </v-avatar>
              <v-avatar v-if="power.detonates" :size="primeSize" color="white" class="primes" tile>
                <img src="~/assets/images/powers/detonate.svg" :alt="power.primes">
              </v-avatar>
            </span>
          </v-col>
        </v-row>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
export default {
  props: {
    power: {
      type: Object,
      default: () => { return {} }
    },
    cardOption: {
      type: String,
      default: 'single'
    }
  },
  data () {
    return {
      primeTypeCss: {
        force: 'purple--text text--darken-1',
        necrotic: 'blue-grey--text text--darken-2',
        fire: 'deep-orange--text text--darken-1',
        cold: 'cyan--text text--darken-1',
        lightning: 'blue--text text--darken-1'
      }
    }
  },
  computed: {
    singleSide () {
      return this.cardOption === 'single'
    },
    titleSize () {
      return this.singleSide ? 'title ml-2 xs8' : 'subheading text-xs-center xs12'
    },
    classSize () {
      return this.singleSide ? 24 : 16
    },
    castingTime () {
      if (this.power.castingTime.match(/reaction/gi)) {
        return 'Reaction'
      } else {
        return this.power.castingTime
      }
    },
    aoeSize () {
      return this.singleSide ? 12 : 9
    },
    primeSize () {
      return this.singleSide ? 18 : 13
    },
    cardType () {
      if (this.power.id === 'spacer') {
        return 'gen-card'
      } else {
        return `${this.power.type}-card`
      }
    },
    powerLevel () {
      return this.power.level.toString() === '0' ? 'Cantrip' : this.$options.filters.ordinal(this.power.level) + ' level'
    },
    powerTags () {
      if (this.power.attackType.length > 0) {
        return this.power.attackType.join(', ')
      } else if (this.power.effect.length > 0) {
        return this.power.effect.join(', ')
      }
      return ''
    }
  }
}
</script>
