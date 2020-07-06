<template lang="pug">
  v-card.grey.lighten-3
    v-card-text
      v-layout
      v-flex.xs12.sm6
        p.display-1.font-weight-thin
          span(v-if="title") {{ item.name }}
          span(v-if="item.createdBy").body-1.pl-2 #[em created by: {{ item.createdBy }}]
        p
          span(:class="primeTypeCss[item.primes]" v-if="item.primes") #[strong Primes ({{item.primes}})]
          span(v-if="item.primes && item.detonates").mx-2 |
          span(class="primary--text" v-if="item.detonates") #[strong Detonates]
      v-flex.xs12.sm6
        spell-class-list(:availableClasses="item.availableClasses")
    v-layout(row wrap flex-start)
      v-flex.xs12.sm4.md3.attribute.mb-2
        label Type
        div
          spell-type(:spell="item")
      v-flex.xs12.sm4.md3.attribute.mb-2
        label Casting Time
        div {{ item.castingTime }}
      v-flex.xs12.sm4.md3.attribute.mb-2
        label Duration
        div
          spell-duration(:spell="item")
      v-flex.xs12.sm4.md3.attribute.mb-2
        label Range/Area
        div
          spell-range-area(:spell="item")
      v-flex.xs12.sm4.md3.attribute.mb-2
        label Attack Type
        ul.list-unstyled
          li(v-for="at in item.attackType" v-bind:key="at") {{ at }}
      v-flex.xs12.sm4.md3.attribute.mb-2
        label Damage Type
        ul.list-unstyled
          li(v-for="dmg in item.damageType" v-bind:key="dmg") {{ dmg }}
      v-flex.xs12.sm4.md3.attribute.mb-2
        label Effect
        ul
          li(v-for="effect in item.effect" v-bind:key="effect") {{ effect }}
    div.hr
    div.mt-3
      markdown-file(:id="item.id" itemType="spells")
      p.title Advancement Options
      v-layout(row wrap justify-space-around)
        v-flex(v-for="(option, i) in item.advancementOptions" v-bind:key="i").xs12.md6
          advanced-option(:option="option")
    v-card-actions
      bookmark-button(:card="item" type="spell" v-bind:props="{flat: true}")
</template>

<script>

export default {
  props: {
    item: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {

    }
  }
}
</script>
