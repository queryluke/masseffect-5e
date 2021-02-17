<template>
  <v-container>
    <v-row align-content="space-around">
      <v-col>
        <me-page-title title="Tool Proficiencies" />
      </v-col>
      <v-col class="text-right">
        <v-btn to="/manual/equipment#tools-kits" nuxt outlined color="primary">
          Tools Proficiency Rules
        </v-btn>
      </v-col>
    </v-row>
    <me-skeleton-loader :pending="$fetchState.pending" type="expansionList">
      <me-expansion-list
        :items="items"
        :headers="headers"
      >
        <template v-slot:header.name="{ item }">
          <div>
            {{ item.name }}
          </div>
          <div class="text-caption">
            {{ item.type }}
          </div>
        </template>
      </me-expansion-list>
    </me-skeleton-loader>
  </v-container>
</template>

<script>
export default {
  async fetch () {
    this.$store.commit('pageTitle', 'Tool Proficiencies')
    this.items = await this.$store.dispatch('FETCH_DATA', 'tool-profs')
  },
  data () {
    return {
      items: [],
      headers: [
        { label: 'Name', key: 'name' }
      ]
    }
  },
  head () {
    return {
      title: 'Tools Proficiencies - Appendix | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Tools Proficiences provide additional benefits when combined with certain skills.' }
      ]
    }
  }
}
</script>
