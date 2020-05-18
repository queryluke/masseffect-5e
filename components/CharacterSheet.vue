<template>
  <v-form
    on-submit="return false;"
  >
    <v-container
      grid-list-md
      text-xs-center>
      <v-layout
        row
        wrap>
        <v-flex xs8>
          <v-text-field
            v-model="character.name"
            label="Character Name" />
        </v-flex>
        <v-flex xs4>
          <img 
            title="Image here!"
            src="/images/me5e_logo_450w.png"
            alt="Mass Effect 5e logo"
          >
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs9>
          <v-layout row>
            <v-flex>
              <v-text-field 
                v-model="character.level"
                label="Level" />
            </v-flex>
            <v-flex>
              <v-select
                v-model="character.race"
                :items="['Turian','Human']"
                label="Race"
              />
            </v-flex>
            <v-flex>
              <v-select
                v-model="character.class"
                :items="['Sniper','Shadow','Saboteur']"
                label="Class"
              />
            </v-flex>
            <v-flex>
              <v-select
                v-model="character.subclass"
                :items="['Infiltrator','Adept','Soldier']"
                label="Sub-Class"
              />
            </v-flex>
            <v-flex>
              <v-select
                v-model="character.subclass"
                :items="['Colonist','Doctor']"
                label="Background"
              />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex>
              <v-text-field 
                v-model="character.ac"
                label="AC" />
            </v-flex>
            <v-flex>
              <v-text-field 
                v-model="character.initiative"
                label="Initiative" />
            </v-flex>
            <v-flex>
              <v-text-field 
                v-model="character.movement"
                label="Movement" />
            </v-flex>
            <v-flex>
              <v-text-field 
                v-model="character.proficiency"
                label="Proficiency" />
            </v-flex>
            <v-flex>
              <v-text-field 
                v-model="character.xp"
                label="XP" />
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs3>
          <!-- Character Image -->
          <img
            :title="character.name"
            src="https://vignette.wikia.nocookie.net/masseffect/images/3/36/Garrus_Character_Shot.png/revision/latest/scale-to-width-down/350?cb=20100323054855"
            alt="Character Image"
            style="height: 200px;"
          >
        </v-flex>
      </v-layout>

      <v-layout row>
      
        <v-flex xs3>
          Skills
        </v-flex>

        <v-flex xs9>
          Stats
        </v-flex>

      </v-layout>

    </v-container>
  </v-form>
</template>
<script>
export default {
  data: () => ({
    character: {
      name: "Garrus Vakarian",
      level: 2,
      race: "Turian",
      background: "Sniper"
    }
  })
};
</script>