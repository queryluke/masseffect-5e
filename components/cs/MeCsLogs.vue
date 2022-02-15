<template>
  <div>
    <me-cs-card-title v-if="$vuetify.breakpoint.smAndDown">
      Logs
    </me-cs-card-title>
    <div class="mt-3">
      <v-list v-if="logs.length">
        <v-list-item v-for="(entry, index) in logs" :key="index" class="pb-2">
          <v-card class="log-entry-container">
            <v-card-title class="pb-2">{{entry.title}}</v-card-title>
            <v-card-subtitle v-if="entry.subtitle">{{entry.subtitle}}</v-card-subtitle>
            <v-card-text>
              <v-row v-if="entry.rolls" class="die-container d-flex">
                <template v-for="(roll, index) in entry.rolls">
                <v-col :key="index">
                  <v-img
                  :src="require('~/assets/images/misc/d20blank.png')"
                  max-width="60"/>
                  <div class="centered">
                    <span>{{roll.raw}}</span>
                    <span v-if="roll.mod">{{roll.mod >= 0 ? '+' : '-'}} {{Math.abs(roll.mod)}}</span>
                  </div>
                </v-col>
                </template>
              </v-row>
            </v-card-text>
          </v-card>
          <!--v-divider v-if="index != logs.length-1" style="width: 100%;"/-->
        </v-list-item>
      </v-list>
      <v-banner v-if="!logs.length">No Logs Found</v-banner>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
export default {
  name: 'MeCsLogs',
  data () {
    return {
      cachedValue: null,
      loading: false
    }
  },
  computed: {
    logs () {
      return this.$store.getters['character/character'].logs || [{
        title: 'Cool Roll',
        rolls: [
          { raw: 10, mod: -2 }, { raw: 12 }
        ]
      },
      {
        title: 'Deception',
        rolls: [
          { raw: 2, mod: 2 }, { raw: 20 }
        ]
      }]
    },
    saveable () {
      return this.cachedValue !== this.logs
    },
    viewOnly () {
      return this.$store.state.character.viewOnly
    }
  },
  watch: {
    notes (newVal) {
      if (newVal !== this.cachedValue) {
        this.cachedValue = newVal
      }
    }
  },
  created () {
    this.cachedValue = this.logs
    this.debouncedUpdate = debounce(() => {
      this.updateAttr()
    }, 2000)
  },
  methods: {
    async updateAttr () {
      if (this.cachedValue !== this.logs) {
        this.loading = true
        await this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'logs', value: this.cachedValue })
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
/* Centered text */
.centered {
  position: relative;
  width: 60px;
  height: 60px;
  /*text-align: center;
  top: -44px;*/
}
.col {
  /*height: 100%;*/
}
.die-container {
  width: auto;
  /*height: 70px;*/
  margin: auto;
}
.log-entry-container {
  margin: auto;
  text-align: -webkit-center;
}
</style>
