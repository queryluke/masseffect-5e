<template lang="pug">
  div
    h2 Races
    v-layout(row wrap)
      v-flex(v-for="race in races" v-bind:key="race.id").xs12.sm6.md4
        v-card(hover @click="toRace(race.id)").ma-2
          v-card-media(:src="race.card" height="200px")
          v-card-title(primary-title)
            div
              h3.headline.mb-0 {{ race.name }}
              p {{ race.snippet }}
              label
                strong Racial Traits
              p {{ race.increases }}, {{ race.racial_traits }}
    v-layout(row wrap justify-space-between).mt-4
      span Last Updated: {{ updated }}
      a(:href="source" target="_blank") Source
</template>

<script>
  import MeElement from '../components/MeElement.vue';

  export default {
    name: 'Races',
    components: {
      MeElement
    },
    methods: {
      toRace(id) {
        this.$router.push(`/races/${id}`);
      }
    },
    data() {
      return {
        races: [],
        source: '',
        updated: '',
      };
    },
    created() {
      let getTraits = this.$http.get('../data/racial_traits.json').then(response => response.json());
      let getRaces = this.$http.get('../data/races.json').then(response => response.json());
      Promise.all([getTraits, getRaces]).then(response => {
        let traits = response[0].data;

        this.races = response[1].data.map( (race) => {
          race.racial_traits = traits.filter( (trait) => {
            return trait[race.id] !== null
          }).map( (trait) => trait.name ).join(', ');

          return race
        });
        this.updated = response[1].updated;
        this.source = response[1].source;
      });
    }
  };
</script>
