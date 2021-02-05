<template>
  <v-container>
    <me-page-title />
    <v-row>
      <v-col
        v-for="item in items"
        :key="item.id"
        cols="12"
        sm="6"
        md="4"
        class="d-flex flex-column"
      >
        <v-card
          :to="{ name: 'classes-id', params: { id: item.id }}"
          hover
          class="ma-2"
        >
          <v-row>
            <v-col cols="4" sm="3">
              <v-img
                :src="`/images/classes/${item.id}.svg`"
                height="200px"
                position="right"
              />
            </v-col>
            <v-col class="pa-6 pl-0">
              <h3 class="text-h4 font-weight-thin">
                {{ item.name }}
              </h3>
              <p class="body-2">
                {{ item.snippet }}
              </p>
              <div class="d-flex justify-space-around flex-wrap">
                <div
                  v-for="(stat, index) in stats(item)"
                  :key="index"
                  class="text-center mb-1"
                >
                  <div class="text-overline mb-n1">
                    {{ stat.title }}
                  </div>
                  <div class="text-body-2">
                    {{ stat.value }}
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async fetch () {
    this.$store.commit('pageTitle', 'Classes')
    this.items = await this.$store.dispatch('FETCH_DATA', 'classes')
  },
  data () {
    return {
      items: []
    }
  },
  methods: {
    stats (item) {
      return [
        { title: 'Hit Dice', value: `1d${item.hitDice}` },
        { title: 'Primary Ability', value: item.primaryAbility },
        { title: 'Saves', value: item.savingThrows.text }
      ]
    }
  },
  head () {
    return {
      title: 'Classes | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Choose your favorite Mass Effect class, each with 3 subclasses to provide variety to the game.' }
      ]
    }
  },
  layout: 'phb'
}
</script>
