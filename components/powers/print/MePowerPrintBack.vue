<template>
  <div :class="`${cardType} power-card`">
    <v-sheet height="100%" :color="cardColor" elevation="0">
      <v-row v-if="cardOption === 'single' || power.id === 'spacer'" class="pa-2">
        <v-img :src="require('~/assets/images/me5e_logo_450w.png')" style="margin-top: -3em;" />
      </v-row>
      <div v-else>
        <v-row>
          <v-col cols="12" class="text-xs-center">
            <div class="mb-0 text-uppercase font-weight-black subheading text-xs-center">
              {{ power.name }}
            </div>
          </v-col>
          <v-col cols="12" class="text-xs-center power-info">
            <v-row justify="center" align-content="center" no-gutters>
              <v-col v-for="klass in power.availableClasses" :key="klass" cols="auto">
                <v-avatar size="24" tile>
                  <v-img :src="require(`~/assets/images/classes/${klass}.svg`)" :alt="klass" />
                </v-avatar>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <div class="adv-options mt-1">
              <div class="text-xs-center">
                <label>Advanced Options</label>
              </div>
              <div v-for="(option, i) in power.advancementOptions" :key="i">
                <p>
                  <strong>
                    {{ option.name }}: {{ option.description }}
                  </strong>
                </p>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
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
  computed: {
    cardColor () {
      return this.cardOption === 'single' ? 'blue-grey lighten-4' : ''
    },
    cardType () {
      if (this.cardOption === 'single' || this.power.id === 'spacer') {
        return 'gen-card'
      } else {
        return `${this.power.type}-card`
      }
    }
  }
}
</script>
