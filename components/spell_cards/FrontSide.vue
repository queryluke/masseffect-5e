<template lang="pug">
  div(:class="cardType").spell-card
    v-card(height="100%").elevation-0
      v-layout(row wrap)
        v-flex(xs12).text-xs-center.py-1
          p.title.mb-1 {{ spell.name }}
          span {{ cardTags.join(" &bull; ") }}
          table
            tr
              td
                label Casting Time
                div {{ spell.castingTime }}
              td
                label Range (AOE)
                div
                  spell-range-area(:spell="spell")
            tr
              td
                label Duration
                div
                  spell-duration(:spell="spell", :verbose="true")
              td
                label
                  span(v-if="spell.primes") Primes
                  span(v-if="spell.primes && spell.detonates").mx-2 &&
                  span(v-if="spell.detonates") Detonates
                div(v-if="spell.primes") {{spell.primes}}
        v-flex.pa-1.spell-text
          markdown-file(:id="spell.id" itemType="spells")
          div.adv-options.mt-1
            label Advanced Options
            div(v-for="(option, i) in spell.advancementOptions" v-bind:key="i")
              p #[strong {{ option.name }}]: {{ option.description }}
              p(v-if="i == 0").text-xs-center #[strong --OR--]

</template>

<script>
  import SpellType from '~/components/spell/SpellType.vue'
  import SpellDuration from '~/components/spell/SpellDuration.vue'
  import SpellRangeArea from '~/components/spell/SpellRangeArea.vue'
  import SpellDamageEffect from '~/components/spell/SpellDamageEffect.vue'
  import AdvancedOption from '~/components/spell/AdvancedOption.vue'

  export default {
    components: {
      AdvancedOption, SpellType, SpellDuration, SpellRangeArea, SpellDamageEffect
    },
    props: {
      spell: {
        type: Object,
        default: () => { return {} }
      },
      cardOption: {
        type: String,
        default: 'single'
      }
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
    computed: {
      cardType () {
        return `${this.spell.type}-card`
      },
      cardTags () {
        let text = []
        if (this.spell.level) {
          let spellLevel = this.spell.level === '0' ? 'Cantrip' : this.$options.filters.ordinal(this.spell.level) + ' level'
          text.push(spellLevel)
        }
        for (const i of this.spell.effect) {
          if (i === 'damage') {
            text.push(`${i} (${this.spell.damageType.join(', ')})`)
          } else {
            text.push(i)
          }
        }
        return text
      }
    }
  }
</script>

