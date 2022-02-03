<template>
  <v-container>
    <me-cs-card-title v-if="$vuetify.breakpoint.smAndDown">
      Features & Traits
    </me-cs-card-title>
    <v-chip-group v-model="tab" active-class="primary--text" column>
      <v-chip
        v-for="(cTab, index) in tabs"
        :key="`action-chip-tab-${index}`"
        small
        :disabled="index !== 0 && features[index].length === 0"
      >
        {{ cTab }}
      </v-chip>
    </v-chip-group>
    <div v-for="(tabTitle, index) in tabs" :key="`feature-content-tab-${index}`">
      <div v-show="showTab(index)" v-if="index !== 0 && features[index].length">
        <me-cs-feature-list :items="features[index]">
          {{ tabTitle }}
        </me-cs-feature-list>
      </div>
    </div>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  data () {
    return {
      tab: 0,
      tabs: ['All', 'Class Features', 'Species Traits', 'Reputation Benefits', 'Feats']
    }
  },
  computed: {
    ...mapGetters({
      brews: 'brewsAsFeatures',
      traits: 'species/traits',
      klassesFeatures: 'klasses/klassesFeatures',
      klasses: 'klasses/klasses',
      selections: 'selections/selected'
    }),
    features () {
      return [
        [], // index 0 = all
        [
          ...this.klassFeatures,
          ...this.brews.filter(i => i.type === 'class-feature')
        ], // class features
        // species traits
        [
          ...this.traits,
          ...this.brews.filter(i => i.type === 'trait')
        ],
        // benefits
        [
          ...this.getSelectionsOfType('benefits')
        ],
        // feats
        [
          ...this.getSelectionsOfType('feats'),
          ...this.brews.filter(i => i.type === 'feat')
        ]
      ]
    },
    klassFeatures () {
      const klassFeatures = []
      for (const [index, klass] of this.klasses.entries()) {
        klassFeatures.push({ featureGroup: klass.data.name })
        klassFeatures.push(...this.klassesFeatures[index])
      }
      return klassFeatures
    }
  },
  methods: {
    getSelectionsOfType (type) {
      const ids = this.selections
        .filter(i => i.path.endsWith(type))
        .reduce((acc, curr) => acc.concat(...curr.value), [])
        .map(i => i.value)
      return this.$store.getters.getData(type).filter(i => ids.includes(i.id))
    },
    showTab (index) {
      if (this.tab === 0) {
        return true
      }
      return this.tab === index
    }
  }
}
</script>
