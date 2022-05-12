<template>
  <div class="d-flex justify-space-between mx-3 mt-2">
    <div class="d-flex align-center">
      <v-avatar color="transparent" size="12">
        <v-icon v-if="someProf" size="16" :color="color">
          {{ icon }}
        </v-icon>
      </v-avatar>
      <div class="text-body-2 pl-2">
        {{ item.name }}
      </div>
    </div>
    <div class="text-h6 d-flex align-center">
      <me-cs-ad-icons type="skill-check" :value="item.id" />
      <me-cs-die-bonus-icon v-for="(db, index) of dieBonus" :key="`die-bonus-${index}`" :bonus="db.effect" />
      <me-cs-roll-card :roll="roll">
        <div class="text-h6">
          {{ modText(item.mod) }}
        </div>
      </me-cs-roll-card>
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
    roll () {
      return {
        notation: `1d20${this.rollText(this.item.mod)}`,
        detail: this.item.name,
        type: 'check'
      }
    },
    someProf () {
      return this.item.expertise || this.item.halfProf || this.item.proficient
    },
    color () {
      return this.item.expertise ? 'orange' : 'primary'
    },
    icon () {
      return this.item.expertise
        ? 'mdi-star'
        : this.item.halfProf
          ? 'mdi-circle-half-full'
          : 'mdi-checkbox-blank-circle'
    }
  }
}
</script>
