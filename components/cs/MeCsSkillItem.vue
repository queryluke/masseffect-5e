<template>
  <v-list-item class="mt-n2">
    <v-list-item-avatar :color="item.proficient && !item.expertise ? `primary` : 'transparent'" size="12">
      <v-icon v-if="item.expertise" size="16" color="orange">
        mdi-star
      </v-icon>
    </v-list-item-avatar>
    <v-list-item-content class="ml-n2">
      <v-list-item-title>
        {{ item.name }}
      </v-list-item-title>
    </v-list-item-content>
    <v-list-item-action class="d-flex justify-end">
      <v-list-item-action-text class="text-body-2 d-flex align-center">
        <me-cs-ad-icon v-if="advantage" small :text="advantageText" />
        <me-cs-ad-icon v-if="disadvantage" small :text="disadvantageText" />
        <span class="pl-1">
          {{ modText(item.mod) }}
        </span>
      </v-list-item-action-text>
    </v-list-item-action>
  </v-list-item>
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
    advantage () {
      return this.item.advantages.length > 0
    },
    advantageText () {
      return this.advantage ? this.item.advantages.filter(i => i.effect.note).join(', ') : false
    },
    disadvantage () {
      return this.item.disadvantages.length > 0
    },
    disadvantageText () {
      return this.disadvantage ? this.item.disadvantages.filter(i => i.effect.note).join(', ') : false
    }
  }
}
</script>
