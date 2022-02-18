<template>
  <div class="log-entry pa-2">
    <template v-if="data.type == 'card' " class="">
      <v-card class="card-log-entry" width="100%">
        <v-card-title>
          {{data.title}}
        </v-card-title>
        <v-card-subtitle>
          {{data.subtitle}}
        </v-card-subtitle>
        <v-card-text v-html="data.text"></v-card-text>
        <v-card-actions>
          {{data.actions}}
        </v-card-actions>
      </v-card>
    </template>
  </div>
</template>

<script>

export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss">
.log-entry {
  width: 100%;
}
</style>
