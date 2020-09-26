<template>
  <v-container>
    <me-page-title />
    <p>
      This generator creates disposable NPCs based on the Mass Effect archetypes. The #[em Monster Manual] outlines adjusting
      the provided NPC Archetypes with various races, weapons, and abilities, but this can be rather time consuming.
    </p>
    <p>
      This generator enables you to quickly create random NPCs with a given Challenge Rating (CR). CRs only go up to 12
      because higher CRs represent much more powerful monsters. As a point of reference, a Banshee has a CR of 13, so
      a grunt with a CR of 12 would represent a #[em very] experienced and deadly NPC.
    </p>
    <v-card v-if="!loading" class="mt-8">
      <v-card-text>
        <v-row>
          <v-col sm="4">
            <v-select
              v-model="selectedCr"
              :items="crs"
              label="Select a Challenge Rating"
              item-text="cr"
              item-value="cr"
              return-object
              single-line
              menu-props="bottom"
              hint="Challenge Rating"
              persistent-hint
            />
          </v-col>
          <v-col sm="4">
            <v-select
              v-model="selectedCl"
              :items="classes"
              label="Select a Class"
              item-text="name"
              item-value="id"
              return-object
              single-line
              menu-props="bottom"
              hint="Class"
              persistent-hint
            />
          </v-col>
          <v-col sm="4">
            <v-select
              v-model="selectedSp"
              :items="species"
              label="Select a Species"
              item-text="name"
              item-value="id"
              return-object
              single-line
              menu-props="bottom"
              hint="Race"
              persistent-hint
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          block
          @click="generate()"
        >
          Generate
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-row>
      <v-col
        sm="10"
        lg="8"
        offset-sm="1"
        offset-lg="2"
      >
        <v-card v-if="!loading">
          <v-card-text>
            <me-stat-block :stats="npc" />
          </v-card-text>
          <v-card-actions>
            <me-bookmark :item="npc" type="npc" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { RandomValue } from '~/mixins/randomValue'

export default {
  mixins: [RandomValue],
  async fetch () {
    this.$store.commit('pageTitle', 'NPC Generator')
    await Promise.all([
      this.$store.dispatch('FETCH_DATA', 'classes'),
      this.$store.dispatch('FETCH_DATA', 'species'),
      this.$store.dispatch('FETCH_DATA', 'stats-by-cr'),
      this.$store.dispatch('FETCH_DATA', 'powers'),
      this.$store.dispatch('FETCH_DATA', 'weapons'),
      this.$store.dispatch('FETCH_DATA', 'gear'),
      this.$store.dispatch('FETCH_DATA', 'skills')
    ])
    this.loading = false
  },
  data () {
    return {
      loading: true,
      selectedCr: null,
      selectedSp: null,
      selectedCl: null,
      options: {
        cr: null,
        klass: null,
        species: null
      }
    }
  },
  computed: {
    crs () {
      return this.$store.getters.getData('stats-by-cr')
    },
    species () {
      return this.$store.getters.getData('species')
    },
    classes () {
      return this.$store.getters.getData('classes')
    }
  },
  methods: {
    generate () {
      this.options = {
        cr: this.selectedCr === null ? this.randomValue(this.crs) : this.selectedCr,
        klass: this.selectedCl === null ? this.randomValue(this.classes) : this.selectedCl,
        species: this.selectedSp === null ? this.randomValue(this.species) : this.selectedSp,
      }
    }
  },
  head () {
    return {
      title: 'NPC Generator | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Generate random monster and NPC stats for easier encounter building' }
      ]
    }
  }
}
</script>
