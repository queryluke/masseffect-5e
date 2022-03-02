<template>
  <div class="log-entry pa-2">
    <!--v-hover v-slot="{ hover }" open-delay="1000"-->
      <div>
        <template v-if="data.type == 'card' " class="">
          <v-sheet rounded class="pl-1 pr-3 log-entry-sheet" :title="data.title">
            <v-row @click.stop="open = !open" class="d-flex align-center">
              <v-col cols="9" class="d-flex align-center">
                <v-icon color="info" class="pr-2 log-info-icon">
                  {{open ? 'mdi-chevron-down' : 'mdi-chevron-right'}}
                </v-icon>
                <span class="log-entry-min-title">{{ data.title }}</span>
              </v-col>
              <v-col cols="3" class="text-right"><strong>Result: {{ data.result || data.text }}</strong></v-col>
            </v-row>
          </v-sheet>

          <v-expand-transition>
            <v-card v-if="open" class="justify-space-between transition-ease-in-out">
              <v-card-title class="log-card-title">
                <span class="log-entry-min-title">{{data.title}}</span>
              </v-card-title>
              <v-card-subtitle>
                {{data.subtitle}}
              </v-card-subtitle>
              <v-card-text class="log-card-text">
                <div v-html="data.text"></div>
              </v-card-text>
              <v-card-actions>
                <template v-for="(action, index) in data.actions">
                  <v-btn v-if="action.type == 'btn'" @click="action.action(...action.params); open = false;" :key="index">
                    {{action.title}}
                  </v-btn>
                </template>
              </v-card-actions>
            </v-card>
          </v-expand-transition>

          <div v-if="open" class="d-flex justify-end pt-1">
            <small>Entry #{{entry.index + 1}} - {{timeString}}</small>
          </div>
        </template>
      </div>
  </div>
</template>

<script>

export default {
  props: {
    entry: {
      type: Object,
      default: () => {}
    },
    isLastEntry: {
      type: Boolean
    }
  },
  data () {
    return {
      data: this.entry.data || {},
      showTimestamp: false,
      open: this.isLastEntry
    }
  },
  watch: {
    logsLength () {
      this.open = false
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
    },
    logsLength () {
      return this.$store.getters['character/logs'].length || []
    }
  }
}
</script>

<style lang="scss">
.log-entry {
  // width: 400px;
  font-size: 14px;
}
.log-entry-sheet {
  width: 100%;
}
.log-entry-min-title {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.log-card-title {
  font-size: 14px;
}
.log-card-text {
  padding-bottom: 0;
}
.log-info-icon::after {
  background: none !important;
}
</style>
