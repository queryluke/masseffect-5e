<template>
  <div>
    <me-cs-card-title>
      Skills
    </me-cs-card-title>
    <div v-if="allSkillsBonus.length" class="d-flex justify-center">
      <div v-for="(asb, index) of allSkillsBonus" :key="`all-skill-bonus-${index}`">
        <div class="d-flex align-center">
          <me-cs-ad-icon v-if="asb.effect.type === 'advantage'" type="a" small />
          <div class="text-caption pl-1">
            - {{ asb.effect.note }}
          </div>
        </div>
      </div>
    </div>
    <v-row no-gutters>
      <v-col v-for="(split, index) of splits" :key="`skill-split-${index}`" cols="12" md="4">
        <v-list dense>
          <template v-for="(skill, skillIndex) in skillArray.slice(...split)">
            <v-menu :key="skillIndex" v-model="skill.rollModel" absolute offset-y>
              <template v-slot:activator="{ on, attrs }">
                <me-cs-skill-item :key="skill[0]" :item="skill[1]" v-bind="attrs" v-on="on"/>
              </template>
              <v-alert type="success">
                {{skill.roll}}
              </v-alert>
            </v-menu>
          </template>
        </v-list>
      </v-col>
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
    ...mapGetters(['skills', 'allSkillsBonus']),
    skillArray () {
      return Object.entries(this.skills)
    }
  },
  methods: {
    getRandomInt (min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    rollSkill (skill) {
      console.log(skill)
      skill.showRoll = true
      skill.roll = 0
      alert((this.getRandomInt(1, 20) + skill[1].mod) + ', ' + (this.getRandomInt(1, 20) + skill[1].mod))
    }
  }
}
</script>
