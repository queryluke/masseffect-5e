<template lang="pug">
  div(:class="cardType").spell-card
    v-card(height="100%").elevation-0
      p back

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
