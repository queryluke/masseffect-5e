<template>
  <div class="d-flex justify-space-between mx-3">
    <div class="d-flex align-center">
      <v-avatar :color="item.proficient && !item.expertise ? 'primary' : 'transparent'" size="12">
        <v-icon v-if="item.expertise" size="16" color="orange">
          mdi-star
        </v-icon>
      </v-avatar>
      <div class="text-body-2 pl-2">
        {{ item.name }}
      </div>
    </div>
    <div class="text-h6 d-flex align-center">
      <me-cs-ad-icons type="skill-check" :value="item.id" />
      <me-cs-die-bonus-icon v-for="(db, index) of dieBonus" :key="`die-bonus-${index}`" :bonus="db.effect" />
      <v-card outlined class="text-center" min-width="40px">
        <me-cs-die-roller
        :input="'1d20' + rollText(item.mod)"
        :data="rollInfo">
          {{ modText(item.mod) }}
        </me-cs-die-roller>
      </v-card>
    </div>
  </div>
</template>

<script>
import { ScoreText } from '~/mixins/character/scoreText'

export default {
  name: 'MeCsSkillItem',
  mixins: [ScoreText],
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    dieBonus () {
      return this.item.otherBonuses.filter(i => i.effect?.type === 'die-bonus')
    },
    rollInfo () {
      const modStr = '(' + this.modText(this.item.mod) + ')'
      return {
        roll: '1d20+' + this.item.mod + '',
        title: 'Skill Check: ' + this.item.name + ' ' + modStr
      }
    }
  }
}
</script>
