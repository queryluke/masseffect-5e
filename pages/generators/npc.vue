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
        <me-npc-generator-options />
      </v-card-text>
      <v-card-actions>
        <v-btn
          block
          @click="generateGrunt()"
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
        <v-card v-if="generated">
          <v-card-text>
            <me-stat-block :stats="grunt" />
          </v-card-text>
          <v-card-actions>
            <me-bookmark :item="grunt" type="npc" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GruntGenerator } from '~/mixins/grunt_generator'

export default {
  mixins: [GruntGenerator],
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
      loading: true
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
