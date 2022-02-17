<template>
  <div class="d-flex justify-space-between mx-3" v-on:click="rollSkill()" >
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
      <span class="pl-1">
        {{ modText(item.mod) }}
      </span>
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
    }
  },
  methods: {
    rollSkill () {
      console.log('rolling skill')
      const roll = '1d20+' + this.item.mod + ''
      console.log(roll)
      this.$store.dispatch('character/ROLL',
        {
          title: 'Skill Check',
          subtitle: this.item.name,
          type: 'dice-roll',
          roll
        })
    }
  }
}
</script>
