<template lang="pug">
  div
    h2.display-3 Grunt Generator
    p.
      Grunts are disposable NPCs based on the Mass Effect archetypes. The #[em Monster Manual] outlines adjusting
      the provided NPC Archetypes with various races, weapons, and abilities. But this can be rather time consuming.
    p.
      This generator enables you to quickly create random grunts with a given Challenge Rating (CR). CRs only go up to 12
      because higher CRs are represent much more powerful monsters. As a point of reference, a Banshee has a CR of 10, so
      a grunt with a CR of 12 would represent a very experienced and deadly NPC.
    v-card.mt-3
      v-card-text
        v-layout(row wrap)
          v-flex(xs12).display-1
            p Options
          v-flex(xs12 sm6 md4).px-2
            v-select(
              v-bind:items="cr_options"
              v-model="cr"
              label="Select a Challenge Rating"
              single-line
              bottom
              hint="Challenge Rating"
              persistent-hint
            )
          v-flex(xs12 sm6 md4).px-2
            v-select(
              v-bind:items="classOptions"
              v-model="selected_class"
              label="Select a Class"
              single-line
              bottom
              hint="Class"
              persistent-hint
            )
          v-flex(xs12 sm6 md4).px-2
            v-select(
              v-bind:items="race_options"
              v-model="race"
              label="Select a Race"
              single-line
              bottom
              hint="Race"
              persistent-hint
            )
          v-flex(xs8 offset-xs2).mt-3
            v-btn(@click="getGrunt()" block color="primary") Generate
    v-container
      v-layout
        v-flex(xs12 sm10 offset-sm1 lg8 offset-lg2)
          stat-block(:stats="grunt")
</template>

<script>
  import {GruntGenerator} from '../mixins/grunt_generator';
  import StatBlock from '../components/StatBlock.vue';

  export default {
    components: {StatBlock},
    name: 'Grunts',
    data() {
      return {
        statsByCr: [],
        races: [],
        classes: [],
        skills: [],
        cr: "1/8",
        race: "random",
        selected_class: "random",
        race_options: [],
        class_options: [],
        cr_options: [],
        grunt: {}
      };
    },
    mixins: [GruntGenerator],
    created() {
      let getRaces = this.$http.get('../data/races.json').then(response => response.json());
      let getClasses = this.$http.get('../data/classes.json').then(response => response.json());
      let getSkills = this.$http.get('../data/skills.json').then(response => response.json());
      let getStatsByCr = this.$http.get('../data/stats_by_cr.json').then(response => response.json());
      Promise.all([getRaces, getClasses, getSkills, getStatsByCr]).then(response => {
        let races = response[0].data;
        let classes = response[1].data;
        this.skills = response[2].data;
        this.statsByCr = response[3];

        // Setup races
        this.races = races.map((race) => {
          // expand available classes
          race.available_classes = race.available_classes.split(',').map((v) => v.trim());
          return race;
        });

        // Setup classes
        this.classes = classes;
        this.cr_options = this.statsByCr.map( (cr) => {
          return cr.cr;
        });
        this.race_options = this.races.map( (race) => {
          return { value: race.id, text: race.name };
        }).sort();
        this.race_options.unshift({ value: 'random', text: 'Random' });

        this.getGrunt();
      });
    },
    computed: {
      classOptions: function() {
        let class_options = [];
        if(this.race === 'random'){
          class_options = this.classes;
        } else {
          class_options = this.filterClasses(this.race);
        }
        class_options = class_options.map( (a_class) => {
          return { value: a_class.id, text: a_class.name };
        }).sort();
        class_options.unshift({ value: 'random', text: 'Random' });
        class_options.push({ value: 'none', text: 'None' });
        if(!class_options.map( (co) => { return co.value }).includes(this.selected_class)){
          this.selected_class = 'random';
        }
        return class_options;
      },
    },
    methods: {
      filterClasses(race_id){
        return this.classes.filter(a_class => {
          return this.races.find((race) => { return race.id === race_id }).available_classes.includes(a_class.name);
        });
      },
      getGrunt(){
        const config = this.generateConfig();
        this.grunt = this.generateGrunt(config);
      },
      generateConfig(){
        const config = {};

        // Get the race
        if(this.race === 'random') {
          config.race = this.randomValue(this.races);
        } else {
          config.race = this.races.find((race) => {
            return  race.id === this.race;
          });
        }

        // Get the class
        switch(this.selected_class){
          case 'random':
            const classes = this.filterClasses(config.race.id);
            config.sc = this.randomValue(classes);
            break;
          case 'none':
            config.sc = { id: 'none' };
            break;
          default:
            config.sc = this.classes.find((a_class) => {
              return a_class.id === this.selected_class;
            });
        }
        // Get the cr
        config.cr = this.statsByCr.find((cr) => {
          return cr.cr === this.cr;
        });

        config.effective = {
          ac: 0,
          hp: 0,
          atk: 0,
          dc: 0,
          dmg: 0,
          resistances: false,
        };
        config.quarianCybEn = false;

        return config;
      }
    }
  };
</script>
