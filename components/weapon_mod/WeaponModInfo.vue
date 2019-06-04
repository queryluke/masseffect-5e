<template lang="pug">
  div
    v-layout
      v-flex.xs12
        p.display-1.font-weight-thin.mb-2
          span(v-if="title") {{ item.name }}
        span(:class="rarityTextColors[item.rarity]").text-uppercase.body-2 {{ item.rarity }}
        p #[em {{ item.description }}]
    v-layout(row wrap flex-start)
      v-flex.xs4.attribute.mb-2
        label Placement
        div {{ item.placement }}
      v-flex.xs4.attribute.mb-2
        label Weapon Availability
        div {{ item.availability }}
      v-flex.xs4.attribute.mb-2
        label Cost
        div {{ item.cost | groupDigits(',') }}
      v-flex.xs12
        div.hr
        p {{ item.feature }}
      p(v-if="item.createdBy") #[small #[em Created By: {{ item.createdBy }}]]
</template>

<script>
  import {mapGetters} from 'vuex'

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
