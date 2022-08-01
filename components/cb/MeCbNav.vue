<template>
  <v-row justify="space-between" no-gutters>
    <v-col class="text-left" cols="3">
      <v-btn
        text
        plain
        :disabled="tab === 0"
        color="primary"
        tile
        @click="tab -= 1"
      >
        <v-icon>
          mdi-chevron-left
        </v-icon>
        Prev
      </v-btn>
    </v-col>
    <v-col class="text-center" cols="3">
      <v-btn text tile plain @click="$emit('goToSheet')">
        View
      </v-btn>
    </v-col>
    <v-col v-if="tab !== 3" class="text-right" cols="3">
      <v-btn
        text
        plain
        color="primary"
        tile
        @click="tab += 1"
      >
        Next
        <v-icon>
          mdi-chevron-right
        </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'MeCbNav',
  computed: {
    tab: {
      get () {
        return this.$store.getters['tabbedPage/activeTab']
      },
      set (value) {
        this.$store.commit('tabbedPage/SET_ACTIVE_TAB', value)
      }
    }
  }
}
</script>
