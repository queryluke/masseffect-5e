<template lang="jade">
  div
    h2 Races
    v-layout(row wrap)
      v-flex(v-for="race in races" v-bind:key="race.id").xs12.sm6.md4
        v-card(hover @click="goTo()").ma-2
          v-card-media(:src="race.card" height="200px")
          v-card-title(primary-title)
            div
              h3.headline.mb-0 {{ race.name }}
              p {{ race.snippet }}
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
      goTo() {
        this.$router.push('/')
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
      let getFeats = this.$http.get('../data/feats.json').then(response => response.json());
      let getRaces = this.$http.get('../data/races.json').then(response => response.json());
      Promise.all([getFeats, getRaces]).then(response => {
        let feats = response[0].data;
        this.races = response[1].data.map( (v) => {
          for (let line of v.skills){
            if(/{feats}/.test(line.data)){
              let available_starting_feats = feats.filter( (feat) => {
                return feat[v.id] !== null
              }).map( (feat) => feat.name );
              line.data = line.data.replace(/{feats}/,available_starting_feats.join(', '))
            }
          }
          return v;
        });
        this.updated = response[1].updated;
        this.source = response[1].source;
      });
    }
  };
</script>
