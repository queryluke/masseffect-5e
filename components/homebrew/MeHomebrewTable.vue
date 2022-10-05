<template>
  <v-data-table
    :headers="headers"
    :item="items"
  >
    <template #top>
      <v-row class="px-3">
        <v-col cols="8">
          <v-text-field v-model="search" hide-details label="Search" />
        </v-col>
      </v-row>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'MeHomebrewTable',
  data () {
    return {
      search: null,
      headers: [
        { text: '', value: 'type' },
        { text: 'Name', value: 'title' },
        { text: 'Votes', value: 'votes' },
        { text: 'Status', value: 'publicationStatus' },
        { text: 'Adds', value: 'adds' },
        { text: '', value: 'actions' }
      ],
      items: []
    }
  },
  methods: {
    getItems () {

    }
  }
}
</script>
