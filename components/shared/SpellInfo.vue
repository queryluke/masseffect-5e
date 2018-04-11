<template lang="pug">
  div
    v-layout
      v-flex.xs12.sm6
        p.title {{ spell.name }}
        p
          span(:class="primeTypeCss[spell.primes]" v-if="spell.primes") #[strong Primes ({{spell.primes}})]
          span(v-if="spell.primes && spell.detonates").mx-2 |
          span(class="primary--text" v-if="spell.detonates") #[strong Detonates]
      v-flex.xs12.sm6
        spell-class-list(:spell="spell")
    v-layout(row wrap flex-start)
      v-flex.xs12.sm4.md3.attribute.mb-2
        label Type
        div
          spell-type(:spell="spell")
      v-flex.xs12.sm4.md3.attribute.mb-2
        label Casting Time
        div {{ spell.casting_time }}
      v-flex.xs12.sm4.md3.attribute.mb-2
        label Duration
        div
          spell-duration(:spell="spell")
      v-flex.xs12.sm4.md3.attribute.mb-2
        label Range/Area
        div
          spell-range-area(:spell="spell")
      v-flex.xs12.sm4.md3.attribute.mb-2
        label Attack Type
        ul.list-unstyled
          li(v-for="at in spell.attack_type" v-bind:key="at") {{ at }}
      v-flex.xs12.sm4.md3.attribute.mb-2
        label Damage Type
        ul.list-unstyled
          li(v-for="dmg in spell.damage_type" v-bind:key="dmg") {{ dmg }}
      v-flex.xs12.sm4.md3.attribute.mb-2
        label Effect
        ul
          li(v-for="effect in spell.effect" v-bind:key="effect") {{ effect }}
    div.hr
    div.mt-3
      me-element(:text="spell.mechanic")
      p.title Advancement Options
      v-layout(row wrap justify-space-around)
        v-flex(v-for="(option, i) in spell.adv_options" v-bind:key="i").xs12.md6
          advanced-option(:option="option")
</template>

<script>
  import SpellType from '~/components/shared/SpellType.vue'
  import SpellDuration from '~/components/shared/SpellDuration.vue'
  import SpellRangeArea from '~/components/shared/SpellRangeArea.vue'
  import SpellDamageEffect from '~/components/shared/SpellDamageEffect.vue'
  import AdvancedOption from '~/components/shared/AdvancedOption.vue'
  import SpellClassList from '~/components/shared/SpellClassList.vue'
  import MeElement from '~/components/shared/MeElement.vue'

  export default {
    components: {
      SpellClassList, AdvancedOption, SpellType, SpellDuration, SpellRangeArea, SpellDamageEffect, MeElement
    },
    data () {
      return {
        primeTypeCss: {
          force: 'purple--text text--darken-1',
          necrotic: 'blue-grey--text text--darken-2',
          fire: 'deep-orange--text text--darken-1',
          cold: 'cyan--text text--darken-1',
          lightning: 'blue--text text--darken-1'
        }
      }
    },
    props: ['spell']
  }
</script>
