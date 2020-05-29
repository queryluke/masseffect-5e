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
          v-data-table(:headers="stats_table.headers" :items="stats_table.items" class="stats-table-area"
            :hide-actions="true" :disable-initial-sort="false" :must-sort="true")
            template(v-slot:items="props")
              td {{props.item.label}}
              // Numbers
              td(class="stat-num" v-if="!props.item.isCheckbox") {{props.item.str}}
              td(class="stat-num" v-if="!props.item.isCheckbox") {{props.item.dex}}
              td(class="stat-num" v-if="!props.item.isCheckbox") {{props.item.con}}
              td(class="stat-num" v-if="!props.item.isCheckbox") {{props.item.int}}
              td(class="stat-num" v-if="!props.item.isCheckbox") {{props.item.wis}}
              td(class="stat-num" v-if="!props.item.isCheckbox") {{props.item.cha}}

              // Checkboxes
              td(class="stat-checkbox" v-if="props.item.isCheckbox")
                v-checkbox(v-model="props.item.str" class="align-center justify-center")
              td(class="stat-checkbox" v-if="props.item.isCheckbox")
                v-checkbox(v-model="props.item.dex" class="align-center justify-center")
              td(class="stat-checkbox" v-if="props.item.isCheckbox")
                v-checkbox(v-model="props.item.con" class="align-center justify-center")
              td(class="stat-checkbox" v-if="props.item.isCheckbox")
                v-checkbox(v-model="props.item.int" class="align-center justify-center")
              td(class="stat-checkbox" v-if="props.item.isCheckbox")
                v-checkbox(v-model="props.item.wis" class="align-center justify-center")
              td(class="stat-checkbox" v-if="props.item.isCheckbox")
                v-checkbox(v-model="props.item.cha" class="align-center justify-center")

          v-layout(text-xs-left class="raw-value-area")
            span(class="stats-label")
              h3 Raw Values
            v-flex
              v-text-field(v-model="character.stats.str" class="raw-value-field")
            v-flex
              v-text-field(v-model="character.stats.dex" class="raw-value-field")
            v-flex
              v-text-field(v-model="character.stats.con" class="raw-value-field")
            v-flex
              v-text-field(v-model="character.stats.int" class="raw-value-field")
            v-flex
              v-text-field(v-model="character.stats.wis" class="raw-value-field")
            v-flex
              v-text-field(v-model="character.stats.cha" class="raw-value-field")
</template>

<style lang="scss">

  .raw-value-area {
    input {
      text-align: center;
    }
    .stats-label {
      text-align: center;
      margin-top: 20px;
      width: 250px;
    }
    .raw-value-field {
      font-size: 12px !important;
      padding: 8px
    }
  }

  .stats-table-area {

    .stat-checkbox .v-input__slot {
      margin: 0;
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
    },
    stats_table: {
      headers: [
        {text: '', value: 'label', align: 'start', sortable: false},
        {text: 'STR',value: 'str', sortable: false},
        {text: 'DEX',value: 'dex', sortable: false},
        {text: 'CON',value: 'con', sortable: false},
        {text: 'INT',value: 'int', sortable: false},
        {text: 'WIS',value: 'wis', sortable: false},
        {text: 'CHA',value: 'cha', sortable: false}
      ],
      items: [
        {
          isCheckbox: false, label: "Ability Scores", str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0
        },
        {
          isCheckbox: false, label: "Saving Throws", str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0
        },
        {
          isCheckbox: true, label: "Proficiency", str: false, dex: false, con: false, int: false, wis: false, cha: false
        }
      ]
    }
  })
};
</script>