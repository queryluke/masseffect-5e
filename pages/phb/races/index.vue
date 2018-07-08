<template lang="pug">
  v-container(fluid)
    h2.display-3 Races
    p.
      Certain races are limited to the galaxy in which you set your campaign. Our distinctions are based on Bioware's lore.
      Almost every race had an #[a(href="http://masseffect.wikia.com/wiki/Ark#Arks" target="_blank") Ark]
      for transportaion to the Andromeda galaxy. A number of batarians #[a(href="http://masseffect.wikia.com/wiki/Batarian_Scrapper" target="_blank") were recruited]
      as security assests on Ark Paarchero. We've deemed a few races inappropriate for Andromeda settings, but the final
      ruling is at the discretion of your Galaxy Master. Finally, Angara are only found in the Andromeda Galaxy.
    v-layout(row wrap)
      v-flex(v-for="race in items" v-bind:key="race.id" d-flex).xs12.sm6.md4
        v-card(:to="{ name: 'phb-races-id', params: { id: race.id }}" hover).ma-2
          v-card-media(:src="race.card" height="200px")
          v-card-title(primary-title)
            v-layout(row wrap)
              v-flex(xs12 sm6)
                h3.headline.mb-0 {{ race.name }}
              v-flex(xs12 sm6).text-xs-left.text-sm-right
                v-chip(v-if="race.galaxy.includes('Milky Way')" color="primary" outline small) Milky Way
                v-chip(v-if="race.galaxy.includes('Andromeda')" color="secondary" outline small) Andromeda
            p {{ race.snippet }}
            label
              strong Racial Traits
            p {{ race.increases }}, {{ race.racial_traits }}
</template>

<script>
  import MeElement from '~/components/MeElement.vue'
  import {mapGetters} from 'vuex'

  export default {
    components: { MeElement },
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
