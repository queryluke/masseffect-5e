<template>
  <div class="log-entry pa-2">
    <!--v-hover v-slot="{ hover }" open-delay="1000"-->
      <div>
        <template v-if="data.type == 'card' " class="">
                <v-sheet rounded class="pl-1 pr-3">
                <v-row @click.stop="moreInfo = !moreInfo">
                  <v-col cols="9" class="d-flex align-center">
                    <v-icon color="info" class="pr-2 log-info-icon">
                      {{moreInfo ? 'mdi-chevron-down' : 'mdi-chevron-right'}}
                    </v-icon>
                    <span>{{ data.title }}</span>
                  </v-col>
                  <v-col cols="3" class="text-left">Result: {{ data.result || data.text }}</v-col>
                </v-row>
                </v-sheet>
              <v-expand-transition>
                <v-card v-if="moreInfo" class="justify-space-between transition-ease-in-out">
                  <v-card-title>
                    <span>{{data.title}}</span>
                  </v-card-title>
                  <v-card-subtitle>
                    {{data.subtitle}}
                  </v-card-subtitle>
                  <v-card-text class="log-card-text">
                    <div v-html="data.text"></div>
                    <div class="d-flex justify-space-between pt-1">
                      <small>{{timeString}}</small>
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <template v-for="(action, index) in data.actions">
                      <v-btn v-if="action.type == 'btn'" @click="action.action(...action.params); moreInfo = false;" :key="index">
                        {{action.title}}
                      </v-btn>
                    </template>
                  </v-card-actions>
                </v-card>
              </v-expand-transition>
        </template>
      </div>
  </div>
</template>

<script>

export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      showTimestamp: false,
      moreInfo: false
    }
  },
  computed: {
    isMetric () {
      return this.$store.getters['user/imperial']
    },
    timeString () {
      if (!this.data.timestamp) { return '' }
      const ts = new Date(this.data.timestamp)
      const dateObj = ts
      const month = dateObj.getMonth() + 1 // months from 1-12
      const day = dateObj.getDate()
      const year = dateObj.getFullYear()
      const mdy = !this.isMetric ? day + '/' + month + '/' + year : month + '/' + day + '/' + year
      return mdy + ' ' + ts.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3') // don't ask
    }
  }
}
</script>

<style lang="scss">
.log-entry {
  width: 400px;
}
.log-card-text {
  padding-bottom: 0;
}
.log-info-icon::after {
  background: none !important;
}
</style>
