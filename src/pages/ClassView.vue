<template lang="pug">
  v-container(fluid)
    v-layout(row wrap)
      v-flex.sm12.md9
        h2.display-3 {{ item.name }}
        p {{ item.description}}
      v-flex.hidden-sm-and-down.md3
        me-icon(:name="item.id" type="classes")
      v-flex.xs12
        class-tabs(:colors="colors").mb-3
          class-attributes(:item="item" slot="attributes_tab_content")
          subclass-info(:items="subclasses" slot="subclasses_tab_content")
          spell-list(:spells="spells" slot="spell_list_tab_content")
      v-flex.xs12
        v-card.mb-3
          v-card-title(:class="colors.primary").headline.white--text Progression Table
          v-card-text
            progression-table(
              :headers="headers"
              v-bind:colors="colors"
              v-bind:rows="progression"
              v-bind:spell_header="spellHeaders"
              v-on:showDialog="showDialog")
    v-layout(row grow).my-0.mt-4
      v-flex(v-if="previous.name").primary.pa-0.xs6
        v-list(:class="previous.colors.primary" dark).py-0
          v-list-tile(:to="{ name: 'class', params: { id: previous.id }}" ripple)
            v-icon(dark).mr-5.hidden-xs-only chevron_left
            v-list-tile-content
              v-list-tile-sub-title Previous Class:
              v-list-tile-title(v-text="previous.name")
      v-flex(v-if="next.name" v-bind:class="{ 'offset-xs6': !previous.name }").primary.pa-0.xs6
        v-list(:class="next.colors.primary" dark).py-0
          v-list-tile(:to="{ name: 'class', params: { id: next.id }}" ripple)
            v-list-tile-content
              v-list-tile-sub-title.text-xs-right Next Class:
              v-list-tile-title.text-xs-right(v-text="next.name")
            v-icon(dark).ml-5.hidden-xs-only chevron_right
      v-dialog(v-model="dialog.show" width="70vw")
        v-card
          v-card-title(:class="colors.primary").headline.white--text {{ dialog.header }}
          v-card-text
            div(v-if="dialog.type === 'subclass'")
              div(v-for="(subclass, index) in dialog.text" v-bind:key="subclass.id")
                p.headline {{ subclass.name }}
                div(v-for="feature in subclass.features" v-bind:key="feature.id")
                  p #[strong {{ feature.name }}]
                  me-element(v-bind:text="feature.mechanic")
                div(v-if="dialog.text.length > index + 1").hr
            me-element(v-bind:text="dialog.text" v-else)
            v-card-actions
              v-spacer
              v-btn(@click.native="dialog.show = false" flat="flat") Close
</template>

<script>
  import MeIcon from '../components/MeIcon.vue';
  import MeElement from "../components/MeElement.vue";
  import RuleCard from "../components/RuleCard.vue";
  import ProgressionTable from "../components/ProgressionTable.vue";
  import ClassAttributes from "../components/ClassAttributes.vue";
  import ClassTabs from "../components/ClassTabs.vue";
  import SpellList from "../components/SpellList.vue";
  import SubclassInfo from "../components/SubclassInfo.vue";
  import {mapGetters} from 'vuex';

  export default {
    name: 'ClassView',
    props: ['id'],
    components: { SubclassInfo, SpellList, ClassTabs, ClassAttributes, ProgressionTable, RuleCard, MeElement, MeIcon },
    data() {
      return {
        item: {},
        subclasses: [],
        features: [],
        progression: {},
        spellHeaders: {},
        headers: {},
        spells: [],
        next: {},
        previous: {},
        dialog: {
          show: false,
          header: '',
          type: 'standard',
          text: ''
        },
        colors: {
          primary: 'primary',
          accent: 'red darken-4',
          link: 'red darken-4',
        }
      };
    },
    methods: {
      showDialog(feature_id, subclass_progression) {
        if(subclass_progression){
          let subclasses = this.subclasses.map((sb) => {
            let subclass_features = sb[subclass_progression].map((sf) => {
              let feature = this.features.find((feature) => { return feature.id === sf.key});
              feature.name = sf.value;
              return feature;
            });
            return {
              name: sb.name,
              features: subclass_features
            }
          });
          this.dialog = {
            show: true,
            header: 'Subclass Feature',
            type: 'subclass',
            text: subclasses
          }
        } else {
          let feature = this.features.find((feature) => {
            return feature.id === feature_id;
          });
          this.dialog = {
            show: true,
            header: feature.name,
            type: 'standard',
            text: feature.mechanic
          }
        }
      },
      getColors(class_id) {
        let colors = {};
        switch(class_id){
          case 'adept':
            colors = {
              primary: 'deep-purple darken-1',
              accent: 'purple accent-1',
              link: 'purple--text',
            };
            break;
          case 'engineer':
            colors = {
              primary: 'amber darken-2',
              accent: 'blue-grey darken-1',
              link: 'amber--text text--darken-4',
            };
            break;
          case 'infiltrator':
            colors = {
              primary: 'deep-orange darken-1',
              accent: 'grey darken-4',
              link: 'deep-orange--text text--darken-4',
            };
            break;
          case 'sentinel':
            colors = {
              primary: 'green darken-2',
              accent: 'green accent-3',
              link: 'teal--text text--darken-4',
            };
            break;
          case 'soldier':
            colors = {
              primary: 'primary',
              accent: 'grey lighten-1',
              link: '',
            };
            break;
          case 'vanguard':
            colors = {
              primary: 'indigo darken-4',
              accent: 'light-blue accent-2',
              link: 'indigo--text darken-4',
            };
            break;
        }
        return colors;
      }
    },
    computed: {
      ...mapGetters(['getData', 'getProgressionHeaders'])
    },
    created() {
      let classes = this.getData('classes');
      let subclasses = this.getData('subclasses');
      this.spells = this.getData('spells').filter(spell => spell[this.id]);

      this.features = this.getData('classFeatures');
      this.progression = this.getData(`${this.id}Progression`);
      this.headers = this.getProgressionHeaders(this.id);

      let spell_header_count = this.headers.filter((v) => { return v.spell_header }).length;
      let header_count = this.headers.length;
      this.spellHeaders = spell_header_count ? { blank_length: header_count - spell_header_count, spell_length: spell_header_count } : false;

      this.item = classes.find((value) => {
        return value.id === this.id;
      });
      this.subclasses = subclasses.filter( (sb) => {
        return sb.class.toLowerCase() === this.id;
      });

      this.colors = this.getColors(this.id);

      let index = classes.indexOf(this.item);
      this.previous = classes[index-1] ? classes[index-1] : {};
      this.previous.colors = this.getColors(this.previous.id);
      this.next = classes[index+1] ? classes[index+1] : {};
      this.next.colors = this.getColors(this.next.id);
    },
  };
</script>
