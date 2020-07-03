<template lang="pug">
  div
    p.display-1.font-weight-thin.mb-2
      span(v-if="title") {{ item.name }}
    span(:class="rarityTextColors[rarityForColor]").text-uppercase.body-2 {{ item.rarity | titlecase }}
    span(v-if="item.installation").pl-1 #[em (requires installation)]
    div.hr
    div
      markdown-file(:id="item.id" itemType="programs")
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    item: {
      type: Object,
      default: () => { return {} }
    },
    title: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters('itemList', ['rarityTextColors']),
    rarityForColor () {
      return this.$options.filters.titlecase(this.item.rarity)
    }
  }
}
</script>
