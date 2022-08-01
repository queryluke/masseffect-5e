<template>
  <v-card flat outlined class="px-1">
    <div v-if="result[0] === result[1]">
      {{ result[0] }}
    </div>
    <div v-else class="d-flex align-center">
      <div class="font-weight-thin" style="margin-top: -2px">
        <small>
          {{ result[0] }}
        </small>
      </div>
      <v-icon size="12" style="margin: 0 1px">
        mdi-refresh
      </v-icon>
      <div>
        {{ result[1] }}
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'MeCsRollResult',
  props: {
    result: {
      type: Array,
      default: () => [0, 0]
    }
  }
}
</script>
