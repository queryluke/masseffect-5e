<template>
  <v-container>
    <me-page-title />
    <v-row>
      <v-col v-for="item in items" :key="item.id" sm="6" md="4" class="d-flex flex-column">
        <v-card
          :to="{ name: 'species-id', params: { id: item.id } }"
          nuxt
          hover
          class="flex-grow-1"
        >
          <v-img :src="item.img" height="200" />
          <v-card-title>
            {{ item.name }}
          </v-card-title>
          <v-card-text>
            <p>
              {{ item.snippet }}
            </p>
            <p class="text-subtitle-1 mb-0">
              Racial Traits
            </p>
            <p>
              <me-species-ability-score-increase-summary :data="item.abilityScoreIncrease" />, {{ item.traits.map(i => i.name).join(', ') }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  async fetch () {
    this.$store.commit('pageTitle', 'Species')
    this.items = await this.$store.dispatch('FETCH_DATA', 'species')
  },
  data () {
    return {
      items: []
    }
  },
  head () {
    return {
      title: 'Species | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Every species you need for a deeply involved Mass Effect Campaign.' }
      ]
    }
  }
}
</script>
