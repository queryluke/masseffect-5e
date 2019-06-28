<template lang="pug">
  div(:class="cardType").spell-card
    v-card(height="100%").elevation-0
      v-layout(row wrap)
        v-flex(xs12 :class="{'py-1': singleSide, 'text-xs-center': !singleSide}")
          v-layout(row :justify-space-between="singleSide")
            v-flex(:class="titleSize").mb-0.text-uppercase.font-weight-black {{ spell.name }}
            v-flex(v-if="singleSide" xs4).text-xs-right
              spell-class-list(:availableClasses="spell.availableClasses" v-bind:size="24")
        v-flex(xs12).text-xs-center.spell-info
          v-layout(row)
            v-flex(xs4)
              label Casting Time
              div {{ castingTime }}
            v-flex(xs4)
              label Range (AOE)
              div
                spell-range-area(:spell="spell", :size="aoeSize")
            v-flex(xs4)
              label Duration
              div
                spell-duration(:spell="spell", :verbose="false", :c-size="aoeSize")
        v-flex(xs12).pa-1.spell-text
          markdown-file(:id="spell.id" itemType="spells")
          div(v-if="singleSide").adv-options.mt-1
            div.text-xs-center
              label Advanced Options
            div(v-for="(option, i) in spell.advancementOptions" v-bind:key="i")
              p #[strong {{ option.name }}]: {{ option.description }}
        v-layout(row justify-space-between).spell-tags
          v-flex(xs3) {{ spellLevel }}
          v-flex(xs6).text-xs-center {{ spellTags }}
          v-flex(xs3).text-xs-right
            span(v-if="spell.primes || spell.detonates")
              v-avatar(:size="primeSize" color="white" v-if="spell.primes").primes
                img(:src="`/images/spells/${spell.primes}.svg`" v-bind:alt="spell.primes" tile)
              v-avatar(:size="primeSize" color="white" v-if="spell.detonates" tile).primes
                img(src="/images/spells/detonate.svg" alt="detonates")
            span(v-else) &nbsp;

</template>

<script>
  import SpellType from '~/components/spell/SpellType.vue'
  import SpellDuration from '~/components/spell/SpellDuration.vue'
  import SpellRangeArea from '~/components/spell/SpellRangeArea.vue'
  import SpellDamageEffect from '~/components/spell/SpellDamageEffect.vue'
  import SpellClassList from '~/components/spell/SpellClassList.vue'
  import AdvancedOption from '~/components/spell/AdvancedOption.vue'

  export default {
    components: {
      AdvancedOption, SpellType, SpellDuration, SpellRangeArea, SpellDamageEffect, SpellClassList
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
      singleSide () {
        return this.cardOption === 'single'
      },
      titleSize () {
        return this.singleSide ? 'title ml-2 xs8' : 'subheading text-xs-center xs12'
      },
      classSize () {
        return this.singleSide ? 24 : 16
      },
      castingTime () {
        if (this.spell.castingTime.match(/reaction/gi)) {
          return 'Reaction'
        } else {
          return this.spell.castingTime
        }
      },
      aoeSize () {
        return this.singleSide ? 12 : 9
      },
      primeSize () {
        return this.singleSide ? 18 : 13
      },
      cardType () {
        return `${this.spell.type}-card`
      },
      spellLevel () {
        return this.spell.level.toString() === '0' ? 'Cantrip' : this.$options.filters.ordinal(this.spell.level) + ' level'
      },
      spellTags () {
        if (this.spell.attackType.length > 0) {
          return this.spell.attackType.join(', ')
        } else if (this.spell.effect.length > 0) {
          return this.spell.effect.join(', ')
        }
      }
    }
  }
</script>
