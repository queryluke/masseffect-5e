<template lang="pug">
  v-form(on-submit="return false;")
    v-container(grid-list-md text-xs-center)
      
      // Character Name and ME5e Logo
      v-layout(row wrap)
        v-flex(xs4 class="character-name")
          v-text-field(v-model="character.name" label="Character Name")
        
        v-flex(xs4)
          save-load(:character="character" @load="character = $event")

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
              v-select(v-model="character.class" :items="$options.class_data" item-text="name" label="Class" return-object)

            v-flex
              v-select(v-model="character.subclass" :items="character.class.subclasses" item-text="name" label="Sub-Class" return-object)

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
          v-dialog(v-model="image_picker" width="500")
            template(v-slot:activator="{ on }")
              v-btn(color="red lighten-2" dark v-on="on") Change Image
            
            v-card
              v-card-title
                div Change Image URL
              v-card-text
                v-text-field(v-model="character.image")
      
      // Tab Area
      v-layout(style="width: 100%;")
        v-tabs(:grow="true" style="width: 100%;")
          v-tab(key="stats") Skills and Stats
          v-tab(key="weapons") Weapons and Armor
          v-tab(key="race") Character Info
          v-tab(key="powers") Powers
          v-tab(key="equipment") Equipment and Wealth
          v-tab(key="other") Roleplaying / Other
            
          v-tab-item(key="stats")
            // Skills and Stats
            v-layout(row class="item-area")
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
                        tr(class="raw-value-area")
                          td(style="font-weight: bold;") Ability Scores
                          td(v-for="stat in stat_names")
                            v-text-field(v-model="character.stats[stat]" class="raw-value-field")

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
                        
                        


          
          v-tab-item(key="weapons" style="text-align: left;")
            div(class="item-area")
              h2 Weapons
              weapon-list(:items="character.weapons")
              v-btn(color="red lighten-2" dark @click="pickWeapon = true") Add Weapon
              v-btn(v-if="character.weapons.length" color="red lighten-2" dark @click="removeWeapon = true") Remove Weapon
              // Adding Weapon
              v-dialog(v-model="pickWeapon" width="80%")
                v-card
                  weapon-picker(:character="character" v-on:close-dialog="pickWeapon = false")
              // Removing Weapon
              v-dialog(v-model="removeWeapon" width="600px")
                v-card
                  div(v-for="(wep, ind) in character.weapons") 
                    v-btn(@click="character.weapons.splice(ind, 1)") X
                    span {{wep.name}}

            div(class="item-area")
              h2 Armor
          v-tab-item(key="race")
          v-tab-item(key="powers")
            div(class="item-area")
              //h2 Powers
              v-layout(row)
                v-flex(md4)
                  h2 Combat
                  table(class="power-header-table")
                    tbody
                      tr
                        td STR DC
                        td(style="text-align: center;") {{calcSpellDC(character.stats.str)}} 
                      tr
                        td DEX DC
                        td(style="text-align: center;") {{calcSpellDC(character.stats.dex)}}
                      tr
                        td Spell Attack
                        td(style="text-align: center;") {{((calcProfBonus(character.level)+calcAbilityMod(character.stats.int)) >= 0 ? '+' : '-')}}{{calcProfBonus(character.level)+calcAbilityMod(character.stats.int)}}
                v-flex(md4)
                  h2 Tech
                  table(class="power-header-table")
                    tbody
                      tr
                        td Spell DC
                        td {{calcSpellDC(character.stats.int)}}
                  h3(style="padding-top: 12px;") Tech Points
                  div(class="tech-button-area")
                    v-btn(@click="character.tech.tech_points = 0") Min
                    v-btn(@click="character.tech.tech_points--" :disabled="character.tech.tech_points <= 0") -
                    h2(class="points-text") {{character.tech.tech_points}} / {{tech_point_max}}
                    v-btn(@click="character.tech.tech_points++" :disabled="character.tech.tech_points >= tech_point_max") +
                    v-btn(@click="character.tech.tech_points = tech_point_max") Max
                  //v-layout(row)
                    v-flex(xs3 style="align-self: center;")
                      v-subheader Current:
                    v-flex(xs9)
                      v-select(v-model="character.tech.tech_points")
                  
                    v-flex(xs3 style="align-self: center;")
                      v-subheader Max:
                    v-flex(xs9)
                      v-text-field(readonly value="2") 
                v-flex(md4)
                  h2 Biotics

          v-tab-item(key="equipment")
          v-tab-item(key="other")
</template>

<style lang="scss">

  .character-name input {
    font-size: 30px;
  }

  .item-area {
    padding-top: 20px;
  }
  .tech-button-area {
    .v-btn {
      min-width: 0px;
    }
    .points-text {
      display: inline;
      margin: 15px;
    }
  }
  .power-header-table {
    tr {
      text-align: center;
    }
    td {
      border: 1px solid black;
      min-width: 180px;
      min-height: 120px;
      font-size: 18px;
    }
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

import documents from '~/static/data/search/documents.json'
import weapons from '~/static/data/weapons.json'
import armor from '~/static/data/armor_sets.json'

import SaveLoad from '~/components/character_builder/CharacterSaveLoad.vue'
import WeaponPicker from '~/pages/weapon-picker.vue'
import CharacterWeaponList from '~/components/character_builder/CharacterWeaponList.vue'
import WeaponList from '~/components/weapon/WeaponList.vue'

import AdeptData from "~/static/data/classes/adept.json"; 
import EngineerData from "~/static/data/classes/engineer.json"; 
import InfiltratorData from "~/static/data/classes/infiltrator.json"; 
import SentinelData from "~/static/data/classes/sentinel.json"; 
import SoldierData from "~/static/data/classes/soldier.json";
import VanguardData from "~/static/data/classes/vanguard.json";

export default {
  components: {SaveLoad, CharacterWeaponList, WeaponList, WeaponPicker},
  class_data: [AdeptData,EngineerData,InfiltratorData,SentinelData,SoldierData,VanguardData],
  data: () => ({
    image_picker: false,
    pickWeapon: false,
    removeWeapon: false,
    classData: [AdeptData,EngineerData,InfiltratorData,SentinelData,SoldierData,VanguardData],
    tab: false,
    armor: armor || "not found",
    weapons: weapons || "not found",
    documents: documents || "not found",
    stat_names: ['str','dex','con','int','wis','cha'],
    skill_names: ['acrobatics','athletics','deception','electronics','engineering','history','insight','intimidation',
    'investigation','medicine','perception','performance','persuasion','science','slight_of_hand','stealth','survival','vehicle_handling'],
    races: ["Angara","Asari","Batarian","Drell","Elcor","Geth","Hanar","Human",
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
    character: false, // Need this for reactive binding
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
    },
    tech_point_max: function() {
      var tpm = 0;
      try {
        tpm = this.character.class.progression[this.character.level - 1].techPoints || 0;
      } finally {
        return tpm;
      }
    }
  },

  watch: {
    character: {
      immediate: true,
      deep: true,
      handler: function() {
        this.pickWeapon = false;
        this.removeWeapon = false;
        if (this.character) {
          this.$store.commit('characterBuilder/save', this.character);
        }
      }
    }
  },

  created() {
    this.character = this.$store.state.characterBuilder.character;
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
    calcSpellDC: function(ability_score) {
      return 8+this.calcProfBonus(this.character.level)+this.calcAbilityMod(ability_score);
    }
  }

  
};
</script>