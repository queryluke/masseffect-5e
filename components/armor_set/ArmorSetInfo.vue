<template lang="pug">
  div
    v-layout
      v-flex.xs12
        p.display-1.font-weight-thin.mb-2
          span(v-if="title") {{ item.name }}
        span(:class="rarityTextColors[item.rarity]").text-uppercase.body-2 {{ item.rarity }}
        span(v-if="andromeda").text-uppercase.body-2.secondary--text.ml-3 Andromeda
        p #[em {{ item.description }}]
    v-layout(row wrap flex-start)
      v-flex.xs4.attribute.mb-2
        label Type
        div {{ item.type }}
      v-flex.xs4.attribute.mb-2
        label Armor Type
        div {{ item.armorType }}
      v-flex.xs4.attribute.mb-2
        label Cost
        div {{ item.cost | groupDigits(',') }}
      v-flex.xs12
        div.hr
        ul.list-unstyled
          li(v-for="(f, index) in benefits" v-bind:key="index").subheading {{ f }}
        v-card(xs12 md8 v-if="setBonus.length > 0").mt-4
          v-card-text
            p.ma-0.body-2 Set Bonuses
            dl(v-for="(f, index) in setBonus" v-bind:key="index")
              dt #[strong ({{ setBonusGroup(f) }})]
              dd {{ setBonusText(f) }}
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
    benefits () {
      return this.item.feature ? this.item.feature.split('--').map(f => f.trim()) : []
    },
    setBonus () {
      return this.item.setBonus ? this.item.setBonus.split('--').map(f => f.trim()) : []
    },
    andromeda () {
      return this.item.andromeda === 'x'
    }
  },
  methods: {
    setBonusGroup (bonus) {
      const match = bonus.match(/\d of \d/)
      return match ? match[0] : ''
    },
    setBonusText (bonus) {
      const split = bonus.split(':')
      return split[1] ? split[1] : ''
    }
  }
}
</script>
