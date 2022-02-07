<template>
  <v-row>
    <v-col v-for="item in items" :key="item.id" sm="6" lg="4" class="d-flex flex-column">
      <me-skeleton-loader :pending="loading" type="card" class="flex-grow-1 d-flex flex-column">
        <me-species-card :item="item" />
      </me-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: 'MeSpeciesList',
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    items () {
      return this.$store.getters.getData('species').filter(i => i.group === this.type)
    }
  }
}
</script>
