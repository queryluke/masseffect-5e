<template lang="pug">
  v-container(fluid)
    v-layout(row wrap)
      v-flex.xs12.md9
        h2.display-3 {{ race.name }}
        p {{ race.snippet}}
        p
          a(:href="`http://masseffect.wikia.com/wiki/${ race.id == 'unshackled_ai' ? 'Artificial_Intelligence' : race.name }`" target="_blank").
            Read more about {{ race.name }} biology, history, and culture
        v-card
          v-card-title(primary-title)
            div.headline Available Classes
            v-layout(row wrap justify-space-around).mt-3
              v-flex(v-for="me_class in race.available_classes" v-bind:key="me_class").xs4.sm2.lg1.text-xs-center
                me-icon(:name="me_class.toLowerCase()" type="classes")
                p {{ me_class }}
        v-card.mt-2
          v-card-title(primary-title)
            div.headline Racial Traits
            v-container(fluid)
              div.hr
              v-layout(row wrap justify-space-around).ma-2
                v-flex.xs6.sm3.text-xs-center
                  strong Speed
                  br
                  span {{ race.speed }}
                v-flex.xs6.sm3.text-xs-center
                  strong Size
                  br
                  span {{ race.size }}
                v-flex.xs6.sm3.text-xs-center
                  strong Sexy Level
                  br
                  span {{ race.sexy_level }}
                v-flex.xs6.sm3.text-xs-center
                  strong Armor Proficiency
                  br
                  span {{ race.armor }}
              div.hr
              div.ma-2
                div(id="race-alignment").section-label Alignment
                p(aria-labelledby="race-alignment") {{ race.alignment }}
              div.ma-2
                div(id="race-traits").section-label Racial Traits
                div(id="race-increases")
                    label #[strong Ability Mods]
                    p {{race.increases}}
                div(v-for="trait in race.racial_traits" v-bind:key="trait.id")
                  label(:id="trait.id") #[strong {{ trait.name }}]
                  me-element(:text="trait.description" v-bind:aria-labelledby="`race-traits ${trait.id}`")
              div.ma-2
                div(id="starting-equipment").section-label Starting Equipment
                me-element(:text="race.starting_equipment" aria-labelledby="starting-equipment")
      v-flex.hidden-sm-and-down.md3
        v-card-media(:src="race.body" height="80vh")
    v-layout(row grow).my-0.mt-4
      v-flex(v-if="previous_race.name").primary.pa-0.xs6
        v-list(dark).py-0.primary.dark
          v-list-tile(:to="{ name: 'race', params: { id: previous_race.id }}" ripple)
            v-icon(dark).mr-5.hidden-xs-only chevron_left
            v-list-tile-content
              v-list-tile-sub-title Previous Class:
              v-list-tile-title(v-text="previous_race.name")
      v-flex(v-if="next_race.name" v-bind:class="{ 'offset-xs6': !previous_race.name }").primary.pa-0.xs6
        v-list(dark).py-0.primary.dark
          v-list-tile(:to="{ name: 'race', params: { id: next_race.id }}" ripple)
            v-list-tile-content
              v-list-tile-sub-title.text-xs-right Next Class:
              v-list-tile-title.text-xs-right(v-text="next_race.name")
            v-icon(dark).ml-5.hidden-xs-only chevron_right
</template>

<script>
  import MeIcon from '../components/MeIcon.vue';
  import MeElement from "../components/MeElement.vue";
  import {mapGetters} from 'vuex';

  export default {
    computed: {
      ...mapGetters(['getData', 'getMutableData'])
    },
    name: 'Race',
    props: ['id'],
    components: { MeElement, MeIcon },
    data() {
      return {
        race: {},
        next_race: {},
        previous_race: {},
      };
    },
    created() {
      let feats = this.getData('feats');
      let races = this.getMutableData('races');
      let traits = this.getData('racialTraits');
      let race = races.find((value) => {
        return value.id == this.id;
      });

      let index = races.indexOf(race);
      this.previous_race = races[index-1] ? races[index-1] : {};
      this.next_race = races[index+1] ? races[index+1] : {};

      race.available_classes = race.available_classes.split(',').map((v) => v.trim());

      race.racial_traits = traits.filter( (trait) => {
        return trait[race.id] !== null
      }).map( (trait) => {
        for (let line of trait.description){
          if(/{feats}/.test(line.data)){
            let available_starting_feats = feats.filter( (feat) => {
              return feat[race.id] !== null
            }).map( (feat) => feat.name );
            line.data = line.data.replace(/{feats}/,available_starting_feats.join(', '))
          }
        }
        return trait;
      });


      this.race = race;
    },
  };
</script>

<style>
  .section-label {
    font-size: 1.2em;
    font-weight: 700;
    margin-top: 1.1em;
  }
</style>
