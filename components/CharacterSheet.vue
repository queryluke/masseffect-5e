<template lang="pug">
  v-form(on-submit="return false;")
    v-container(grid-list-md text-xs-center)
      
      // Character Name and ME5e Logo
      v-layout(row wrap)
        v-flex(xs4 class="character-name")
          v-text-field(v-model="character.name" label="Character Name")
        
        v-flex(xs4)
          v-btn(@click="saveFile()") Save Character Sheet
          input(type="file" ref="file" style="display: none" @change="loadTextFromFile" @load="character = $event")
          v-btn(@click="$refs.file.click()") Load Character Sheet

        v-flex(xs4)
          img(title="Mass Effect 5e Logo" src="/images/me5e_logo_450w.png" alt="Mass Effect 5e logo")

      // Top level character info
      v-layout
        // Mods and class info
        v-flex(xs9)
          v-layout(row)
            v-flex
              v-text-field(v-model="character.level" label="Level")
            
            v-flex
              v-select(v-model="character.race" :items="races" label="Race")
            
            v-flex
              v-select(v-model="character.class" :items="classes" label="Class")

            v-flex
              v-select(v-model="character.subclass" :items="subclasses[character.class]" label="Sub-Class")

            v-flex
              v-select(v-model="character.background" :items="backgrounds" item-text="title" item-value="id" label="Background")
          
          v-layout(row)
            v-flex
              v-text-field(v-model="character.ac" label="AC")
            
            v-flex
              v-text-field(v-model="character.initiative" label="Initiative") 

            v-flex
              v-text-field(v-model="character.movement" label="Movement")
            
            v-flex
              v-text-field(v-model="characterProf" label="Proficiency") 

            v-flex
              v-text-field(v-model="character.xp" label="XP") 
        
        // Character Image
        v-flex(xs3)
          img(:title="character.name"
            :src="character.image"
            alt="Character Image"
            style="height: 200px;")
          v-dialog(v-model="dialog" width="500")
            template(v-slot:activator="{ on }")
              v-btn(color="red lighten-2" dark v-on="on") Change Image
            
            v-card
              v-card-title
                div Change Image URL
              v-card-text
                v-text-field(v-model="character.image")
      // Skills and Stats
      v-layout(row text-xs-left)
        // Skills
        v-flex(xs4 text-xs-center)
          h2 Skills
          //v-card-title
          v-text-field(v-model="skills_table.search" append-icon="mdi-magnify" label="Search" single-line hide-details)
          v-data-table(:headers="skills_table.headers" :items="character.skills" :search="skills_table.search" :hide-actions="true")
            template(v-slot:items="props")
              td(style="width: 10%;")
                div {{(calcSkillMod(props.item.stat, props.item.prof) >= 0 ? '+' : '') + calcSkillMod(props.item.stat, props.item.prof)}}
              td(style="width: 70%;") {{props.item.label}}
              td(style="width: 10%;")
                v-select(v-model="props.item.prof" :items="[0,.5,1,2]")
              td(style="width: 10%;") 
                v-checkbox(v-model="props.item.advantage")
        
        // Padding
        v-flex(xs1)

        // Stats
        v-flex(xs7 text-xs-center)
          h2 Stats

          div(class="stats-table-area")
            div(class="v-table__overflow")
              table(class="v-datatable v-table theme--light")
                thead
                  tr
                    th(role="columnheader" class="column text-xs-start")
                    th(role="columnheader" class="column text-xs-left" v-for="stat in stat_names")
                      span(style="text-transform: uppercase;") {{stat}}
                  tr(class="v-datatable__progress")
                    th(colspan="7" class="column")
                tbody
                  tr
                    td Ability Modifiers
                    td(v-for="stat in stat_names" class="stat-num")
                      div {{(calcAbilityMod(character.stats[stat]) >= 0 ? '+' : '') + calcAbilityMod(character.stats[stat])}}
                  
                  tr
                    td Saving Throws
                    td(v-for="stat in stat_names" class="stat-num")
                      div {{(calcAbilitySavingThrow(character.stats[stat], character.proficiencies.stats[stat]) >= 0 ? '+' : '') + calcAbilitySavingThrow(character.stats[stat], character.proficiencies.stats[stat])}}

                  tr
                    td Proficiency
                    td(v-for="stat in stat_names")
                      v-checkbox(v-model="character.proficiencies.stats[stat]")
                  
                  tr(class="raw-value-area")
                    td(style="font-weight: bold;") Raw Values
                    td(v-for="stat in stat_names")
                      v-text-field(v-model="character.stats[stat]" class="raw-value-field")

</template>

<style lang="scss">

  .character-name input {
    font-size: 30px;
  }

  .raw-value-area {
    input {
      text-align: center;
    }
    .raw-value-field {
      font-size: 12px !important;
      padding: 8px
    }
  }

  .stats-table-area {
    .v-input__control {
      margin: auto;
    }
    .v-input__slot {
        margin-top: 12px;
        margin-bottom: 0px;
    }
    table {
      thead th {
        font-size: 20px !important;
        text-align: center !important;
      }
      td.stat-num {
        font-size: 18px !important;
        text-align: center;
      }
    }
  }
</style>

