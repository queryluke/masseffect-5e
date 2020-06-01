<template lang="pug">
  v-form(on-submit="return false;")
    v-container(grid-list-md text-xs-center)
      
      // Character Name and ME5e Logo
      v-layout(row wrap)
        v-flex(xs8)
          v-text-field(v-model="character.name" label="Character Name")

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
              v-select(v-model="character.subclass" :items="['Colonist','Doctor']" label="Background")
          
          v-layout(row)
            v-flex
              v-text-field(v-model="character.ac" label="AC")
            
            v-flex
              v-text-field(v-model="character.initiative" label="Initiative") 

            v-flex
              v-text-field(v-model="character.movement" label="Movement")
            
            v-flex
              v-text-field(v-model="character.proficiency" label="Proficiency") 

            v-flex
              v-text-field(v-model="character.xp" label="XP") 
        
        // Character Image
        v-flex(xs3)
          img(:title="character.name"
            src="https://vignette.wikia.nocookie.net/masseffect/images/3/36/Garrus_Character_Shot.png/revision/latest/scale-to-width-down/350?cb=20100323054855"
            alt="Character Image"
            style="height: 200px;")

      // Skills and Stats
      v-layout(row text-xs-left)
        // Skills
        v-flex(xs4 text-xs-center)
          h2 Skills
          v-card-title
            v-text-field(v-model="skills_table.search" append-icon="mdi-magnify" label="Search" single-line hide-details)
          v-data-table(:headers="skills_table.headers" :items="skills_table.items" :search="skills_table.search" :hide-actions="true")
            template(v-slot:items="props")
              td {{props.item.roll >= 0 ? '+' : '-'}} {{Math.abs(props.item.roll)}}
              td {{props.item.skill}}
              td
                v-select(v-model="props.item.prof" :items="[0,.5,1,2]")
              td 
                v-checkbox(v-model="props.item.adv")
        // Stats
        v-flex(xs8 text-xs-center)
          h2 Stats

          div(class="stats-table-area")
            div(class="v-table__overflow")
              table(class="v-datatable v-table theme--light")
                thead
                  tr
                    th(role="columnheader" class="column text-xs-start")
                    th(role="columnheader" class="column text-xs-left" v-for="stat in ['str','dex','con','int','wis','cha']")
                      span(style="text-transform: uppercase;") {{stat}}
                  tr(class="v-datatable__progress")
                    th(colspan="7" class="column")
                tbody
                  tr
                    td Ability Modifiers
                    td(v-for="stat in ['str','dex','con','int','wis','cha']")
                      div {{(calcAbilityMod(character.stats[stat]) >= 0 ? '+' : '') + calcAbilityMod(character.stats[stat])}}
                  
                  tr
                    td Saving Throws
                    td(v-for="stat in ['str','dex','con','int','wis','cha']")
                      div {{(calcAbilitySavingThrow(character.stats[stat], character.proficiencies.stats[stat]) >= 0 ? '+' : '') + calcAbilitySavingThrow(character.stats[stat], character.proficiencies.stats[stat])}}

                  tr
                    td Proficiency
                    td(v-for="stat in ['str','dex','con','int','wis','cha']")
                      v-checkbox(v-model="character.proficiencies.stats[stat]")
                  
                  tr(class="raw-value-area")
                    td(style="font-weight: bold;") Raw Values
                    td(v-for="stat in ['str','dex','con','int','wis','cha']")
                      v-text-field(v-model="character.stats[stat]" class="raw-value-field")

</template>

<style lang="scss">

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
    table.v-table {
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
export default {
  data: () => ({
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
      level: 2,
      race: "Turian",
      class: "Infiltrator",
      subclass: "Sniper",
      background: "",
      stats: {
        str: 16, dex: 14, con: 13, int: 10, wis: 14, cha: 8
      },
      proficiencies: {
        stats: {
          str: true, dex: false, con: true, int: false, wis: false, cha: false
        },
        skills: {
          acrobatics: true,
          athletics: true,
          deception: false,
          electronics: false,
          engineering: false,
          history: false,
          insight: false,
          intimidation: false,
          investigation: false,
          medicine: false,
          perception: false,
          performance: false,
          persuasion: false,
          science: false,
          slight_of_hand: false,
          stealth: false,
          survival: true,
          vehicle_handling: false
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
        {text: 'Skill',value: 'skill'},
        {text: 'Prof',value: 'prof'},
        {text: 'Adv',value: 'adv'}
      ],
      items: [
        {
          roll: 3,
          skill: 'Stealth',
          prof: 0,
          adv: false
        },
        {
          roll: 3,
          skill: 'Athletics',
          prof: 0,
          adv: false
        },
        {
          roll: -4,
          skill: 'Science',
          prof: 0,
          adv: false
        }
      ]
    }
  }),

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
    }
  }

  
};
</script>