<template>
  <div>
    <me-cs-card-title v-if="$vuetify.breakpoint.smAndDown">
      Logs
    </me-cs-card-title>
    <div class="mt-3">
      <!--pre>{{JSON.stringify(logs, undefined, 4)}}</pre-->
      <v-list v-if="logs.length">
        <v-list-item v-for="(entry, index) in logs" :key="index" class="pb-2">
          <v-card v-if="entry.type == 'dice-roll' ">
            <v-card-title class="pb-2">{{entry.title || 'Title Here'}}</v-card-title>
            <v-card-subtitle >{{entry.subtitle}}</v-card-subtitle>
            <v-card-text>
              {{entry.data}}
                <!-- TODO: would be nice to have a fun UI... -->
                <!--template v-for="(roll, rollIndex) in entry.rolls">
                  <v-col :key="index + ':' + rollIndex" class="text-center">
                    <v-img
                    :src="require('~/assets/images/misc/d20blank.png')"
                    max-width="60"/>
                    <div class="">
                      <span>{{roll.value}}</span>
                    </div>
                  </v-col>
                </template-->
            </v-card-text>
          </v-card>
        </v-list-item>
      </v-list>
      <v-banner v-if="!logs.length">No Logs Found</v-banner>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeCsLogs',
  computed: {
    logs () {
      return this.$store.getters['character/logs'] || []
    }
  }
}
</script>

<style scoped>
h2 {
  white-space: nowrap;
  height: 30px;
}
.die-container {
  width: auto;
  /*height: 70px;*/
  margin: auto;
}
.log-entry-container {
  width: 100%;
}
.v-card {
  width: 100%;
}
</style>