<script>
import documents from '../static/data/search/documents.json';
export default {
  data: () => ({
    dialog: false,
    documents: documents || "not found",
    stat_names: ['str','dex','con','int','wis','cha'],
    skill_names: ['acrobatics','athletics','deception','electronics','engineering','history','insight','intimidation',
    'investigation','medicine','perception','performance','persuasion','science','slight_of_hand','stealth','survival','vehicle_handling'],
    races: ["Angara","Batarian","Drell","Elcor","Geth","Hanar","Human",
    "Krogan","Prothean","Quarian","Salarian","Turian","Volus","Vorcha"],
    classes: ["Adept","Engineer","Infiltrator","Sentinel","Soldier","Vanguard"],
    subclasses: {
      "Adept": ["Commando", "Blackstar", "Distruptor"],
      "Engineer": ["Mastermind","Drone Jockey", "Medic"],
      "Infiltrator": ["Shadow","Sniper","Saboteur"],
      "Sentinel": ["Bastion", "Juggernaut", "Guardian"],
      "Soldier": ["Havoc","Weapon Master","Gladiator"],
      "Vanguard": ["Battle Master", "Shock Trooper", "Nemesis"]
    },
    // This is just placeholder. There should be an option to save/load this from JSON
    character: {
      name: "Garrus Vakarian",
      image: "https://vignette.wikia.nocookie.net/masseffect/images/3/36/Garrus_Character_Shot.png/revision/latest/scale-to-width-down/350?cb=20100323054855",
      level: 2,
      race: "Turian",
      class: "Infiltrator",
      subclass: "Sniper",
      background: "",
      stats: {
        str: 16, dex: 14, con: 13, int: 10, wis: 14, cha: 8
      },
      skills: [
          {label: "Acrobatics", prof: 1, advantage: false, stat: "dex"},
          {label: "Athletics", prof: 0, advantage: false, stat: "str"},
          {label: "Deception", prof: 0, advantage: false, stat: "cha"},
          {label: "Electronics", prof: 0, advantage: false, stat: "int"},
          {label: "Engineering", prof: 0, advantage: false, stat: "int"},
          {label: "History", prof: 0, advantage: false, stat: "int"},
          {label: "Insight", prof: 0, advantage: false, stat: "wis"},
          {label: "Intimidation", prof: 0, advantage: false, stat: "cha"},
          {label: "Investigation", prof: 0, advantage: false, stat: "int"},
          {label: "Medicine", prof: 0, advantage: false, stat: "wis"},
          {label: "Perception", prof: 0, advantage: false, stat: "wis"},
          {label: "Performance", prof: 0, advantage: false, stat: "cha"},
          {label: "Persuasion", prof: 0, advantage: false, stat: "cha"},
          {label: "Science", prof: 0, advantage: false, stat: "int"},
          {label: "Slight of Hand", prof: 0, advantage: false, stat: "dex"},
          {label: "Stealth", prof: 0, advantage: false, stat: "dex"},
          {label: "Survival", prof: 0, advantage: false, stat: "wis"},
          {label: "Vehicle Handling", prof: 0, advantage: false, stat: "dex"}
        ],
      proficiencies: {
        stats: {
          str: true, dex: false, con: true, int: false, wis: false, cha: false
        },
        armor: {
          light: false,
          medium: true,
          heavy: false
        },
        weapons: {
          pistol: false,
          smg: false,
          assault_rifle: false,
          shotgun: false,
          sniper_rifle: true,
          melee: false,
          heavy_weapons: false
        },
        other: []
      }
    },
    skills_table: {
      search: '',
      headers: [
        {text: 'Roll',align: 'start',value: 'roll'},
        {text: 'Skill',value: 'label'},
        {text: 'Prof',value: 'prof'},
        {text: 'Adv',value: 'advantage'}
      ]
    }
  }),

  computed: {
    characterProf: function() {
      return this.calcProfBonus(this.character.level);
    },
    character_docs: function() {
      return this.getDocuments('character');
    },
    backgrounds: function() {
      return this.getDocuments('character','backgrounds');
    }
  },

  watch: {
    character: {
      immediate: true,
      deep: true,
      handler: function() {
        console.log("[bdc4] - Character data changed; Watch triggered!");
      }
    }
  },

  methods: {
    getDocuments: function(type, subType) {
      var docs = this.documents.filter(function(doc) {
        return doc.type == type;
      });
      if (subType) {
        docs = docs.filter(function(doc) {
          return doc.subType == subType;
        });
      }
      return docs;
    },
    calcAbilityMod: function(ability_score) {
      return Math.floor((ability_score - 10) / 2)
    },
    calcAbilitySavingThrow: function(ability_score, isProf) {
      var num = this.calcAbilityMod(ability_score);
      if (isProf) {
       num += this.calcProfBonus(this.character.level)
      }
      //if (ability_score == 16) console.log("Calculating Saving Throw", num);
      return num;

    },
    calcProfBonus: function(level) {
      return Math.ceil(level/4) + 1;
    },
    calcSkillMod: function(ability_str, prof_score) {
      var baseMod = this.calcAbilityMod(this.character.stats[ability_str]);
      if (prof_score > 0) {
        baseMod += Math.floor(prof_score * this.calcProfBonus(this.character.level));
      }
      return baseMod;
    },
    saveFile: function() {
        const data = JSON.stringify(this.character);
        const blob = new Blob([data], {type: 'text/plain'})
        const e = document.createEvent('MouseEvents');
        const a = document.createElement('a');
        const filename = this.character.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()

        a.download = filename + ".json";
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
        e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
    },
    loadTextFromFile(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();
      
      console.log(file);
      if (!file) return;
      reader.readAsText(file);
      
      reader.onload = e => {
        console.log(e.target.result);
        const dataDump = e.target.result;
        if (dataDump && dataDump != '') {
          this.character = JSON.parse(e.target.result);
        }
        this.$emit("load", e.target.result);
      }
      
    }
  }

  
};
</script>