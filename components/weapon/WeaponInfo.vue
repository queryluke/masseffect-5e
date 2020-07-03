<template lang="pug">
  div
    v-layout
      v-flex.xs12.sm6
        p.display-1.font-weight-thin.mb-2
          span(v-if="title") {{ item.name }}
        span(:class="rarityTextColors[item.rarity]").text-uppercase.body-2 {{ item.rarity }} {{ item.type }}
        span(v-if="item.andromeda").text-uppercase.body-2.secondary--text.ml-3 Andromeda
        p.body-2 {{ item.cost | groupDigits(',') }} credits
      v-flex.hidden-xs-only.sm6.md3.offset-md3
        img(:src="item.image" style="max-width: 100%")
    v-layout(row wrap flex-start)
      v-flex.xs12.sm3.attribute.mb-2
        label Damage
        div {{ item.damage }} #[em {{ item.dmgType }}]
      v-flex.xs12.sm3.attribute.mb-2
        label Range
        div {{ item | weaponRange }}
      v-flex.xs12.sm3.attribute.mb-2
        label(v-if="item.type === 'Heavy Weapon'") Charges
        label(v-else) Heat
        div {{ item.heat }}
      v-flex.xs12.sm3.attribute.mb-2
        label Weight
        div {{ item.weight}}
    div.hr
    div.mt-3
      div.subheading.font-weight-light.font-italic
        span(v-for="(prop, index) in item.properties" v-bind:key="index")
          weapon-prop(:propertyName="prop")
          span(v-if="index + 1 < item.properties.length").pa-2 |
      p.mt-2 {{ item.notes }}
      p(v-if="item.createdBy") #[small #[em Created By: {{ item.createdBy }}]]
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
    ...mapGetters('itemList', ['rarityTextColors'])
  }
}
</script>
