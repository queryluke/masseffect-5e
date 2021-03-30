<template>
  <v-container v-if="!$fetchState.pending">
    <me-page-title />
    <p>
      This generator creates disposable NPCs based on the Mass Effect archetypes. The Monster Manual outlines adjusting
      the provided NPC Archetypes with various races, weapons, and abilities, but this can be rather time consuming.
    </p>
    <p>
      This generator enables you to quickly create random NPCs with a given Challenge Rating (CR). CRs only go up to 12
      because higher CRs represent much more powerful monsters. As a point of reference, a Banshee has a CR of 13, so
      a grunt with a CR of 12 would represent a   very experienced and deadly NPC.
    </p>
    <v-card class="mt-8">
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
        class="mt-8"
      >
        <v-card v-if="generated">
          <v-card-text>
            <me-stat-block :stats="grunt" :title="true" />
          </v-card-text>
          <v-card-actions>
            <me-bookmark :item="grunt" type="bestiary" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { RandomValue } from '~/mixins/randomValue'
import { GruntGenerator } from '~/mixins/grunt_generator'

export default {
  mixins: [RandomValue, GruntGenerator],
  data () {
    return {
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
  async fetch () {
    this.$store.commit('pageTitle', 'NPC Generator')
    await this.$store.dispatch('FETCH_LOTS', ['classes', 'species', 'stats-by-cr', 'powers', 'weapons', 'gear', 'skills'])
  },
  head () {
    return {
      title: 'NPC Generator | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Generate random monster and NPC stats for easier encounter building' }
      ]
    }
  },
  computed: {
    crs () {
      return this.$store.getters.getData('stats-by-cr')
    },
    classes () {
      return this.$store.getters.getData('classes')
    },
    species () {
      return this.$store.getters.getData('species')
    },
    spells () {
      return this.$store.getters.getData('powers')
    },
    weapons () {
      return this.$store.getters.getData('weapons')
    },
    grenades () {
      return this.$store.getters.getData('gear').filter(g => g.type === 'Grenade')
    }
  },
  methods: {
    generate () {
      this.options = {
        cr: this.selectedCr === null ? this.randomValue(this.crs) : this.selectedCr,
        klass: this.selectedCl === null ? this.randomValue(this.classes) : this.selectedCl,
        species: this.selectedSp === null ? this.randomValue(this.species) : this.selectedSp
      }
      this.generated = false
      this.grunt = {}
      setTimeout(() => this.generateGrunt(), 300)
    }
  }
}
</script>
