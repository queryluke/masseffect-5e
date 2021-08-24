<template>
  <div>
    <me-species-trait :label="$t('ability_score_increase_title')">
      {{ abilityScoreIncreaseText }}
    </me-species-trait>
    <me-species-trait :label="$t('age_title')">
      {{ item.age }}
    </me-species-trait>
    <me-species-trait :label="$t('alignment_title')">
      {{ item.alignment }}
    </me-species-trait>
    <me-species-trait :label="$t('size_title')">
      {{ item.size }}
    </me-species-trait>
    <me-species-trait :label="$t('speed_title')">
      <me-html :content="speedText" />
    </me-species-trait>
    <template v-for="trait in traits">
      <me-species-trait :key="trait.id" :label="trait.name">
        <me-html :content="trait.html" />
      </me-species-trait>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    traits () {
      return this.$store.getters.getData('traits').filter(i => i.species.includes(this.item.id))
    },
    speedText () {
      return this.$t(`lists.comma_list[${this.item.speed.length}]`, this.item.speed.map((i) => {
        return this.$t('speed_trait', {
          type: this.$t(`speeds.${i.type}.text`),
          distance: `<me-distance length="${i.speed}" />`
        })
      }))
    },
    abilityScoreIncreaseText () {
      const array = this.item.abilityScoreIncrease.map((i) => {
        return `+${i.amount} ${this.$t(`abilities.${i.ability}.title`)}`
      })
      return this.$t(`lists.comma_list[${array.length}]`, array)
    }
  }
}
</script>
