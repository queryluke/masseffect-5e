<template>
  <span v-if="!$fetchState.pending">
    <v-tooltip top open-delay="200" max-width="500" content-class="pa-0">
      <template #activator="{ on, attrs }">
        <span v-bind="attrs" v-on="on">
          {{ item.name }}
        </span>
      </template>
      <v-card outlined elevation="20">
        <v-card-title>
          {{ item.name }}
        </v-card-title>
        <v-card-text>
          <me-conditions-info :item="item" />
        </v-card-text>
      </v-card>
    </v-tooltip>
  </span>
</template>

<script>
export default {
  name: 'MeCondition',
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  async fetch () {
    await this.$store.dispatch('FETCH_DATA', 'conditions')
  },
  computed: {
    item () {
      return this.$store.getters.getItem('conditions', this.id)
    }
  }
}
</script>
