<template>
  <div>
    <me-cs-card-title>
      Skills
    </me-cs-card-title>
    <v-row no-gutters>
      <v-col v-for="(split, index) of splits" :key="`skill-split-${index}`" cols="12" md="4">
        <v-list dense>
          <template v-for="skill in skillArray.slice(...split)">
            <me-cs-skill-item :key="skill[0]" :item="skill[1]" />
          </template>
        </v-list>
      </v-col>
      <!--
      <v-col cols="12" md="4">
        <v-list dense>
          <template v-for="skill in skills.slice(6,12)">
            <me-cs-skill-item :key="skill.id" :item="skill" />
          </template>
        </v-list>
      </v-col>
      <v-col cols="12" md="4">
        <v-list dense>
          <template v-for="skill in skills.slice(12)">
            <me-cs-skill-item :key="skill.id" :item="skill" />
          </template>
        </v-list>
      </v-col>
      -->
    </v-row>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character/skills')

export default {
  name: 'MeCsSkills',
  data () {
    return {
      splits: [
        [0, 6],
        [6, 12],
        [12]
      ]
    }
  },
  computed: {
    ...mapGetters(['skills']),
    skillArray () {
      return Object.entries(this.skills)
    }
  }
}
</script>
