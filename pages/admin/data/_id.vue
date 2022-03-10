<template>
  <v-container>
    <v-card>
      <v-card-title class="text-capitalize">
        {{ model }}
        <v-spacer />
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        :loading="$fetchState.pending()"
      />
    </v-card>
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
  data () {
    return {
      search: '',
      items: [],
      headers: [
        { value: 'name', text: 'Name' }
      ]
    }
  },
  async fetch () {
    this.items = await this.$store.dispatch('api/QUERY', { query: 'listModels', variables: { type: this.model, version: 1, limit: 1000 } })
  },
  computed: {
    model () {
      return this.$route.params.id
    }
  }
}
</script>
