<template>
  <div>
    <me-cs-card-title v-if="$vuetify.breakpoint.smAndDown">
      Logs
    </me-cs-card-title>
    <div class="mt-3">
      <template v-if="logs.length">
        <!--pre>{{JSON.stringify(logs, undefined, 4)}}</pre-->
        <v-list>
            <v-list-item v-for="(entry, index) in logs.slice().reverse()" :key="index" class="pb-2" >
              <me-cs-log-entry :data="entry.data" />
              <!--component  v-if="entry.component" :is="entry.component" :v-bind="entry.attrs">
                <template v-if="entry.component.subcomponents">
                  <component
                    v-for="(sc, subIndex) in entry.subcomponents"
                    :key="index+':'+subIndex"
                    :is="sc"
                    :v-bind="sc.attrs">
                  </component>
                </template>
              <v-card v-if="entry.type == 'dice-roll' ">
                <v-card-title class="pb-2">{{entry.title || 'Title Here'}}</v-card-title>
                <v-card-subtitle v-if="entry.skill">
                  <me-cs-skill-item class="skill-compact" :key="index + ':' + entry.skill.id" :item="entry.skill" />
                </v-card-subtitle>
                <v-card-subtitle v-else>
                  {{entry.subtitle}}
                </v-card-subtitle>
                <v-card-text>
                  {{entry}}
                  {{entry.data}}
                </v-card-text>
              </v-card>
              </component-->
            </v-list-item>
        </v-list>
        <v-btn @click="clearLogs()">Clear Logs</v-btn>
      </template>
      <v-banner v-if="!logs.length">No Logs Found</v-banner>
    </div>
  </div>
</template>

<script>
import MeCsLogEntry from './MeCsLogEntry.vue'
export default {
  components: { MeCsLogEntry },
  name: 'MeCsLogs',
  computed: {
    logs () {
      return this.$store.getters['character/logs'] || []
    }
  },
  methods: {
    clearLogs () {
      return this.$store.dispatch('character/LOG_DESTROY')
    }
  }
}
</script>

<style lang="scss" scoped>
.skill-compact {
  margin: 0 !important;
  max-width: 200px;
}
.v-card {
  width: 100%;
}
</style>
