<template>
  <v-container>
    <me-page-title title="Backgrounds" />
    <p>
      The sample backgrounds presented here provide both concrete benefits (features, proficiencies, and languages) and
      roleplaying suggestions.
    </p>
    <v-expansion-panels>
      <v-expansion-panel v-for="item in items" :key="item.id">
        <v-expansion-panel-header>
          {{ item.name }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <me-markdown :content="item.html" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
export default {
  async fetch () {
    await this.$store.dispatch('FETCH_DATA', 'backgrounds')
  },
  computed: {
    items () {
      return this.$store.getters('getData', 'backgrounds')
    }
  },
  head () {
    return {
      title: 'Backgrounds | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Backgrounds provide additional flavor and benefits to your character.' }
      ]
    }
  },
  layout: 'leftNav'
}
</script>
