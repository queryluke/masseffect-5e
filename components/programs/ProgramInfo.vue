<template lang="pug">
  div
    h4.headline {{ program.name }}
      v-chip(:color="rarityColors[rarityForColor]" small dark).ml-3.text-uppercase {{ program.rarity }}
    p
      em.
        {{ program.rarity | titlecase }} #[span(v-if="program.installation") (requires installation)]
    div.hr
    div
      markdown-file(:id="program.id" itemType="programs")
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    props: {
      program: {
        type: Object,
        default: () => { return {} }
      },
    },
    computed: {
      ...mapGetters('itemList', ['rarityColors']),
      rarityForColor () {
        return this.$options.filters.titlecase(this.program.rarity)
      }
    }
  }
</script>
