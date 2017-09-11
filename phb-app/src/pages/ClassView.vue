<template lang="jade">
  v-container(fluid)
    v-layout(row wrap)
      v-flex.sm12.md9
        h2 {{ item.name }}
        p {{ item.description}}
      v-flex.hidden-sm-and-down.md3
        me-icon(:name="item.name" type="classes")
      v-flex.xs12
        class-tabs.mb-3
          class-attributes(:item="item" slot="attributes_tab_content")
          subclass-info(:items="subclasses" slot="subclasses_tab_content")
          spell-list(:spells="spells" slot="spell_list_tab_content")
      v-flex.xs12
        rule-card
          span(slot="header") Progression Table
          progression-table(
            :headers="progression.headers"
            v-bind:rows="progression.data"
            v-bind:spell_header="progression.spell_header"
            v-on:showDialog="showDialog"
            slot="text")
    v-layout(row grow).my-0.mt-4
      v-flex(v-if="previous.name").primary.pa-0.xs6
        v-list(dark).py-0.primary.dark
          v-list-tile(:to="{ name: 'class', params: { id: previous.id }}" ripple)
            v-icon(dark).mr-5.hidden-xs-only chevron_left
            v-list-tile-content
              v-list-tile-sub-title Previous Class:
              v-list-tile-title(v-text="previous.name")
      v-flex(v-if="next.name" v-bind:class="{ 'offset-xs6': !previous.name }").primary.pa-0.xs6
        v-list(dark).py-0.primary.dark
          v-list-tile(:to="{ name: 'class', params: { id: next.id }}" ripple)
            v-list-tile-content
              v-list-tile-sub-title.text-xs-right Next Class:
              v-list-tile-title.text-xs-right(v-text="next.name")
            v-icon(dark).ml-5.hidden-xs-only chevron_right
      v-dialog(v-model="dialog.show" width="70vw")
        v-card
          v-card-title.headline.primary.white--text {{ dialog.header }}
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
        spells: [],
        next: {},
        previous: {},
        dialog: {
          show: false,
          header: '',
          type: 'standard',
          text: ''
        }
      };
    },
    methods: {
      showDialog(feature_id, subclass_progression) {
        if(subclass_progression){
          let subclasses = this.subclasses.map((sb) => {
            let subclass_features = sb[subclass_progression].map((sf) => {
              return this.features.find((feature) => { return feature.id === sf});
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
      }
    },
    created() {
      let getFeatures = this.$http.get('../data/class_features.json').then(response => response.json());
      let getProgression = this.$http.get(`../data/${this.id}_progression.json`).then(response => response.json());
      let getClasses = this.$http.get('../data/classes.json').then(response => response.json());
      let getSubclasses = this.$http.get('../data/subclasses.json').then(response => response.json());
      let getSpells = this.$http.get('../data/spells.json').then(response => response.json());
      Promise.all([getClasses, getFeatures, getProgression, getSubclasses, getSpells]).then(response => {
        let classes = response[0].data;
        let subclasses = response[3].data;
        let spells = response[4].data;

        this.features = response[1].data;
        this.spells = response[4].data;
        this.progression = response[2];

        let spell_header_count = this.progression.headers.filter((v) => { return v.spell_header }).length;
        let header_count = this.progression.headers.length;
        this.progression.spell_header = spell_header_count ? { blank_length: header_count - spell_header_count, spell_length: spell_header_count } : false;
        console.log(this.progression);

        this.item = classes.find((value) => {
          return value.id === this.id;
        });
        this.subclasses = subclasses.filter( (sb) => {
          return sb.class === this.id;
        });
        this.spells = spells.filter( (spell) => {
          return spell[this.id];
        });

        let index = classes.indexOf(this.item);
        this.previous = classes[index-1] ? classes[index-1] : {};
        this.next = classes[index+1] ? classes[index+1] : {};

      });
    },
  };
</script>
