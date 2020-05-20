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
              v-select(v-model="character.race" :items="['Turian','Human']" label="Race")
            
            v-flex
              v-select(v-model="character.class" :items="['Sniper','Shadow','Saboteur']" label="Class")

            v-flex
              v-select(v-model="character.subclass" :items="['Infiltrator','Adept','Soldier']" label="Sub-Class")

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
          v-data-table(:headers="skills_table.headers" :items="skills_table.items" :search="skills_table.search" hide-actions="true")
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
          v-data-table(:headers="stats_table.headers" :items="stats_table.items")
            template(v-slot:items="props")
              td {{props.item.label}}
              td {{props.item.str}}
              td {{props.item.dex}}
              td {{props.item.con}}
              td {{props.item.int}}
              td {{props.item.wis}}
              td {{props.item.cha}}

          v-layout(text-xs-left)
            v-flex(class="stats-label")
              h3 Raw Values
            v-flex
              v-text-field(v-model="character.dex")
            v-flex
              v-text-field(v-model="character.dex")
            v-flex
              v-text-field(v-model="character.dex")
            v-flex
              v-text-field(v-model="character.dex")
            v-flex
              v-text-field(v-model="character.dex")
            v-flex
              v-text-field(v-model="character.dex")
</template>

<style lang="scss">
  .stats-label {
    width: 300px;
  }
</style>

<script>
export default {
  data: () => ({
    character: {
      name: "Garrus Vakarian",
      level: 2,
      race: "Turian",
      background: "Sniper"
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
        {text: '', value: 'label', align: 'start'},
        {text: 'STR',value: 'str'},
        {text: 'DEX',value: 'dex'},
        {text: 'CON',value: 'con'},
        {text: 'INT',value: 'int'},
        {text: 'WIS',value: 'wis'},
        {text: 'CHA',value: 'cha'}
      ],
      items: [
        {
          label: "Ability Scores", str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0
        },
        {
          label: "Saving Throws", str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0
        }
      ]
    }
  })
};
</script>