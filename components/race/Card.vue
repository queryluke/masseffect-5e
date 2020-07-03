<template lang="pug">
  v-card(:to="{ name: 'phb-races-id', params: { id: data.id }}" hover).ma-2
    v-img(:src="data.img" height="200px")
    v-card-title(primary-title)
      v-layout(row wrap)
        v-flex(xs12 sm6)
          h3.headline.mb-0 {{ data.name }}
        v-flex(xs12 sm6).text-xs-left.text-sm-right
          v-chip(v-if="data.galaxy.includes('Milky Way')" color="primary" outline small) Milky Way
          v-chip(v-if="data.galaxy.includes('Andromeda')" color="secondary" outline small) Andromeda
        v-flex(xs12)
          p {{ data.snippet }}
          p.subheading.mb-0 Racial Traits
          p #[increases(:data="data.abilityScoreIncrease")]{{ traitSummary }}

</template>

<script>
import Increases from '~/components/race/Increases.vue'

export default {
  components: {
    Increases
  },
  props: {
    data: {
      type: Object,
      default: () => { return {} }
    }
  },
  computed: {
    traitList () {
      return this.data.traits.map(t => this.$options.filters.titlecase(t.replace(/-/g, ' '))).join(', ')
    },
    traitSummary () {
      let text = ''
      if (this.data.traits) {
        text += `, ${this.traitList}`
      }
      if (this.data.startingFeats) {
        text += `, and choose ${this.data.startingFeats.count} ${this.$options.filters.pluralize(this.data.startingFeats.count, 'feat')}`
      }
      return text
    }
  }
}
</script>
