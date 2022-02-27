<template>
  <div class="log-entry pa-2" @click="showTimestamp = !showTimestamp">
    <template v-if="data.type == 'card' " class="">
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr>
              <td>{{ data.title }}</td>
              <td class="text-right">Result: {{ data.result || data.text }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <!--v-card class="card-log-entry" width="100%">
        <v-card-title>
          {{data.title}}
        </v-card-title>
        <v-card-subtitle>
          {{data.subtitle}}
        </v-card-subtitle>
        <v-card-text class="card-text">
          <div v-html="data.text"></div>
        </v-card-text>
        <v-card-actions>
          <template v-for="(action, index) in data.actions">
            <v-btn v-if="action.type == 'btn'" @click="action.action(...action.params)" :key="index">
              {{action.title}}
            </v-btn>
          </template>
        </v-card-actions>
      </v-card-->
    </template>
    <div v-show="showTimestamp" transition="scroll-y-transition" class="text-right">
      <small>{{timeString}}</small>
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
      showTimestamp: false
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
  width: 100%;
}
.v-card__text {
  padding-bottom: 0;
  max-width: 300px;
}
</style>
