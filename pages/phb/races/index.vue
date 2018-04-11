<template lang="pug">
  v-container(fluid)
    h2.display-3 Races
    v-layout(row wrap)
      v-flex(v-for="race in items" v-bind:key="race.id" d-flex).xs12.sm6.md4
        v-card(:to="{ name: 'phb-races-id', params: { id: race.id }}" hover).ma-2
          v-card-media(:src="race.card" height="200px")
          v-card-title(primary-title)
            div
              h3.headline.mb-0 {{ race.name }}
              p {{ race.snippet }}
              label
                strong Racial Traits
              p {{ race.increases }}, {{ race.racial_traits }}
    page-footer(:list="listName")
</template>

<script>
  import MeElement from '~/components/shared/MeElement.vue'
  import PageFooter from '~/components/phb/PageFooter.vue'
  import {mapGetters} from 'vuex'

  export default {
    components: { MeElement, PageFooter },
    computed: {
      ...mapGetters(['getData', 'getMutableData'])
    },
    created () {
      let traits = this.getData('racialTraits')

      this.items = this.getMutableData('races').map((race) => {
        race.racial_traits = traits.filter((trait) => {
          return trait[race.id] !== null
        }).map((trait) => trait.name).join(', ')

        return race
      })
    },
    data () {
      return {
        items: [],
        listName: 'races'
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | Races',
        meta: [
          { hid: 'description', name: 'description', content: 'Every race you need for a deeply involved Mass Effect Campaign.' }
        ]
      }
    },
    layout: 'phb'
  }
</script>
