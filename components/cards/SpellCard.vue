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

<style lang="stylus">
  biotic-color = #6467b9;
  tech-color = #d98300;
  combat-color = #d42620;

  .spell-card
    float:left;
    font-size:10px;
    margin:0.3in;
    padding:0.1in;
    width:3.5in;
    height:5in;
    overflow:hidden;
    page-break-after: always;
    page-break-inside: avoid;

    .spell-text p {
      margin-bottom: 3px;
    }

    .aoe-icon {
      width: 15px;
      height: 15px;
    }
    label
      text-transform: uppercase;

    table
      width: 100%;
      font-size: 10px;
      border-top: solid 0.05in black;
      border-bottom: solid 0.05in black;

      td
        width: 50%;

  .biotic-card
    background-color: biotic-color
    table
      border-color: biotic-color
    label
      color: biotic-color

  .tech-card
    background-color: tech-color
    table
      border-color: tech-color
    label
      color: tech-color

  .combat-card
    background-color: combat-color
    table
      border-color: combat-color
    label
      color: combat-color
</style>
