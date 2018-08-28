<template lang="pug">
  div
    v-layout
      v-flex.xs12
        p.title.mb-0 {{ spell.name }}
        p.ma-0 #[em {{ spell.availableClasses.join(', ') }}]
        p.mt-2
          span(:class="primeTypeCss[spell.primes]" v-if="spell.primes") #[strong Primes ({{spell.primes}})]
          span(v-if="spell.primes && spell.detonates").mx-2 |
          span(class="primary--text" v-if="spell.detonates") #[strong Detonates]
    v-layout(row wrap flex-start)
      v-flex.xs6.attribute.mb-2
        label Type
        div
          spell-type(:spell="spell")
      v-flex.xs6.attribute.mb-2
        label Casting Time
        div {{ spell.castingTime }}
      v-flex.xs6.attribute.mb-2
        label Duration
        div
          spell-duration(:spell="spell")
      v-flex.xs6.attribute.mb-2
        label Range/Area
        div
          spell-range-area(:spell="spell")
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
  import MarkdownFile from '~/components/MarkdownFile.vue'

  export default {
    components: {
      SpellClassList, AdvancedOption, SpellType, SpellDuration, SpellRangeArea, SpellDamageEffect, MarkdownFile
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
