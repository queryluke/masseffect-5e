<template lang="pug">
  div(:class="cardType").spell-card
    v-card(height="100%" v-bind:color="cardColor").elevation-0
      v-layout(fill-height align-center v-if="cardOption === 'single' || spell.id === 'spacer'").pa-2
        v-img(src="/images/me5e_logo_720w.png" style="margin-top: -3em;")
      div(v-else)
        v-layout(row wrap)
          v-flex(xs12).text-xs-center
            div.mb-0.text-uppercase.font-weight-black.subheading.text-xs-center {{ spell.name }}
          v-flex(xs12).text-xs-center.spell-info
            spell-class-list(:availableClasses="spell.availableClasses" v-bind:size="24" justify="justify-center")
          v-flex(xs12).pa-1.spell-text
            div.adv-options.mt-1
              div.text-xs-center
                label Advanced Options
              div(v-for="(option, i) in spell.advancementOptions" v-bind:key="i")
                p #[strong {{ option.name }}]: {{ option.description }}
</template>

<script>
import SpellClassList from '~/components/spell/SpellClassList.vue'
import AdvancedOption from '~/components/spell/AdvancedOption.vue'

export default {
  components: {
    AdvancedOption, SpellClassList
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
  computed: {
    cardColor () {
      return this.cardOption === 'single' ? 'blue-grey lighten-4' : ''
    },
    cardType () {
      if (this.cardOption === 'single' || this.spell.id === 'spacer') {
        return 'gen-card'
      } else {
        return `${this.spell.type}-card`
      }
    }
  }
}
</script>
