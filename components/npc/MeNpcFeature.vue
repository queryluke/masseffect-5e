<template>
  <div class="text-body-2 mb-4">
    <span class="font-weight-medium font-italic">
      {{ title }}
    </span>
    <span class="font-weight-light">
      <slot name="description">
        <me-html :content="feature.text" inline />
      </slot>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    feature: {
      type: Object,
      default: () => {
        return {
          name: '',
          description: ''
        }
      }
    }
  },
  computed: {
    title () {
      const text = this.recharge ? this.$t('npc.feature_w_limitation', { name: this.feature.name, limitation: this.recharge }) : this.feature.name
      return this.$t('lists.sentences[1]', [text])
    },
    recharge () {
      if (this.feature.uses) {
        if (this.feature.perDay) {
          return this.$t('npc.uses_per_day', { amount: this.feature.uses })
        }
        if (this.feature.perTurn) {
          return this.$t('npc.uses_per_turn', { amount: this.feature.uses })
        }
        return this.$tc('npc.uses', this.feature.uses)
      }
      if (this.feature.recharge) {
        if (this.feature.recharge === 'short') {
          return this.$t('npc.rest_recharge.short')
        }
        if (this.feature.recharge === 'long') {
          return this.$t('npc.rest_recharge.long')
        }
        return this.$t(`npc.recharges[${this.feature.recharge.length}]`, this.feature.recharge)
      }
      if (this.feature.props) {
        return this.$t(`lists.comma_list[${this.feature.props.length}]`, this.feature.props)
      }
      if (this.feature.cost && this.feature.cost > 1) {
        return this.$t('npc.legendary_cost', { n: this.feature.cost })
      }
      return false
    }
  }
}
</script>
