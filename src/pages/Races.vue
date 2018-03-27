<template lang="pug">
  div
    h2.display-3 Races
    v-layout(row wrap)
      v-flex(v-for="race in items" v-bind:key="race.id").xs12.sm6.md4
        v-card(hover).ma-2
          div(@click="toRace(race.id)")
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
  import MeElement from '../components/MeElement.vue';
  import PageFooter from '../components/PageFooter.vue';
  import {mapGetters} from 'vuex';

  export default {
    computed: {
      ...mapGetters(['getData', 'getMutableData'])
    },
    name: 'Races',
    components: {
      MeElement,
      PageFooter
    },
    methods: {
      toRace(id) {
        this.$router.push(`/races/${id}`);
      }
    },
    data() {
      return {
        items: [],
        listName: 'races'
      };
    },
    created() {
      let traits = this.getData('racialTraits');

      this.items = this.getMutableData('races').map( (race) => {
        race.racial_traits = traits.filter( (trait) => {
          return trait[race.id] !== null
        }).map( (trait) => trait.name ).join(', ');

        return race
      });
    }
  };
</script>
