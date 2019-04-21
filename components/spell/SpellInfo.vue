<template lang="pug">
  div
    v-layout
      v-flex.xs12.sm6
        p.display-1 {{ spell.name }}
          span(v-if="spell.createdBy").body-1.pl-2 #[em created by: {{ spell.createdBy }}]
        p
          span(:class="primeTypeCss[spell.primes]" v-if="spell.primes") #[strong Primes ({{spell.primes}})]
          span(v-if="spell.primes && spell.detonates").mx-2 |
          span(class="primary--text" v-if="spell.detonates") #[strong Detonates]
      v-flex.xs12.sm6
        spell-class-list(:availableClasses="spell.availableClasses")
    v-layout(row wrap flex-start)
      v-flex.xs12.sm4.md3.attribute.mb-2
        label Type
        div
          spell-type(:spell="spell")
      v-flex.xs12.sm4.md3.attribute.mb-2
        label Casting Time
        div {{ spell.castingTime }}
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
          li(v-for="at in spell.attackType" v-bind:key="at") {{ at }}
      v-flex.xs12.sm4.md3.attribute.mb-2
        label Damage Type
        ul.list-unstyled
          li(v-for="dmg in spell.damageType" v-bind:key="dmg") {{ dmg }}
      v-flex.xs12.sm4.md3.attribute.mb-2
        label Effect
        ul
          li(v-for="effect in spell.effect" v-bind:key="effect") {{ effect }}
    div.hr
    div.mt-3
      markdown-file(:id="spell.id" itemType="spells")
      p.title Advancement Options
      v-layout(row wrap justify-space-around)
        v-flex(v-for="(option, i) in spell.advancementOptions" v-bind:key="i").xs12.md6
          advanced-option(:option="option")
</template>

<script>
  import SpellType from '~/components/spell/SpellType.vue'
  import SpellDuration from '~/components/spell/SpellDuration.vue'
  import SpellRangeArea from '~/components/spell/SpellRangeArea.vue'
  import SpellDamageEffect from '~/components/spell/SpellDamageEffect.vue'
  import AdvancedOption from '~/components/spell/AdvancedOption.vue'
  import SpellClassList from '~/components/spell/SpellClassList.vue'

  export default {
    components: {
      SpellClassList, AdvancedOption, SpellType, SpellDuration, SpellRangeArea, SpellDamageEffect
    },
    props: {
      spell: {
        type: Object,
        default: () => { return {} }
      },
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
    }
  }
</script>
